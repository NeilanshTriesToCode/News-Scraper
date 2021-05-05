/* JavaScript file to take user's input, and send request to the server (at localhost:3000)
   to return news headlines and links */
// This along with the HTML file form the frontend of the project
const socket = io('http://localhost:3000'); // socket to connect to the server

window.onload = function(){
    var searchFor = document.getElementById('searchText');
    var search_button = document.getElementById('submit');

    // event listener for button
    search_button.addEventListener('click', () => {
        // once connection with the server is established, do the following
        socket.emit('get news info', searchFor.value);
        console.log('message sent');     // DEBUG

        // event to handle reply from the server
        // the event has been named 'get news info'
        socket.on('get news info', (serverReply) => {
            console.log('server message: ' + serverReply);  // DEBUG

            /* serverReply is an array with each element being an object
            consisting of news headline and link (from a news card retrieved from scraping)
            as its elements. In short, serverReply is an array of objects
            */
            for(var i = 0; i < serverReply.length; i++){
                // calling function to display news headlines and links in HTML
                 displayNewsInHTML(serverReply[i]['headline'], serverReply[i]['link']);
             }
        });     
    });   
}

// function to display news headline and link in HTML
function displayNewsInHTML(headline, link){
    // creating references for HTML elements
    var display_box = document.getElementById('display_box');
    var news_container = document.createElement('div');
    var headline_element = document.createElement('p');
    var link_container = document.createElement('p');
    var link_element = document.createElement('a');

    // adding necessary attributes to the elements
    news_container.setAttribute('id', 'news_item');
    headline_element.setAttribute('id', 'headline');
    link_element.setAttribute('id', 'link');
    link_container.setAttribute('id', 'link_container');
    link_container.appendChild(link_element);
 
    headline_element.innerHTML = headline;
    link_element.href = link;
    link_element.innerHTML = link;

    // displaying news headline and link
    display_box.appendChild(news_container);
    news_container.appendChild(headline_element);
    news_container.appendChild(link_container);
} 

