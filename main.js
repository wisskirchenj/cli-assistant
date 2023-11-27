const {createDir, fileExists, removeDir, isFolder, diskUsage, listWorkingDir } = require('./file_actions');

const actionMap = {
    create: createDir,
    remove: removeDir,
    exist: fileExists,
    isFolder: isFolder,
    size: diskUsage,
    content: listWorkingDir
}

const processArgs = (args) => {
    const argsObj = {};
    args.forEach((arg) => {
        const [key, value] = arg.replace(/^--?/, "").split('=');
        if (arg.includes('=') && !value) {
            console.log("It seems you forget to specify argument!");
            process.exit(1);
        }
        argsObj[key] = value? value : true;
    });
    return argsObj;
}

const clArgs = process.argv.slice(2);
const argsMap = processArgs(clArgs);
for (const key in argsMap) {
    actionMap[key](argsMap[key]);
}

exports.processArgs = processArgs;
