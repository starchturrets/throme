"use strict";
let url = 'https://api.reddit.com/r/all/.json';
let json;
let page_count = 1;
let count = 0;
fetch(url)
    .then((resp) => resp.json()) // Jesus Christ, it's Json Bourne!
    .then(data => render_feed(data));
let post_count;
let after;
let feed = document.querySelector('#feed');


function render_feed(json) {
    let children_length = json.data.children.length;
    for (post_count = 0; post_count < children_length; post_count++) {
        create_post(json, post_count);
    }
    after = json.data.after;
    append_button(after);
}

function create_post(json, post_count) {
    let post_element = create_element(json, post_count);
    let title = permalink(json, post_count);
    post_element.appendChild(title);
    let thumb_nail_value = json.data.children[post_count].data.thumbnail;
    create_thumbnail(json, post_count, thumb_nail_value, post_element);


}



function create_element(json, post_count) {
    let post_element = document.createElement('div');
    post_element.className = 'post';
    post_element.id = 'post_' + post_count;
    feed.appendChild(post_element);
    return post_element;
}

function permalink(json, post_count) {
    let title = document.createElement('a');
    let permalink = json.data.children[post_count].data.permalink;
    title.setAttribute('href', 'https:i.reddit.com' + permalink);
    title.textContent = json.data.children[post_count].data.title;
    return title;
}

function create_thumbnail(json, post_count, thumb_nail_value, post_element) {
    if (thumb_nail_value !== 'self' && thumb_nail_value !== 'image' && thumb_nail_value !== 'default' && thumb_nail_value !== 'spoiler' && thumb_nail_value !== 'nsfw') {
        let thumbnail_link = document.createElement('a');
        thumbnail_link.href = json.data.children[post_count].data.url;
        let thumbnail_img = document.createElement('img');
        thumbnail_img.src = thumb_nail_value;
        thumbnail_link.className = 'thumbnail_link';
        thumbnail_link.setAttribute('target', '_blank');
        thumbnail_img.className = 'thumbnail';
        thumbnail_link.appendChild(thumbnail_img);
        post_element.appendChild(thumbnail_link);
    }
}

function append_button(after) {
    let button = document.createElement('button');
    button.textContent = 'Load More';
    button.className = 'loadMore';
    button.addEventListener('click', function () {
        load_more(after, button)
    });
    feed.appendChild(button);
}

function test() {
    console.log('Why is this trigerring upon load?');
}

function load_more(after, button) {
    count += 25;
    page_count++;
    url = 'https://api.reddit.com/r/all' + '?count=' +
        count + '&after=' + after;
    let page_indicator = document.createElement('div');
    page_indicator.textContent = ('PAGE ' + page_count);
    page_indicator.id = 'page' + page_count;
    feed.appendChild(page_indicator);
    // document.body.removeChild(document.querySelector('.loadMore'));
    fetch(url)
        .then((resp) => resp.json()) // Jesus Christ, it's Json Bourne!
        .then(data => render_feed(data));
    feed.removeChild(button);
}
let post_modal;

function display_post(permalink) {
    post_modal = document.createElement('div');
    post_modal.className = 'post_modal';
    document.body.appendChild(post_modal);
    fetch('https://api.reddit.com/' + permalink)
        .then((resp) => resp.json()) // Jesus Christ, it's Json Bourne!
        .then(data => export_data(data));

}

function export_data(data) {
    console.log(data);
}