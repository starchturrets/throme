let request = new XMLHttpRequest(); //copy pasted from youmightnotneedjquery.com
request.open('GET', 'https://api.reddit.com/r/all?count=50&after=t3_axjvq0/.json', true);
let postCount = 0;
let lastThread;
let data;
let after;
request.addEventListener('load', loadEm);
//request.onload = 
function loadEm() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        //let data = request.responseText;
        renderPosts();

    } else {
        // We reached our target server, but it returned an error
        console.log('Server error');

    }
};

request.onerror = function () {
    // There was a connection error of some sort
    console.log('Connection error');
};

request.send();

function renderPosts() {
    data = JSON.parse(request.responseText);
    for (postCount = 0; postCount < data.data.children.length; postCount++) {
        createElement();
        lastThread = data.data.after;

    }
    createButton();
}
/*
To do:
-first, request data from r/all.json. - done!
-parse the data and
- create 25 .post elements with a for loop
- populate title, comment count, etc. with another for loop
-???
*/
//Onwards to a reddit webapp!


//at this point I have pretty much no idea what I'm doing
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
    button.addEventListener('click', moreItems)
    document.body.appendChild(button);
}

let countClick = 0;

function moreItems() {
    countClick = countClick + 25;
    console.log(lastThread);
    /// '?count=' + 'countClick' + '&after= + after';
    request = new XMLHttpRequest(); //copy pasted from youmightnotneedjquery.com
    let utl = 'https://api.reddit.com/r/all' + '?count=' +
        countClick + '&after=' + lastThread;
    console.log(utl);
    loadEm();

}

document.querySelector('#reload').addEventListener('click', reload);

function reload() {
    window.location.reload(true);
}
/*  <div class="post" id="firstPost">
        <div class="title">Placeholder Title</div>
        <span class="domain">Domain (if available)</span>
        <div class="subreddit">Subreddit</div>
        <div class="upvotes">Vote count</div>
        <img class="thumbnail"></img>
        <div class="comments">Comment Count</div>
        <div class="time">Time since posting</div>
        <div class="permalink">Link</div>
    </div>*/
/*  search the JSON...somehow
  let firstPost = document.querySelector('#firstPost');
  console.log(firstPost);
  for (let count = 0; count < data.data.children.length - 1; count++) {
      Create a nested loop.First, create.post elements, then use another loop to fill in titles, selftext, etc.
      console.log(count);
      let clone = firstPost.cloneNode(true);
      document.body.appendChild(clone);
      clone.setAttribute('id', 'post' + count);
      for (let counter = 0; counter < 23; counter++) {
          document.querySelector('#post' + counter).textContent = 'title';
      }
      /*  data.data.children[count].data.title;
              console.log(data.data.children[count].data.title);
              document.querySelector('.title').textContent = data.data.children[count].data.title;
              document.querySelector('.domain').textContent = data.data.children[count].data.domain;
              document.querySelector('.subreddit').textContent = data.data.children[count].data.subreddit;
              document.querySelector('.upvotes').textContent = data.data.children[count].data.ups;
              document.querySelector('.thumbnail').setAttribute('src', data.data.children[count].data.thumbnail)
              document.querySelector('.comments').textContent = data.data.children[count].num_comments; 
  } 
  
  
   console.log('Last Thread is: ' + lastThread);
   if (lastThread = 'undefined') {
       url = 'https://api.reddit.com/r/all';
   } else if (lastThread = !'undefined') {
       url = 'https://api.reddit.com/r/all' + '?count=' +
           count + '&after=' + lastThread + '/.json';
   }
   console.log('The url is: ' + url);
  */