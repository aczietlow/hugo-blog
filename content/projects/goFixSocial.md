---
title: "Go Fix Social Links"
date: 2024-04-04
tags: [
  "bot",
  "go",
  "Discord"
]
teaser: "A Discord bot to fix oembed links from social media."
codeLineNumbers: false
thumbnail: "images/projects/fix-socials.png"
source: https://github.com/aczietlow/goFxSocials
activity: 2024.01.04
---

While I don't really use social media much these days, my friends and co-workers are constantly sharing links from Twitter, Instagram, Tiktok, and more via Discord. The challenge for me, and all of us really is that Discord doesn't handle the oembed from social media sites well in the app. More likely the cause is that they don't provide accurate omebed data. After all if you watch an embedded short, or view a spicy meme without going to these sites, how can they collect your data, or possible serve any adds?

There is a workaround to this. There are wonderful tools like [vxTwitter](https://github.com/ryuuzake/BetterTwitFix), [ddInstagram](https://github.com/Wikidepia/InstaFix), and more. These tools allow you to add a prefix to a URL before sharing it to allow Discord to use its video player, instead of trying to embed Twitter's and being forced to open the app or go to their site and login. 

Take for example, sharing of the following Twitter link in Discord (I still refuse to cal it X.com)

```
https://x.com/barstoolsports/status/1742676131147354116
```

![twitter-embed.png](../../images/projects/twitter-embed.png)

Despite being a tweet to a video, the video will not embed in Discord. Discord instead gets a static image of a single frame of the video.

```
https://fixvx.com/barstoolsports/status/1742676131147354116
```

![twitter-embed.png](../../images/projects/twitter-embed-fixed.png)

This works great, but requires me to manually add a prefix to social links AND to remember what the prefix should be. I can't be bothered to do something that requires 10 seconds of my attention a couple of times per day. However, I can be bothered to spend a weekend programming a Discord bot that has a command to automatically "fix" 


## Hacking on a Discord Bot

This bot makes use of [bwmarrin/Discordgo](https://github.com/bwmarrin/Discordgo) and the existing hosted services for "fixing" embeds shared within Discord. To create a new client instance of the bot and create a new session via websocket to connected servers.

```go
   token := os.Getenv("Discord_TOKEN")

	dSession, err := Discordgo.New("Bot " + token)
	if err != nil {
		log.Fatal("Failed to create Discord session")
		return
	}

    // Open websocket connection to Discord and begin listening.
    err = dSession.Open()
    if err != nil {
        log.Fatal("Failed to open Discord websocket connection")
    return
    }
```

Next create the slash commands, and register them to the session. 


```go
command, err := dSession.ApplicationCommandCreate(dSession.State.User.ID, "", &Discordgo.ApplicationCommand{
    Name:        "fix-social",
    Description: "Attempts to fix a social media link embed",
    Options: []*Discordgo.ApplicationCommandOption{
        {
            Type:        Discordgo.ApplicationCommandOptionString,
            Name:        "url",
            Description: "URL to fix",
            Required:    true,
		},
    },
})

dSession.AddHandler(func(s *Discordgo.Session, i *Discordgo.InteractionCreate) {
    if i.ApplicationCommandData().Name == "fix-social" {
		// Link fixing magic.
    }
	
}
```

> Take note that when creating commands you can pass a GUID of a specific server, which is useful in testing, failure to do so will register the slash command globally. While this makes it more widely available the tradeoff comes at the amount of time it now takes to bust the cache for changes to this command to propagate across servers.

With all the wiring of Discord established, all that is left is to do is basic string manipulation and send a response.

```go
// Link fixing magic
input := i.ApplicationCommandData().Options[0].StringValue()
var response string
if IsUrl(input) {
    url, _ := url.Parse(input)

    fixableLink := link.Link{
        URL: url,
    }

    if fixableLink.IsFixableUrl() {
        s.InteractionRespond(i.Interaction, &Discordgo.InteractionResponse{
            Type: Discordgo.InteractionResponseChannelMessageWithSource,
            Data: &Discordgo.InteractionResponseData{
                Content: fixableLink.Fix(),
            },
        })
        response = fixableLink.Fix()
    } 
}

type Link struct {
    URL      *url.URL
    Hostname string
}

func IsUrl(str string) bool {
    url, err := url.Parse(str)
    if err != nil {
        return false
    }
    if url.Scheme == "" || url.Host == "" {
        return false
    }
    return true
}

func getHostname(hostname string) string {
    // Check if the hostname has www. in it and if so remove it
    substring := strings.Split(hostname, ".")
    
    if substring[0] == "www" {
        hostname = strings.Join(substring[1:], ".")
    }
    
    return hostname
}

func (l *Link) IsFixableUrl() bool {
    l.Hostname = getHostname(l.URL.Hostname())
    switch l.Hostname {
    case "instagram.com", "twitter.com", "x.com", "reddit.com", "tiktok.com":
        return true
    }
    return false
}

func fixURL(link *Link) string {
    switch link.Hostname {
    case "instagram.com":
        return fixInstagram(link)
    case "twitter.com":
        return fixTwitter(link)
    case "x.com":
        return fixX(link)
    case "reddit.com":
        return fixReddit(link)
    case "tiktok.com":
        return fixTikTok(link)
    }
    return ""
}

func fixTwitter(link *Link) string {
    newURL := link.URL.Scheme + "://fx" + link.Hostname + link.URL.Path
    return newURL
}

```

With everything working, all that's left is to slap upload to a $5 Linode tier or add it to a Raspberry Pi. And with that another successful weekend was invested in preventing the mildest annoyance and saving a few minutes of my time annually. 