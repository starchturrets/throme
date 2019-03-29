"use strict";
let pageCount = 1;
window.onload = fetch('https://api.reddit.com/r/all/.json')
    .then((resp) => resp.json()) // Jesus Christ, it's Json Bourne!
    .then(data => renderFeed(data));
let postCount;
let after;
const feed = document.querySelector('#feed');
const renderFeed = (json) => {
    for (let count = 0; count < json.data.children.length; count++) {
        let thumbNail = json.data.children[count].data.thumbnail;
        let postMarkup;
        if (thumbNail !== 'self' && thumbNail !== 'image' && thumbNail !== 'default' && thumbNail !== 'spoiler' && thumbNail !== 'nsfw') { //post with thumbnail
            postMarkup = `
        <div class="post">
        <a target = "_blank" href = "https://i.reddit.com${json.data.children[count].data.permalink}">${json.data.children[count].data.title}</a> 
        <a href=${json.data.children[count].data.url} target="blank"><img alt="thumbnail" src="${json.data.children[count].data.thumbnail}"</a>
        </div>
        `
        } else {
            postMarkup = `
        <div class="post">
        <a target = "_blank" href = "https://i.reddit.com${json.data.children[count].data.permalink}"> ${json.data.children[count].data.title}</a> 
        </div>`
        }
        feed.innerHTML += postMarkup;
    }
    after = json.data.after;
    console.log(after);
    addButton();
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
    let url = `https://api.reddit.com/r/all?count=+${count}'&after=${after}`
    console.log(url);
    fetch(url)
        .then((resp) => resp.json()) // Jesus Christ, it's Json Bourne!
        .then(data => renderFeed(data));
}
//Plans: first, use the fetch API w/ arrow functions. Then, use a combination of ES6 Template Literals, += .innerHTML, and some CSS, to add new feed items. Add a button at the bottom to load more feed items. On click, change it to a pagecount indicator and add another button on the bottom. Figure out routing and SPA functionality later.