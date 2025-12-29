---
title: "Go Fs Package" # Title of the blog post.
date: 2025-12-29T09:33:43-05:00 # Date of post creation.
description: "WTF is Go's FS package" # Description used for search engine.
draft: true
toc: false # Controls if a table of contents should be generated for first-level links automatically.
# menu: main
# featureImage: "/images/path/file.jpg" # Sets featured image on blog post.
# thumbnail: "/images/path/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
# thumbnail_byline: "Byline under thumbnail image" # Sets a byline under the thumbnail image
# shareImage: "/images/path/share.png" # Designate a separate image for social media sharing.
codeMaxLines: 10 # Override global value for how many lines within a code block before auto-collapsing.
codeLineNumbers: false # Override global value for showing of line numbers within code block.
# figurePositionShow: true # Override global value for showing the figure label.
tags:
  - blogumentation
  - go
# comment: false # Disable comment if false.
---

In 1.16 Go added the [`io/fs`](https://go.dev/doc/go1.16#fs) package. It was added as a filesystem abraction to between code and the filesystem. What is the "filesystem"? It can be provided by the host operating system, but can also be provided by other packages such as zip archives, in memory, or templates. It separates the logic in such a way that consumer code can specify "I want to read `config.json`" without specifying explicitly where that is located. Why would we ever want to do this? It allows code to be decoupled from the operating system backend, allowing better interoptability as well as testing.

Let's examine a traditional example where we load `config.json` file

```go
type Config struct {
	Token    string
}

var osReadFile = os.ReadFile

func main() {
	conf, _ := config.LoadConfig("./config.json")
	fmt.Printf("%v", conf)
}

func LoadConfig(filepath string) (*Config, error) {
	configFile, err := osReadFile(filepath)

	if err != nil {
		return nil, err
	}

	var conf Config
	if err := json.Unmarshal(configFile, &conf); err != nil {
		return nil, err
	}

	return &conf, nil
}

```

We could test with the following

```go 
func TestLoadConfigValidFile(t *testing.T) {
	orig := osReadFile
	t.Cleanup(func() { osReadFile = orig })
	content := `{"Token":"abc123"}`

	osReadFile = func(path string) ([]byte, error) {
		if path != "config.json" {
			t.Fatalf("Unexpected path: expected %s, actual %s\n", "config.json", path)
		}
		return []byte(content), nil
	}

	conf, err := LoadConfig("config.json")

	if err != nil {
		t.Fatalf("Encountered unexpected error, %v\n", err)
	}

	expected := &Config{
		Token: "abc123",
	}

	if !reflect.DeepEqual(conf, expected) {
		t.Fatalf("config mismatch!\n expected: %v\n actual: %v\n", expected, conf)
	}
}
```

This is perfectly fine, and works as intended. Some of the tradeoffs of this approach are that `LoadConfig(path string) (*Config,error)` is loading some bytes specifically from the OS filesystem. By coupling with the filesystem, we're also testing the file system, file bytes, path issues, etc. What would this look like if we wanted to provide the config from another source, such as a zip archive? In this case assume that a stream-like zip access (maybe the zip is in the filesystem, maybe it was fetched via http or any number of other methods)

```go
func main() {
	obj, _ := s3Client.GetObject("http://localhost:42")
	zipBytes, _ := io.ReadAll(obj.Body)

	conf, _ := zipConfig.LoadConfig(zipBytes)
	fmt.Printf("%v", conf)
}

func LoadConfig(zipReader io.ReaderAt, zipSize int64, entryName string) (*Config, error) {
	reader, err := zip.NewReader(zipReader, zipSize)
	if err != nil {
		return nil, err
	}

	for _, file := range reader.File {
		if file.Name != entryName {
			continue
		}

		readerContent, err := file.Open()
		if err != nil {
			return nil, err
		}
		defer readerContent.Close()

		data, err := io.ReadAll(readerContent)
		if err != nil {
			return nil, err
		}
		var conf Config
		if err := json.Unmarshal(data, &conf); err != nil {
			return nil, err
		}
		return &conf, nil
	}

	return nil, fmt.Errorf("conf file entry %s not found", entryName)
}
```

Testing could be something like the following:

```go
func TestLoadConfigValidConfig(t *testing.T) {
	// Setup zip in memory.
	buffer := new(bytes.Buffer)
	zipWriter := zip.NewWriter(buffer)

	writer, err := zipWriter.Create("config.json")
	if err != nil {
		t.Fatalf("failed creating zip entry:%v\n", err)
	}

	_, err = writer.Write([]byte(`{
		"Token": "abc123"
	}`))

	if err != nil {
		t.Fatalf("failed writing zip entry: %v\n", err)
	}

	if err := zipWriter.Close(); err != nil {
		t.Fatalf("Failed closing zip writer: %v\n", err)
	}
	zipBytes := buffer.Bytes()

	conf, err := LoadConfig(bytes.NewReader(zipBytes), int64(len(zipBytes)), "config.json")

	if err != nil {
		t.Fatalf("encountered an unexpected error: %v\n", err)
	}

	expected := &Config{
		Token: "abc123",
	}

	if !reflect.DeepEqual(conf, expected) {
		t.Fatalf("config did not match expected!\nExpected: %v\nActual: %v\n", expected, conf)
	}
}
```


Now lets refactor using the fs package.

```go

func LoadConfig(fsys fs.FS, name string) (*Config, error) {
	data, err := fs.ReadFile(fsys, name)
	if err != nil {
		return nil, err
	}

	var conf Config
	if err := json.Unmarshal(data, &conf); err != nil {
		return nil, err
	}

	return &conf, nil
}
```

Now on the consumer side, we can easily change where the bytes come from:

```go 
// Load config from config.json in filesystem.
conf, _ := LoadConfig(os.DirFS("."), "config.json")
```

```go
// Load from zip stream.
obj, _ := s3Client.GetObject("http://localhost:42")
zipBytes, _ := io.ReadAll(obj.Body)
zipReader, _ := zip.NewReader(bytes.NewReader(zipBytes), int64(len(zipBytes)))
conf, _ := LoadConfig(zipReader, "config.json")
```

Now let's look at testing. Go provides `MapFS` an in memory filesystem. Because fs isn't tied to the operating filesystem we can rely an in memory filesystem for testing.

```go 
func TestLoadConfigValidFile(t *testing.T) {
	fsys := fstest.MapFS{
		"config.json": &fstest.MapFile{
			Data: []byte(`{
				"Token": "abc123"
			}`),
		},
	}

	conf, err := LoadConfig(fsys, "config.json")
	if err != nil {
		t.Fatalf("unexpected error: %v\n", err)
	}

	expected := &Config{
		Token: "abc123",
	}

	if !reflect.DeepEqual(conf, expected) {
		t.Fatalf("config did not match expected!\nExpected: %v\nActual: %v\n", expected, conf)
	}
}
```

When to use `io/fs` and when to rely on `io/os`? When reading bytes from a file, fs is likely the best tool, if the logic relies on os specific functions, continue to rely on `io/os`

### Gotcha's

symlinks! symlinks are specific operating filesystem functionality. As such they are not abstracted in `io/fs`
