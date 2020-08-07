#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');
const leven = require('leven')
const { error } = require('../lib/utils/error');
const CLI = require('clui');
const Spinner = CLI.Spinner;

clear();

console.log(
    chalk.cyan(
        figlet.textSync('Fancy', {
            font: 'invita',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            whitespaceBreak: true
        })
    )
);

program
    .command('create <app-name>')
    .description('create a fancy new project')
    .option('-e, --extra', 'make this one extra fancy')
    .action((name, cmd) => {
        if (cmd.extra) console.log('one extra fancy app coming up')
        console.log('create' + name);
    })

program
    .command('component <component-name>')
    .description('create a fancy new component')
    .option('-d, --directory <directory>', 'sub directory for your component')
    .action(async (name, cmd) => {
        const status = new Spinner('One fancy component coming up...');
        status.start();
        try {
            await require('../lib/component')(name, cmd.directory);
            console.log(chalk.green('Done!'));
        } catch (err) {
            error(err.message)
        } finally {
            status.stop();
        }
    })

program
    .command('watcher <field>')
    .description('copy a watcher to the clipboard')
    .action(async (field) => {
        await require('../lib/watcher')(field);
        console.log(chalk.green('Done! A watcher has been copied to your clipboard. Put it somewhere.'));
    })

// output help information on unknown commands
program
    .arguments('<command>')
    .action((cmd) => {
        program.outputHelp()
        if(cmd !== 'help'){
            console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
            console.log()
            suggestCommands(cmd)
        }
    })

// add some useful info on help
program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`fancy <command> --help`)} for detailed usage of given command.`)
    console.log()
})

function suggestCommands (unknownCommand) {
    const availableCommands = program.commands.map(cmd => cmd._name)
  
    let suggestion
  
    availableCommands.forEach(cmd => {
      const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
      if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
        suggestion = cmd
      }
    })
  
    if (suggestion) {
      console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
    }
}


program.parse(process.argv);