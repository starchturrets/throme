"use strict";
//I'm using XHR instead of fetch because I can't figure out how promises work just yet.
export function get(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    let json;
    request.onload = () => {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            let json = JSON.parse(this.response);
            return json;
        } else {
            // We reached our target server, but it returned an error
            console.log('Server error!');
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
        console.log('Connection error!');
    };

    request.send(); //I have no idea what this is.

}