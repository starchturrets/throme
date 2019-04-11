"use strict";
const $ = document.querySelector.bind(document);
const BUTTON = $('.load_more'); //Take that, jQuery!
const feed = $('.feed');
let count = 0;

function get(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => main(data)); //Because I can't figure out how promises work.
}

function main(data) {

    feed.innerHTML = '';
    let posts = data.data.children;
    for (posts of posts) {
        const markup = createMarkup(posts);
        feed.innerHTML += markup;
    }
    BUTTON.addEventListener("click", loadMore, {
        once: true
    });

    function loadMore() {
        count += 25;
        console.log("clicked!");
        let url = `https://api.reddit.com/r/popular?count=+${count}&after=${
					data.data.after
				}`;
        get(url);
    }
}

function createMarkup(posts) {
    const title = renderTitle(posts);
    const markup = `<div class="post">
${title}
            <div class="info"> <a target="_blank" href="https://i.reddit.com${posts.data.permalink}">${posts.data.num_comments} comments</a>  <a
                    target="_blank" href="https://i.reddit.com/u/${posts.data.author}">${posts.data.author}</a>  ${convertDate(posts.data.created)} hours ago  <a
            
                    href="#/r/${posts.data.subreddit}">/r/${posts.data.subreddit}</a></div>
            <span class="comments">${posts.data.score} points</span>
        </div>`;
    return markup;
}

function renderTitle(posts) {
    if (posts.data.is_self === false) {
        const markup = `<a target="_blank"
                href="${posts.data.url}">${posts.data.title}</a> (${posts.data.domain})`;
        return markup;
    } else {
        const markup = `<a target="_blank" href="https://i.reddit.com${posts.data.permalink}">${posts.data.title}</a> (self)`;
        return markup;
    }
}

function convertDate(created) {
    let current = Math.floor(Date.now() / 1000);
    created = eval(current - created);
    created = eval(created / 3600);
    created = Math.floor(created);
    return created;
}
window.addEventListener('load', route);
window.addEventListener('hashchange', route);

function route() {
    if (window.location.hash !== '') {
        let url = window.location.hash.split('#');
        console.log(url[1]);
        url = `https://api.reddit.com${url[1]}/`;
        console.log(url);
        get(url);
    } else {
        window.location.hash = '/r/popular';
        route();
    }
}