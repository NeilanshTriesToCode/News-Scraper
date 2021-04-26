// importing modules needed for scraping
const request = require('request-promise');  // scraper for static websites
const cheerio = require('cheerio');
const pupeeteer = require('puppeteer');      // scraper for dynamic websites

//var url = 'https://news.google.com/topstories?hl=en-IN&gl=IN&ceid=IN:en';   // search for news at google news
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
        var content = $('.yr3B8d.KWQBje > .hI5pFf').children();
        console.log(content[4]['children'][0]['data']);      // print headline

        /* TODO:
           - Compare class name for every element, and check if it belongs to headline div
           - if yes, print headline
           - search for news link 
        */
       

       /* for(var i = 0; i < content.length; i++){
            console.log(content[i]);
        } */
        console.log('success');
    }) 
    .catch((err) => {
        console.log(err);
    });
    
    



