const chalk = require('chalk');

async function logErrorAndExit(errorMsg) {
    console.log(chalk.red('Error! How unfancy! \n' + errorMsg || ''));
    process.exit();
}

module.exports = {
    error: (errorMsg) => logErrorAndExit(errorMsg),
}