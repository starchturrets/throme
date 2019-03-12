let request;
let after;
let url;
let data;
let count = 0;
let pageCount = 1;
let main;
url = 'https://api.reddit.com/r/all/'
//document.addEventListener('load', requestData());
var x = myFunction(4, 3); // Function is called, return value will end up in x

function myFunction(a, b) {
    return a * b; // Function returns the product of a and b
}
//console.log(x); //Some random code I pasted in from w3Schools because I barely understand functions as it is.
window.onload = requestData();

function requestData() {
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener('load', getJSON);

    function getJSON() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            data = JSON.parse(request.responseText);
            after = data.data.after;
            // console.log('The requested url was: ' + url);
            // console.log('The after is: ' + after);
            createMain();

            renderItems();

        } else {
            // We reached our target server, but it returned an error
            console.log('Server Error');
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
        console.log('Connection Error');
    };

    request.send();
}

function renderItems() {

    // console.log(data);
    for (postCount = 0; postCount < data.data.children.length; postCount++) {
        createPost();
    }
    createButton();
}

function createMain() {
    main = document.createElement('main'); //Remember the Maine!
    document.body.appendChild(main);
}




let container;
let title;
let permalink;
let details;
let summary;
let thumbNailValue;

//declare variables in global scope because it's best practice or something like that:
function createPost() {
    createContainer();
    checkForThumbnail();
    main.appendChild(container);
}

function createContainer() {
    container = document.createElement('div');
    container.className = 'post';
    container.id = 'post' + postCount;
    createTitle();
    displayAge();
}

function checkForThumbnail() {
    thumbNailValue = data.data.children[postCount].data.thumbnail;
    if (thumbNailValue !== 'self' && thumbNailValue !== 'image' && thumbNailValue !== 'default' && thumbNailValue !== 'spoiler' && thumbNailValue !== 'nsfw') {
        createThumbnail();
    }

}

function createTitle() {
    createHeader();
    title = document.createElement('a');
    title.className = 'title';
    container.appendChild(title);
    populateTitle();
}

function populateTitle() {
    title.textContent = data.data.children[postCount].data.title;
    let link = 'https://i.reddit.com' + data.data.children[postCount].data.permalink;
    title.setAttribute('href', link);
    title.setAttribute('target', '_blank');
}


function createThumbnail() {
    let thumbnail = document.createElement('img');
    thumbnail.className = 'thumbnail';
    let src = thumbNailValue;
    thumbnail.setAttribute('src', src);
    src = document.createElement('a');
    src.setAttribute('href', data.data.children[postCount].data.url);
    src.setAttribute('target', '_blank');
    thumbnail.setAttribute('alt', 'Thumbnail');
    src.appendChild(thumbnail);
    container.appendChild(src);
}
let subreddit;

function displaySubreddit() {}
let Age;

function createHeader() {}

function displayAge() {
    age = data.data.children[postCount].data.created;
    // console.log(age);
}

function displaycontainerer() {}


function displayKarma() {}

function displayComments() {}

function displayDomain() {}


function createButton() {
    let button = document.createElement('button');
    button.textContent = 'Load More';
    button.className = 'loadMore';
    button.addEventListener('click', loadMore);
    document.body.appendChild(button);
}

function loadMore() {
    count = count + 25;
    pageCount++;
    url = 'https://api.reddit.com/r/all' + '?count=' +
        count + '&after=' + after;
    //console.log(url);
    document.body.appendChild(document.createTextNode('PAGE ' + pageCount));
    document.body.removeChild(document.querySelector('.loadMore'));
    requestData();
}


document.querySelector('#reload').addEventListener('click', reload);

function reload() {
    window.location.reload(true);
}

/* 
IF container is text, then create a <details> tag and fill in with text.

ELSEIF container is a permalink, grab a thumbnail and display it.

if it's a container with an enclosed link, do both

*/