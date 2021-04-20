// importing modules needed for scraping
const request = require('request-promise');  // scraper for static websites
const $ = require('cheerio');
const pupeeteer = require('puppeteer');      // scraper for dynamic websites

var url = 'https://news.google.com/search?q=fc%20barcelona&hl=en-IN&gl=IN&ceid=IN%3Aen';
pupeeteer
    .launch()
    .then((browser) => { return browser.newPage() })
    .then((page) => { 
        return page.goto(url).then(() =>{
            return page.content();         // returns html of the page
        });
    })
    .then((html) => {
       //$('.gLFyf gsfi').text = 'fc barcelona';
       var headlines = $('.DY5T1d.RZIKme', html).text();
      /* for(var i = 0; i < headlines.length; i++){
        console.log(headlines[i].text());
        console.log('\n');
       } */
       console.log(headlines);
      
       console.log('success');
    })
    .catch((err) => {
        console.log(err);
    });
    



