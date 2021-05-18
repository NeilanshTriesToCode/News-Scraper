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
1. Running code on console. User would be notified after the HTML page is opened in the browser:
![image](https://user-images.githubusercontent.com/60074628/118596936-a89b6d80-b7c9-11eb-897a-219c0d547d25.png)

2. This is what the HTML page looks like:
![image](https://user-images.githubusercontent.com/60074628/118597054-ccf74a00-b7c9-11eb-8cba-541c940a2be2.png)

3. Search for a topic. Result might take a few seconds to load.
![image](https://user-images.githubusercontent.com/60074628/118597296-21022e80-b7ca-11eb-9601-d7dbecd66f99.png)

4. This is what the results page looks like:
![image](https://user-images.githubusercontent.com/60074628/118597493-5eff5280-b7ca-11eb-9cff-6534d58acd7d.png)

5. Clicking on a new item would take the user to the article's page/website. This is where the user was directed on clicking on the first new item from the previous screenshot:
![image](https://user-images.githubusercontent.com/60074628/118597695-a685de80-b7ca-11eb-887e-aa258d37b900.png)

## Tips for understanding the code better:
- Follow along the code for comments for better understanding of how it works behind the scenes. 
- Inspecting the destination webpage ***(Ctrl+Shitf+I)*** is highly recommended to better understand its HTML structure.
- Set the **headless** atttribute of **Puppeteer** to ***false*** to see its actions, and which elements are clicked on.

## References
- https://socket.io/
- https://pptr.dev/
- https://cheerio.js.org/
