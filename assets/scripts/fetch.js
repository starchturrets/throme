const request = async () => {
    const response = await fetch('https://api.reddit.com');
    const json = await response.json();
    console.log(json);
}

request();