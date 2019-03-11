let request;
let after;
let url;
let data;
let count = 0;
let pageCount = 1;
url = 'https://api.reddit.com/r/all/'
document.addEventListener('load', requestData());

function requestData() {
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener('load', getJSON);

    function getJSON() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            data = JSON.parse(request.responseText);
            after = data.data.after;
            console.log('The requested url was: ' + url);
            console.log('The after is: ' + after);
            renderPosts();

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

function renderPosts() {
    // console.log(data);
    for (postCount = 0; postCount < data.data.children.length; postCount++) {
        createElement();
    }
    createButton();
}


let post;
let title;
let permalink;
let details;
let summary;
//declare variables in global scope because it's best practice or something like that:
function createElement() {
    post = document.createElement('div');
    post.className = 'post';
    post.id = 'post' + postCount;
    createTitle();
    //  console.log(data.data.children[postCount].data.thumbnail);
    checkForThumbnail();


    //  permalink.setAttribute('href')
    // console.log(data.data.children[postCount].data.thumbnail);
    // if (data.data.children[postCount].data.thumbnail = 'self') {
    // console.log('There is no thumbnail');
    // }
    document.body.appendChild(post);
}

function checkForThumbnail() {
    let thumbNailValue = data.data.children[postCount].data.thumbnail;

    if (thumbNailValue === 'self') {
        // console.log('No thumbnail.');
    } else if (thumbNailValue === 'image') {
        // console.log('Thumbnail unavailable.');

    } else if (thumbNailValue === 'default') {
        //WTF does default mean?
    } else if (thumbNailValue === 'spoiler') {

    } else if (thumbNailValue === 'nsfw') {} else {
        createThumbnail();
    }

}

function createTitle() {
    title = document.createElement('a');
    title.className = 'title';
    post.appendChild(title);
    title.textContent = data.data.children[postCount].data.title;
    let link = 'https://i.reddit.com' + data.data.children[postCount].data.permalink;
    title.setAttribute('href', link);
    title.setAttribute('target', '_blank');
}

function createThumbnail() {
    let thumbnail = document.createElement('img');
    thumbnail.className = 'thumbnail';
    let src = data.data.children[postCount].data.thumbnail;
    thumbnail.setAttribute('src', src);
    src = document.createElement('a');
    src.setAttribute('href', data.data.children[postCount].data.url);
    src.setAttribute('target', '_blank');
    thumbnail.setAttribute('alt', 'Thumbnail');
    src.appendChild(thumbnail);
    post.appendChild(src);
}

function displaySubreddit() {}

function displayAge() {}

function displayPoster() {}


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
    console.log(url);
    document.body.appendChild(document.createTextNode('PAGE ' + pageCount));
    document.body.removeChild(document.querySelector('.loadMore'));
    requestData();
}


document.querySelector('#reload').addEventListener('click', reload);

function reload() {
    window.location.reload(true);
}

/* 
IF post is text, then create a <details> tag and fill in with text.

ELSEIF post is a permalink, grab a thumbnail and display it.

if it's a post with an enclosed link, do both

*/