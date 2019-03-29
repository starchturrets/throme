"use strict";
const feed = document.querySelector('#feed');
let url = 'https://api.reddit.com/r/all/.json';
let count = 0;
fetch(url)
    .then((resp) => resp.json()) // Jesus Christ, it's Json Bourne!
    .then(data => render_feed(data));
let post_count;
let after;

function render_feed(json) {
    let children_length = json.data.children.length;
    for (post_count = 0; post_count < children_length; post_count++) {
        create_post(json, post_count);
    }
    after = json.data.after;
    append_button(after);
}