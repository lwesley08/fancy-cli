const fs = require('fs');
const path = require('path');
const { newTSFile, newHTMLFile } = require('../lib/utils/constants');

async function component(componentName='FancyNewComponent', directory='') {
    const lcName = componentName.toLowerCase();
    const componentsDirectory = await setComponentDirectory();
    if (directory && !fs.existsSync(path.resolve(componentsDirectory, directory))) {
        fs.mkdirSync(path.resolve(componentsDirectory, directory))
    }
    const basePath = path.resolve(process.cwd(), componentsDirectory, directory, lcName);
    if (fs.existsSync(basePath)) {
        throw new Error('Looks like this is already a component? Don\'t repeat yourself.  It\'s not only repetitive, it\'s redundant, and people have heard it before.');
    }
    fs.mkdirSync(basePath);
    fs.writeFileSync(path.resolve(basePath, `${lcName}.ts`), await newTSFile(componentName));
    fs.writeFileSync(path.resolve(basePath, `${lcName}.vue`), await newHTMLFile(lcName));
}

async function setComponentDirectory() {
    let path = '';
    if(fs.existsSync('./src/components')){
        path = 'src/components';   
    } else if (fs.existsSync('./ClientApp/components')){
        path = 'ClientApp/components';
    } else {
        throw new Error('Are you lost? Current directory doesn\'t contain src/components or Clientapp/components');
    }
    return path;
}

module.exports = async (componentName, directory) => {
    return await component(componentName, directory);
}