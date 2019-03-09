const fs = require('fs');
const chalk = require('chalk');

const util = require("./scripts/util");
const fd = require("./scripts/fetchData");

const SPEAKERS_DIR_PATH = "content/speakers";
const TALKS_DIR_PATH = "content/talks";

util.cleanup(SPEAKERS_DIR_PATH);
util.cleanup(TALKS_DIR_PATH);


function fetchAll(callback) {
    console.log("Fetching AirTables...\n");
    fd.fetch('Talks')
        .then(() => fd.fetch('Speakers'))
        .then(() => fd.fetch('2019'))
        .then(() => {
            console.log("\nFetching AirTables done.\n");
            // TODO: generate README files for speakers and talks
            // callback();
        })
        .catch(err => {
            console.log("Error detected!");
            console.log(err);
            process.exit(1);
        });
}

fetchAll();