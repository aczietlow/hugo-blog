---
title: "Filtering (Fake) Phishing Emails"
date: 2024-01-31
draft: false
tags : [
    "google",
    "app script",
    "automation"
]
categories : [
    "efficiency"
]
thumbnail: "images/blogs/email/fake-phishing.webp"
---

There are times throughout the year at work when I will unknowingly be subjected to [red team](https://en.wikipedia.org/wiki/Red_team) testing in the form of phishing email attempts. These are vital in validating an organization's ability to detect and respond to unfriendly actors attempting to gain access to unauthorized data. While keeping these detection skills sharp is critical, what follows is how I've mostly automated the detection of these red team phishing campaigns.

Consider the following email:

![Free Candy](../../../images/blogs/email/phishing-email.png)

Upon inspecting the email source you may notice a trend in red team phishing campaigns: *identifiable metadata!*

```
Return-Path: <test@local.com>
Subject: Do you want some free candy
To: "Chris Zietlow" <aczietlow@gmail.com>

X-Mailer: gophish
X-Gophish-Header: http://localhost:8080?rid=WYArRwS-gophish	
X-Gophish: True
X-PHISH: True
X-PHISHTEST

<!DOCTYPE html>
<html lang=3D"en">
<head>
    <meta charset=3D"UTF-8">
```

> Automating an email filter to check red team phishing email campaigns may or may not be good advice. Proceed with caution and wisdom.
 
## Creating an Email Filter

For my own quality of life I create email filters to label and mark these emails are read when they are received.

### Gmail (Google Mail)

There is no simple way to create advanced filters in gmail based on header info contained with the email itself in gmail. To accomplish this we'll need to do the following.

#### Create a Custom App Script

1. Navigate to [script.google.com](https://script.google.com/home)

Start a new project

2. Create a script

Write a script a search through your inbox for messages with the specific headers, label them, and mark them as read.

```javascript
function labelFakePhishing() {
    // Search for new email threads
    let query = 'label:inbox newer_than:1d';
    let threads = GmailApp.search(query);
    /* 
    Note that Gmail will group messges (emails) together into a collection under a single subject line referred to as a "thread"
     */
    
    let phishingHeader = 'X-Gophish'

    // Create a label.
    let label = GmailApp.createLabel('A TRAP');

    // Iterate through all messages in the threads returned via the above query.
    for (let i = 0; i < threads.length; i++) {
        let messages = threads[i].getMessages();
        for (let j = 0; j < messages.length; j++) {
            let message = messages[j];
            let rawContent = message.getRawContent();
            // Check the message source for the pressence of the "phishingHeader"
            if (rawContent.includes(phishingHeader)) {
                GmailApp.moveThreadToArchive(threads[i]);
                label.addToThread(threads[i]);
            }
        }
    }
}
```

For additional information see the [GmailApp API](https://developers.google.com/apps-script/reference/gmail/gmail-app).

3. Create a Trigger

In order to run the script automatically, set up a time-based tripper.

* Click the clock icon in the left panel
* Click "Add" trigger
* Set up the trigger to run the function. (e.g. `labelFakePhishing()`)

![Google App Script Trigger](../../../images/blogs/email/app-script-trigger.png)

4. Permissions

The first time you run the script, you will need to authorize it to your Gmail account

![Google App Script Auth](../../../images/blogs/email/app-script-auth.png)

5. Victory!K

Now phishing emails are labeled with my custom "It's a Trap!" label and moved out of my inbox.

![Labels in Gmail](../../../images/blogs/email/gmail-email-label.png)

### Outlook

1. Open Outlook
2. Navigate to the Home tab
3. Click 'Rules' > 'Manage Rules & Alerts'
4. Create a new Rule

![Outlook](../../../images/blogs/email/outlook.webp)

## Considerations

If there is ever a sliver of doubt, one of the first things I will do is view the source of the email in question. There are a few low-hanging fruit that can help to identify phishing emails such as poor grammar, clearly malicious URLs, or the deposed prince of Nigeria asking for money. A few higher value validations I prefer to review is if the mail in question has valid DKIM, DMARC, and SPF records. Malicious actors can and will attempt to spoof the domain an email is actually coming from.

None of this is intended to be a panacea. Creating filters to bypass practice these skills may in fact lull your awareness and readiness for these kinds of attack vectors in the future. Again, I want to stress the use of caution and wisdom in implementing something like this. For me it was a small quality of life improvement in response to a now former customer with an overzealous red team. If that is the case for you, I'd encourage you to try the same. 

As always stay alert and vigilant. 

