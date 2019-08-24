"use strict";

const fs = require('fs');
const chalk = require('chalk');
const matter = require('gray-matter');

function check(path, id) {
	const file = path + '/index.md';
	const contents = fs.readFileSync(file);
	const fm = matter(contents);
	console.log(chalk.yellow(id));
	if (fm.data.id === undefined) {
		console.log(chalk.red('  id set ') + id);
	}
	else if (fm.data.id !== id) {
		console.log(chalk.blue('  id upd ') + id);
	} else {
		console.log(chalk.green('  id ok  ') + id);
		return;
	}
	// set/update id
	fm.data.id = id;
	fs.writeFileSync(file, fm.stringify());
}

const path = './content/speakers';
fs.readdir(path, (err, speakers) => {
    for (var i = 0; i < speakers.length; i++) {
        const speakerName = speakers[i];
        const path2 = path + '/' + speakerName;
        if (!fs.lstatSync(path2).isDirectory()) {
        	continue;
        }
        fs.readdir(path2, (err, talks) => {
        	for (var j = 0; j < talks.length; j++) {
				const talk = talks[j];
        		const path3 = path2 + '/' + talk;
		        if (!fs.lstatSync(path3).isDirectory()) {
		        	continue;
		        }
        		const id = speakerName + '-' + talk;
        		check(path3, id);
        	}
        });
    }
});