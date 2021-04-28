// importing modules needed for scraping
const request = require('request-promise');  // scraper for static websites
const cheerio = require('cheerio');
const pupeeteer = require('puppeteer');      // scraper for dynamic websites

var url = 'http://www.google.com';

pupeeteer
    .launch({headless: false})
    .then((browser) => { return browser.newPage() })
    .then(async (page) => { 
        return page.goto(url).then(async () =>{
            await page.setViewport({ width: 1920, height: 1080 });   // open browser window to show puppeteer's actions
            // await page.focus('.gLFyf.gsfi');     // focus on the search bar
            await page.click('.gLFyf.gsfi');     // click on the search bar
            await page.keyboard.type('fc barcelona news');      // search for the given term
            await page.keyboard.press('Enter');   
            await page.waitFor(3000);   
            await page.click('.Q2MMlc');     
            // page.screenshot({path: 'sc.png'});            // DEBUG
            await page.waitFor(3000);   
            return page.content();         // returns html content of the page
        });
    })
    .then(async (html) => {
        // work with html content to retrieve news headlines
        const $ = cheerio.load(html);
        var news_items = [];
        var for_headlines = $('.yr3B8d.KWQBje > .hI5pFf').children();  // object containing elements for news pic, headlines, etc.
        var for_links = $('.nChh6e.DyOREb > div > .dbsr').children();  // object containing element for link and its children
        // console.log(content[0]['attribs']['href']);
        news_items.push(for_headlines);
        news_items.push(for_links);
       return news_items;  // returns array containing two objects containing html info about news cards (healdines and links)
    })
    .then(async (news_items) => {
        /* BASIC STRUCTURE OF A NEWS-CARD DOM:
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
       var news_info = news_items[0];
       var news_links = news_items[1];
       console.log(news_links[0]['children'][0]['children'][1]['children'][1]['children'][0]['data']);
            /*for(var j = 0; j < news_links.length; j++){
                // if the element belongs to the class "JheGif nDgy9d", it's the element containing the news headline
                if( news_info[j]['attribs']['class'].localeCompare('JheGif nDgy9d') == 0 ){  
                    console.log(news_info[j]['children'][0]['data']);  // print news headline
                    if( news_links[j]['name'].localeCompare('a') == 0){
                        console.log('     Link: ' + news_links[j]['attribs']['href']);
                    }           
                    console.log('\n');
                }                
            } */
       

    }) 
    .catch((err) => {
        console.log(err);
    });
    
    



