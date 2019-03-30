"use strict";
let pageCount = 1;
window.onload = fetch('https://api.reddit.com/r/all/.json')
    .then((resp) => resp.json()) // Jesus Christ, it's Json Bourne!
    .then(data => renderFeed(data));
let postCount;
let after;
const feed = document.querySelector('#feed');
const renderFeed = (json) => {
    console.log(json.data.children[0]);
    for (let count = 0; count < json.data.children.length; count++) {
        let score = json.data.children[count].data.score;
        let age = convertDate(json.data.children[count].data.created);
        let author = json.data.children[count].data.author;
        let commentNumber = json.data.children[count].data.num_comments;
        let subreddit = json.data.children[count].data.subreddit;
        score = eval(score / 1000).toFixed(1);
        let url = json.data.children[count].data.url;
        let thumbNail = json.data.children[count].data.thumbnail;
        let permalink = `https://i.reddit.com${json.data.children[count].data.permalink}`;
        let title = json.data.children[count].data.title;
        let displayThumbNail = checkThumbNail(thumbNail);
        let postMarkup = `
        <div class="post">
        <a target = "_blank" href = "${permalink}">${title}</a> 
        ${displayThumbNail ? `<a href=${url} target="blank"><img alt="thumbnail" class="thumbnail" src="${thumbNail}"</a>`: '<!--Nothing to see here, move along folks.-->'}
        </a>
        <span class="info"> ${score}k points submitted ${age} hours ago by <a href="https://i.reddit.com/u/${author}">${author}</a> to <a href="https://i.reddit.com/r/${subreddit}">/r/${subreddit}</a></span>
        <a target="_blank" class="comments" href="${permalink}">${commentNumber}</a>
        </div>
        `
        feed.innerHTML += postMarkup;
    }
    after = json.data.after;
    addButton();
}
const checkThumbNail = (thumbNail) => {
    if (thumbNail !== 'self' && thumbNail !== 'image' && thumbNail !== 'default' && thumbNail !== 'spoiler' && thumbNail !== 'nsfw') {
        return true;
    } else {
        return false;
    }
}
let count = 0;
const addButton = () => { //Arrow functions are fun!
    if (pageCount > 1) {
        feed.removeChild(document.querySelector('.loadMore'));
    }
    let button = document.createElement('button');
    button.className = 'loadMore';
    button.textContent = 'Load More';
    button.addEventListener('click', loadMore);
    feed.appendChild(button);
}

const loadMore = () => {
    pageCount++;
    count += 25;
    let url = `
            https://api.reddit.com/r/all?count=+${count}'&after=${after}`
    console.log(url);
    fetch(url)
        .then((resp) => resp.json()) // Jesus Christ, it's Json Bourne!
        .then(data => renderFeed(data));
}
const convertDate = (created) => {
    //console.log(timestamp);
    let current = Math.floor(Date.now() / 1000);
    created = eval(current - created);
    created = eval(created / 3600);
    created = Math.floor(created);
    return created;
}
convertDate();
//Plans: first, use the fetch API w/ arrow functions. Then, use a combination of ES6 Template Literals, += .innerHTML, and some CSS, to add new feed items. Add a button at the bottom to load more feed items. On click, change it to a pagecount indicator and add another button on the bottom. Figure out routing and SPA functionality later.