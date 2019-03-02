const fs = require('fs-extra')
const chalk = require('chalk')

module.exports = {
    cleanup: removeDirContent
}

function removeDirContent(dirPath) {
    try {
        var files = fs.readdirSync(dirPath)
        for (file in files) {
            const filePath = `${dirPath}/${files[file]}`
            fs.removeSync(filePath)
        }
        console.log(chalk.green(`Successfully cleared content of ${dirPath}`))
    }
    catch (e) {
        console.log(chalk.red(`Error during cleanup, directory at ${dirPath} is not present`))
        return;
    }
}
