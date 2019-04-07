"use strict";
const $ = document.querySelector.bind(document);
const BUTTON = $('.load_more'); //Take that, jQuery!
let count = 0;

function get(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.data.children.length; i++) {
                const markup = document.createElement("div");
                let after = data.data.after;
                markup.innerHTML = `
<a target="_blank" href="https://i.reddit.com${data.data.children[i].data.permalink}">${data.data.children[i].data.title} </a>`;
                BUTTON.before(markup);
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
        });
}
get("https://api.reddit.com/r/popular");