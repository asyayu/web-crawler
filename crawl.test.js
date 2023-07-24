const { test, expect } = require('@jest/globals');

const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

// test('normalizes URLs', () => {
//     expect(normalizeURL('https://wagslane.dev/path/')).toBe(
//         'wagslane.dev/path'
//     );
// });

// test('normalizes URLs', () => {
//     expect(normalizeURL('https://wagsLane.Dev/path')).toBe('wagslane.dev/path');
// });

// test('normalizes URLs', () => {
//     expect(normalizeURL('https://wagslane.dev/path')).toBe('wagslane.dev/path');
// });

// test('normalizes URLs', () => {
//     expect(normalizeURL('http://wagslane.dev/path')).toBe('wagslane.dev/path');
// });
// test('normalizes URLs', () => {
//     expect(normalizeURL('wagslane.dev/path')).toBe('wagslane.dev/path');
// });

// test('normalizes URLs', () => {
//     expect(normalizeURL('https://www.wagslane.Dev/path/')).toBe(
//         'wagslane.dev/path'
//     );
// });

test('getURLsFromHTML relative and absolute', () => {
    const htmlString = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <a href="https://twitter.com/home">link</a> <a href="https://twitter.com/home">link</a> <a href="/home">link</a> <a href="https://twitter.com/home">link</a> <a href="https://twitter.com/home">link</a></body></html>`;
    expect(getURLsFromHTML(htmlString, 'https://twitter.com')).toStrictEqual([
        'https://twitter.com/home',
        'https://twitter.com/home',
        'https://twitter.com/home',
        'https://twitter.com/home',
        'https://twitter.com/home',
    ]);
});

test('getURLsFromHTML no links', () => {
    const htmlString = `<h1>Welcome to my site!</h1>`;
    expect(getURLsFromHTML(htmlString, 'https://twitter.com')).toStrictEqual(
        []
    );
});
