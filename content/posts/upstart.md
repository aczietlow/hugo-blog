---
title: "Getting started with Upstart"
date: 2013-10-17
tags: [
    "upstart",
    "linux"
]
---

Upstart is an event based monitoring system for monitoring and controlling services and daemons. Upstart is meant to be a replacement for the older System V init.d start up scripts with better optimizations in parrelism and boot time. It can be used to run serveral one off tasks, like that of any shell script, or can monitor long running background services.

To create an upstart script, create a job configuration file in the /etc/init directory. All job configuration files follow the convention of <name>.conf where <name> is the name of the boot script for upstart.  Below is a base template of an example upstart script.

```
#cooljob.conf
# my upstart template file
# This script will start / stop something for me.
description "Start/stop some service"
version "1.0"
author "Chris Zietlow"
script
  sleep 1000
end script
```

Once an upstart job file is in place it will be available to several upstart commands.

```
start on starting hubot-irc
stop on stopping hubot-irc
respawn

exec su - www-data -c 'cd /home/aczietlow/Web/hubot;
export PORT=5000;
export HUBOT_IRC_SERVER="irc.freenode.net";
export HUBOT_IRC_ROOMS="#spyderbytedesign";
export HUBOT_IRC_NICK="kikihubot";
export HUBOT_IRC_UNFLOOD="true";
export HUBOT_IRC_PRIVATE="true";
export FILE_BRAIN_PATH=".";
bin/hubot --adapter irc >> /var/log/kikibot/hipchat-1.log 2>&1'
```

## Useful commands


* `initctl start | status | stop <script>`
    * starts|stops the scripts under
* `initctl list`
    * list scripts under /etc/init.d
* `initctl start | status | stop <script>`
    * shorthand for initctl start | status | stop
* `initctl log-priority`
    * displays the log priority
* `initctl log-priority debug | messages`
    * change the messgae priority chkconfig - enable or disable systems services chkconfig <service> --list - check what run levels service is running over