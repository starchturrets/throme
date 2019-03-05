let request;
let lastThread;
let url;
let data;
let count = 0;
url = 'https://api.reddit.com/r/all'
document.addEventListener('load', requestData());

function requestData() {
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.addEventListener('load', getJSON);

    function getJSON() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            data = JSON.parse(request.responseText);
            lastThread = data.data.after;
            console.log('The request url was: ' + url);
            console.log('The lastThread is:' + lastThread);
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
    console.log(data);
    /* for (postCount = 0; postCount < data.data.children.length; postCount++) {
         createElement();
     } */
    createButton();
}


let post;
let title;
let permalink;
//declare variables in global scope because it's best practice or something lik that:
function createElement() {
    post = document.createElement('div');
    post.className = 'post';
    post.id = 'post' + postCount;
    title = document.createElement('a');
    title.className = 'title';
    title.textContent = 'placeholder title';
    post.appendChild(title);
    title.textContent = data.data.children[postCount].data.title;
    let link = 'https://reddit.com' + data.data.children[postCount].data.permalink + '/.mobile?keep_extension=True';
    title.setAttribute('href', link);
    //  permalink.setAttribute('href')
    document.body.appendChild(post);
}

function createButton() {
    let button = document.createElement('button');
    button.textContent = 'Load More';
    button.className = 'loadMore';
    button.addEventListener('click', loadMore);
    document.body.appendChild(button);
}

function loadMore() {
    count = count + 25;
    url = 'https://api.reddit.com/r/all' + '?count=' +
        count + '&after=' + lastThread + '/.json';
    console.log(url);
    requestData();
}


document.querySelector('#reload').addEventListener('click', reload);

function reload() {
    window.location.reload(true);
}