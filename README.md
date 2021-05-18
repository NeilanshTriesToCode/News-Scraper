# News-Scraper

## Overview
- This project implements a Web Scraper that scrapes for news, based on the topic entered by the user.
- The user types a topic, and the scraper returns latest news headlines and links to the articles.
- News scraped using Google.
- Done using JavaScript and HTML/CSS.
- Implemented using a Client-Server service using **socket.io** and **expressJS** APIs.
- Also uses other APIs such as **Puppeteer** and **CheerioJS** for scraping.

## Components
### Client Side
- All the code associated to the client side could be found inside the **public** directory.
- **main.html** contains the HTML code for the interface, which displays the news headlines and links ones the user searches for a topic.
- **styles.css** contains all the styles required for **main.html**.
- **process.js** processes the topic entered by the user, and sends a request to the server-side script (using **socket.io**) which then returns the news resources. It renders the news in readable format.

### Server side
- **index.js** receives the topic entered by the user from the client file (**process.js**). 
- Employing the **Puppeteer** and **CheerioJS** APIs, it scrapes for news, and returns headlines and their links to the client file using **socket.io**.

## APIs
- **expressJS**: used to implement the server-side. It facilitates the user of sockets.
- **socket.io**: to implement sockets on the client and server files to exchange information.
- **Puppeteer**: to connect to the web, and perform simple functions such as heading to a website, typing, searching, etc. It was used to perform a Google search for the news on the topic entered by the user, and locate the "News" tab, which displays many "News-cards" or news headlines on the topic. It was also used to retrieve the HTML content of the destination web page. 
- **CheerioJS**: to refer to HTML contents of the webpage retrieved using **Puppeteer**. It works just like jQuery, and elements of the HTML webpage could be retrieved using the same syntax. It was thus useful in accessing the "News-card" elements and their attributes which consisted of sub-elements such as news headlines, links, etc. 

## Running the code
- Make sure that the above-mentioned APIs have been installed.
- Head on to the terminal and locate to the directory where the repository is saved/cloned. Then run ***node index.js***.
- On executing the code, open the HTML file in a web browser. The code running in the terminal would notify by saying "Connected to socket" followed its ID.
- You're good to go! Type in the topic for the news, and wait a few seconds for the results. There you'll have it!
- Follow along the code for comments for better understanding of how it works behind the scenes. Inspecting the destination webpage ***(Ctrl+Shitf+I)*** is highly recommended to better understand its HTML structure.

## Screenshots
![image](https://user-images.githubusercontent.com/60074628/118596730-63773b80-b7c9-11eb-8d8e-8faf7eebf46f.png)


## References
- https://socket.io/
- https://pptr.dev/
- https://cheerio.js.org/
