let markup = `
  <div class="post">
        <a target = "_blank" href = "${permalink}">${title}</a> 
        ${displayThumbNail ? `<a href=${url} target="blank"><img alt="thumbnail" class="thumbnail" src="${thumbNail}"</a>`: '<!--Nothing to see here, move along folks.-->'}
        </a>
        <span class="info"> ${score}k points submitted ${age} hours ago by <a href="https://i.reddit.com/u/${author}">${author}</a> to <a href="https://i.reddit.com/r/${subreddit}">/r/${subreddit}</a></span>
        <a target="_blank" class="comments" href="${permalink}">${commentNumber}</a>
        </div>
`
export {
    markup
};