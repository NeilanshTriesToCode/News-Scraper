/* This file acts as the server and receives requests from the client to scrape news 
   on a topic entered by the user. It then returns news headlines and links to the 
   client.
   This file forms the backend of the project.
*/
const express = require('express');
const app = express();
// creating server
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"}});

const puppeteer = require('puppeteer'); // scraper for dynamic websites
const cheerio = require('cheerio');  // library to manipulate HTML content returned after scraping

// Static files: files/content provided by the Server to its Clients
// static files are usually stored within the public folder
app.use(express.static('public'));

// initiate connection
server.listen(3000, () => {          // listens to a given port number
    console.log('listening to port # 3000');
    console.log('Connecting...');
});  

// function to respond to the client
io.on('connection', (socket) => {
    console.log('connected to socket ' + socket.id);

    // receive reply from client
    // the event has been named 'get news info'
    socket.on('get news info', (clientReply) =>{
        console.log('client message: ' + clientReply);    // DEBUG     
        socket.emit('get news info', clientReply);  
        scrapeNews(clientReply).then((data) => {
            console.log('accessing then part of scrapeNews() function call');
            console.log(data);
        });
        console.log('message to client sent sent!');     // DEBUG
    });   
});

// function to perform web-scraping
function scrapeNews(searchFor){

    return new Promise((resolve, reject) => {
        const url = 'http://www.google.com';
        puppeteer
            .launch({headless: false})
            .then((browser) => { return browser.newPage() })
            .then(async (page) => { 
                return page.goto(url).then(async () =>{
                    await page.setViewport({ width: 1920, height: 1080 });   // open browser window to show puppeteer's actions
                    // await page.focus('.gLFyf.gsfi');     // focus on the search bar
                    await page.click('.gLFyf.gsfi');     // click on the search bar
                    await page.keyboard.type(searchFor + 'news');      // search for the given term
                    await page.keyboard.press('Enter');   
                    await page.waitFor(3000);  
                   /* var html = await page.content(); 
                    const $ = cheerio.load(html);
                    var nav_links = $('.MUFPAc > .hdtb-mitem').children();  // get top nav link elements after Google search
                    
                   
                     - nav_link returns an object list of objects. 
                     - Each object inside the object-list is an HTML link node/element.
                     - These links point to different pages of the search and 
                       are in this order as seen on the Google page: [All  Shopping  Images  News  Videos  More]
                     - We'll select on the link node/element from the object-list which directs to the News page, 
                       which is at index 4 of the object list.
                    */
                    //console.log(nav_links[4]['children'][1]['data']);
                    await page.click('.Q2MMlc');     
                    // page.screenshot({path: 'sc.png'});            // DEBUG
                    await page.waitFor(3000);   
                    return page.content();         // returns html content of the page
                });
            })
            .then(async (html) => {
                // work with html content to retrieve news headlines
                const $ = cheerio.load(html);
                var for_links = $('div > .nChh6e.DyOREb > div > div > .dbsr').children();  // object containing element for link and its children
                //console.log(for_links.length);
                return for_links;  // returns array containing two objects containing html info about news cards (healdines and links)
            }) 
            .then(async (news_links) => {
               /*  BASIC STRUCTURE OF A NEWS-CARD DOM:
                 - Each news item is inside an HTML element called 'g-card'
                 - Every content (news headline, news image, sub headline, date, etc.) is inside a link element, which is a child of 'g-card'
                 - This function receives an object which contains the list of all the link elements inside all 'g-card's
                 - Each link element further has a child which is an element of class 'yr3B8d KWQBje'. This element contains 
                   all the news content as its children (headlines, image, sub-headline), which altogether are displayed as a single link.
                 - The element of class 'yr3B8d KWQBje' has 2 children, each containing a news element like image, headline, etc.
                 - We'll be focusing on the second child, which contains the news headline.
                 - This function receives an "object of objects" containing a list of all the link elements/nodes. 
                 - Every node/element is represented as an object, with its attributes, children, parent node, children nodes 
                   specified as key-value pairs inside the node/element object.
                 - The 'children' key inside a node/element object has an array of that node/element children in the DOM tree. 
                */
                //console.log(news_links[0]['children'][0]['children'][1]['children'][1]['children'][0]['data']);
                // creating a 2D array
                var items = [];                
                for(var i = 0; i < news_links.length; i++){
                    var news_h = [];
                    if( news_links[i]['name'].localeCompare('a') == 0){
                        var link = news_links[i]['attribs']['href'];
                        var news_items_container = news_links[i]['children'][0];
                        var news_text = news_items_container['children'][1];
                        var headline_container = news_text['children'][1];
                        var headline = headline_container['children'][0]['data'];
            
                        news_h.push(headline);
                        news_h.push(link);
                        items.push(news_h);    // array to contain sub arrays of news headlines and links
                        console.log(headline);
                        console.log('     Link: ' + link);
                        console.log('\n');                  
                    }          
                }
                resolve(items); 
                console.log('success');
            }) 
            .catch((err) => {
                console.log(err);
            });

    });
   
}   



