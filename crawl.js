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

const crawlPage = async (baseURL) => {
    try {
        const res = await fetch(baseURL);
        if (res.status > 399) {
            console.log('ERROR RE STATUS');
            return;
        }
        if (!res.headers.get('content-type').includes('text/html')) {
            console.log('ERROR RE CONTENT TYPE');
            return;
        }
        const resText = await res.text();
        console.log(resText);
    } catch (err) {
        console.log(err);
    }
};

// console.log(crawlPage('https://wagslane.dev'));

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
};
