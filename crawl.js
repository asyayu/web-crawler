const { JSDOM } = require('jsdom');

const normalizeURL = (url) => {
    let newURL = url.toLowerCase();
    if (!newURL.startsWith('http')) {
        newURL = 'https://' + newURL;
    }
    const URLobject = new URL(newURL);
    newURL = `${URLobject.hostname}${URLobject.pathname}`;
    if (newURL.startsWith('www')) {
        newURL = newURL.slice(4, newURL.length);
    }
    if (newURL[newURL.length - 1] === '/') {
        return newURL.slice(0, -1);
    }
    return newURL;
};

const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="https://twitter.com/home">link</a>
    <a href="https://twitter.com/home">link</a>
    <a href="/home">link</a>
    <a href="https://twitter.com/home">link</a>
    <a href="https://twitter.com/home">link</a>
</body>
</html>`;

const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const aElements = dom.window.document.querySelectorAll('a');
    for (const aElement of aElements) {
        if (aElement.href[0] === '/') {
            urls.push(baseURL + aElement.href);
        } else {
            urls.push(aElement.href);
        }
    }
    return urls;
};

console.log(getURLsFromHTML(htmlString, 'https://twitter.com'));

module.exports = {
    normalizeURL,
    getURLsFromHTML,
};
