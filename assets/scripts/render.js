var foo;
fetch('https://www.reddit.com/.json').then(response => response.json()).then(data => foo = data)
//while (typeof foo === 'undefined') {
//  console.log('Undefined!');
//}
console.log(typeof foo);