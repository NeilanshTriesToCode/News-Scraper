// importing modules needed for scraping
const request = require('request-promise');  // scraper for static websites
const $ = require('cheerio');
const pupeeteer = require('puppeteer');      // scraper for dynamic websites

var url = 'https://news.google.com/topstories?hl=en-IN&gl=IN&ceid=IN:en';   // search for news at google news

pupeeteer
    .launch({headless: false})
    .then((browser) => { return browser.newPage() })
    .then((page) => { 
        return page.goto(url).then(async () =>{
            await page.setViewport({ width: 1920, height: 1080 });   // open browser window to show puppeteer's actions
            await page.focus('.yNVtPc.ZAGvjd.Ny5lGc');     // focus on the search bar
            await page.click('.yNVtPc.ZAGvjd.Ny5lGc');     // click on the search bar
            await page.keyboard.type('fc barcelona');      // search for the given term
            await page.keyboard.press('Enter');           
            // page.screenshot({path: 'sc.png'});            // DEBUG
            await page.waitForNavigation();
            return page.content();         // returns html content of the page
        });
    })
    .then(async (html) => {
        // work with html content to retrieve news headlines
    }) 
    .catch((err) => {
        console.log(err);
    });
    
    



