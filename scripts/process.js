/* JavaScript file to take user's input, and send request to the server (at localhost:3000)
   to return news headlines and links */
const socket = io('http://localhost:4000'); // socket to connect to the server


window.onload = function(){
    // event to handle reply from the server
    // the event has been named 'request'
    socket.on('request', (data) => {
        console.log(data);
    })




}
