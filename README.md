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
![image](https://user-images.githubusercontent.com/60074628/118598975-7c352080-b7cc-11eb-9215-c263caa84c9a.png)

3. Search for a topic. Result might take a few seconds to load.
![image](https://user-images.githubusercontent.com/60074628/118599788-b4892e80-b7cd-11eb-8771-de8c1864f978.png)

4. This is what the results page looks like:<br>
![image](https://user-images.githubusercontent.com/60074628/118599911-e0a4af80-b7cd-11eb-9b5e-2dffa0b4fdc0.png)

5. Clicking on a new item would take the user to the article's page/website.
![image](https://user-images.githubusercontent.com/60074628/118600024-0631b900-b7ce-11eb-9e01-d68dbf412dc5.png)

6. Terminal console (for server-file/**index.js**):
![image](https://user-images.githubusercontent.com/60074628/118600889-36c62280-b7cf-11eb-9e13-2e17db56dcaa.png)

7. Browser console (for client-file/**process.js**):<br>
![image](https://user-images.githubusercontent.com/60074628/118600743-04b4c080-b7cf-11eb-98ed-cb321582388f.png)

## Tips for better understanding:
- Go through the documentation/tutorials for the APIs.
- Follow along the code for comments for better understanding of how it works behind the scenes. 
- Check the terminal console where the code is executed (for **index.js or server-file**), and the browser console (for **process.js or client file**) to keep a track of events taking place in server and client files during execution.
- Inspecting the destination webpage ***(Ctrl+Shitf+I)*** is highly recommended to better understand its HTML structure.
- Set the **headless** atttribute of **Puppeteer** to ***false*** to see its actions in the browser, and which elements are clicked on. [Find the link to the line of code here.](https://github.com/NeilanshTriesToCode/News-Scraper/blob/a57d23c995c3d3ef83f06a74e9b2b2d6ed060488/index.js#L48)

## References
- https://socket.io/
- https://pptr.dev/
- https://cheerio.js.org/
