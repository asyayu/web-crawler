function main() {
    if (process.argv.length - 2 === 1) {
        console.log(
            `Crawler is starting at base URL ${
                process.argv[process.argv.length - 1]
            }`
        );
    } else if (process.argv.length === 2) {
        console.log(`ERROR: NOT ENOUGH ARGUMENTS`);
        return;
    } else {
        console.log(`ERROR: TOO MANY ARGUMENTS`);
        return;
    }
}

main();
