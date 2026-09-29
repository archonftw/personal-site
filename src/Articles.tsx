export type ArticleMeta = {
  slug: string;      // used in the address: /articles/<slug>
  title: string;
  date: string;      // shown as written, e.g. "Oct 2, 2026"
  readTime: string;  // e.g. "3 min read"
  summary: string;   // one line under the title
  text?: string;     // the article, as plain text
  draft?: boolean;   // true = title is listed but can't be opened yet
};

/*
  HOW TO WRITE AN ARTICLE
  1. Copy one entry below and paste it at the TOP of the list (newest first).
  2. Change slug, title, date, readTime and summary.
  3. Type your article between the backticks ` ` after "text:".
     - Leave a blank line between paragraphs.
     - Start a line with "## " to make a heading.
     - To add an image: save the file in public/images/ (create the folder if needed),
       then put this on its own line, with a blank line above and below:
       ![Short caption](/images/your-image.png)
     - To add a video, put one of these on its own line (blank line above and below):
       youtube: https://www.youtube.com/watch?v=XXXXXXXXXXX | Optional caption
       video: /videos/your-video.mp4 | Optional caption
       (for "video:", save the file in public/videos/)
  Don't type a backtick (`) inside your text.
*/

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "what-my-first-internship-taught-me",
    title: "My 1st Internship",
    date: "Sep 29, 2026",
    readTime: "3 min read",
    summary: "A whiteboard on day one, a lesson in logging, and an address I hardcoded in fifty places.",
    text: `I just finished my first internship and I learned a lot about how software is actually built.
 
On my first day, I sat idle for almost two hours. The team was still figuring out what to give a two-month intern, and they couldn't give me access to the codebase because it was a private repo. That was fine. After a coffee break, my supervisor took me to a conference room named "Dalhousie" and started explaining the lore of the VES collector, O-RAN and ONAP, sketching the whole workflow with a black marker on a whiteboard.
 
I was very excited. You know how in movies the mastermind walks the crew through the plan to rob the bank? It felt very close to that. Obviously we weren't robbing a bank. We were building software that collects data from the network and sends it to the cloud. But seeing the whole picture, and where my work would fit into it, was exciting.
 
![](/images/a.jpeg)
 

 

## 127.0.0.1 always means this machine

Everyone knows environment variables matter, and that you shouldn't hardcode delicate things like IPs and passwords. I knew it too, and I took care of it. I even made a proper env file.

Here is where it went wrong. I did all my development on my local machine, and when I was done I thought, "That was easy, running it on the server will take a second." But when the assistant started it, it didn't work. He was connected over SSH to a physical machine placed two rooms away, and my code had 127.0.0.1 hardcoded in about fifty places.

The loopback address always means "this same machine," so as soon as the code ran somewhere else, those addresses no longer pointed where I had assumed. I had never thought about that. I spent another twenty minutes replacing them everywhere in the codebase.

It wasn't a big deal, but it taught me a lot. An address is configuration, even the obvious ones like localhost. Never assume where your code will run.

![](/images/b.jpeg)

## The importance of logging

On the last day, I was busy handing the project over to my supervisor's assistant. Both of them were happy, and not just because it worked, but because of how clean and maintainable the architecture was. Honestly, it really was clean. Everything was documented, every function had a docstring, and every log was placed where it would help a future developer see what the error is and where it happened.
 
I owe the logging part to my mentor. He found a bug, and to work out where it even happened, he told me to add logs a day before. That was the day I understood why logging matters in a project. My code is now running on the company's server, and it feels very alive. No matter what now, I'll never ever forget to add logs to functions now`
  }
];