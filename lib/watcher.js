const clipboardy = require('clipboardy');

async function watcher(field) {
    const watcher = `
    @Watch('${field}')
    public ${field}Watcher(): void {
        // TODO - put some code here
    }
    `
    clipboardy.writeSync(watcher);
}

module.exports = async (field) => {
    return await watcher(field);
}