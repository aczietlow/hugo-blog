---
title: "Jellyfin Joy: How to Turn Old DVDs into Your Personal Streaming Library"
date: 2023-09-28
tags: [
    "jellyfin",
    "plex"
]
categories: [
  "Homelab"
]
thumbnail: "images/blogs/jellyfin-logo.png"
---

With streaming services like Netflix clamping down on password sharing, I've been reevaluating the number of subscriptions I maintain. This is less about being stingy and more about making TV time something that is more intentional. I want to avoid the "are you still watching" effect of solving boredom by mindlessly rabbit-holing through a binge fest on Netflix. I much more enjoy explicitly sitting down to watch a specific "thing" and move on with my life. 

From the long forgotten days of the Block-Buster going out of business sales we have a fairly sizable DVD collection as well as a dusty unused PC sitting in the back of a closet. So I have everything in place to DIY a new homelab solution. But my family still wants the ability to stream, and download media to our mobile devices to watch on the go while we travel. Enter Jellyfin; open source media streaming software. Below is the process I used to convert a closet full of DVDs into streamable media.

The process is a little bit more involved than just drag and dropping files off of physical disks and onto a hard drive. At a high level there are 3 main steps to the process:
1) Rip media from the disk into an open format
2) Transcode file into a more portable, usable format
3) Rename and move files into directory that is accessible by the media server

## Step 1: Ripping Media

DVDs and Blu-rays are typically stored in proprietary formats that aren't easy to directly edit. To solve this we'll be using [MakeMKV](https://makemkv.com/). It's a paid software, but it has a trial Beta period.. For the past 13 years they provide new [trial keys](https://forum.makemkv.com/forum/viewtopic.php?f=5&t=1053) every couple of months. While this does practically allow its use for free in perpetuity, I ended up purchasing a license.

The MKV is short for ["Matroska Video"](https://en.wikipedia.org/wiki/Matroska). This format is a container file, that allows support for multiple video, audio, and subtitle tracks, as well as metadata. This allows us to export the desired video, audio, and subtitle tracks into a single file format. Most importantly to this use case, Matroska is free, open, and patent-free, thus allowing for ease of use and interoperability between software required in the next steps. Additionally, makeMKV is capable of reading Blu-ray files that protected with the latest version of AACS and BD+

> * Note: While players like VLC on desktop can directly play Matroska files, some native TV apps might not.

To extract the movie from disk, load the disk in a drive, and load it within makeMKV. MakeMKV will display the entire contents of the disk, the movie, trailers, extras, etc. Select which you want to extract. If you expand the movie file, you'll see the movie decomposed into several tracks. It's typical to see a single video track, several different audio tracks, and multiple subtitle tracks. This allows the movie to have multiple audio bitrate options which can be changed during playback, and sometimes even support multiple languages. It's easiest to select a video track, a single audio track, and single subtitle track (if this is a feature you prefer). As each track is selected in the panel on the right side of the app you can see additional information about the track, 

> * Tip: When searching for the movie, typically it will be the file with the largest size on disk.

![MakeMKV Interface](../../images/blogs/jellyfin/makeMKV1.png)

![Selecting audio and video tracks to export in MakeKV](../../images/blogs/jellyfin/makeMKV2.png)

## Step 2: Transcode

At this point, we have a mostly playable single container file, so why add additional steps? In my use case I want media that is universally playable, that makes efficient use of bandwidth, and allows for reliable content delivery. Under the hood this means I need to convert the codecs, change container files, and process resolution changes. E.g. If I rip an HD-DVD, and want to stream it on my phone via my data plan, I'd prefer a 480p or 720p option, as opposed being forced to stream it at the original 4k resolution.

In order to accomplish this, I once again turn to open source software. Now it's time for [Handbrake](https://handbrake.fr/) to shine! Handbrake can convert videos between nearly all formats. Additionally, it's compatible with Windows, Mac, and Linux.

To convert the mkv file from the previous step, it needs to be opened within handbrake. Handbrake is extremely powerful and allows users to dial in hyper granular settings for video and audio transcoding. However, in this use case an out-of-the-box preset can be used. In my own testing I have found the "Fast" preset to be the sweet spot in most cases. The exception being on UHD where you want to maintain high bitrate and resolution.

> * Caution: Handbrake will allow transcoding in higher resolution than the media loaded. This does not actually upscale the media on output. It's only capable of downscaling resolution and bit-rates E.g. DVDs are 480p by default, if an MKV file extracted from a DVD is loaded, the highest real resolution it can be transcended is 480p. Selecting a higher resolution or bitrate, will only add noise and bloat to the resultant file, with no actual benefit.

![Handbrake Example](../../images/blogs/jellyfin/handbrake1.png)
![Handbrake Preset Selection](../../images/blogs/jellyfin/handbrake-preset.png)
![Video Files after Transcoding](../../images/blogs/jellyfin/handbrake-files.png)


## Step 3: Renaming the files

Often, files on the media disk aren't named in a human-readable format or following a standard method. At this stage I typically rename the files using the following convention:
```
Movies
└── The Devil Wears Prada (2006)
    ├── The Devil Wears Prada (2006) - 720p.mp4
    └── The Devil Wears Prada (2006) - 480p.mp4
```

Both Plex and Jellyfin support plugins to fetch additional metadata about media, provided the files adhere to a standard naming convention. Notice the year "tag" in the title. This is useful for distinguishing between multiple versions of a movie with identical titles. E.g. `The Lion King (1994)` "aka the good one" and `The Lion King (2019)`.

When in doubt I find [themoviedb.org](https://www.themoviedb.org/) to be an invaluable resource. As an added perk they have an API, which I may be able to utilize in the future to better streamline this process.

All that's left is to move the files into a directory that is accessible as a media library for Plex or Jellyfin and enjoy.

## Enjoy

![Jellyfin see and loads the new movie](../../images/blogs/jellyfin/jellyfin-interface.png)
![Jellyfin - Notice the all the metadata!](../../images/blogs/jellyfin/jellyfin-interface2.png)

![Enjoy the movie](../../images/blogs/jellyfin/devil-wears-prada.png)

After a quick test, Jellyfin fully loaded the newly added movie. While there are other considerations, like storage media, latency, fine tuning video and audio codecs for home theaters or even drives to support fast I/O for Blu-ray discs, those are topics I'll expand more on a future date. I've got a movie to enjoy. 

Try it out for yourself, and be sure share to any tweaks you might have in your home media server setup.


