const { crawlPage } = require('./crawl.js');

async function main() {
    if (process.argv.length - 2 === 1) {
        const baseURL = process.argv[process.argv.length - 1];
        console.log(`Crawler is starting at base URL ${baseURL}`);
        await crawlPage(baseURL, baseURL, {});
    } else if (process.argv.length === 2) {
        console.log(`ERROR: NOT ENOUGH ARGUMENTS`);
        return;
    } else {
        console.log(`ERROR: TOO MANY ARGUMENTS`);
        return;
    }
}

main();
