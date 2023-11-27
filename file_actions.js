const fs = require('node:fs/promises');

const fileExists = async (path) => {
    try {
        await fs.access(path);
        console.log(`The file ${path} exists!`);
    } catch (error) {
        console.log(`The file ${path} doesn't exist!`);
    }
}

const createDir = async (path) => {
    const recursive = path.includes('/');
    try {
        await fs.mkdir(path, {recursive: recursive});
        const verb = recursive ? 'were' : 'was';
        console.log(`The folder${recursive ? 's' : ''} ${path} ${verb} created!`);
    } catch (error) {
        console.log(`The folder ${path} could not be created!`);
    }
}

const removeDir = async (path) => {
    try {
        await fs.rm(path, {recursive: true});
        if (path.includes('/')) {
            const [parent, child] = path.split('/');
            console.log(`The folder ${parent} in ${child} folder was deleted!`);
        } else {
            console.log(`The folder ${path} was deleted!`);
        }
    } catch (error) {
        console.log(`This ${path} folder doesn't exist!`);
    }
}

const isFolder = async (path) => {
    try {
        const stats = await fs.stat(path);
        if (stats.isDirectory()) {
            console.log(`The ${path} is a folder!`);
        } else {
            console.log(`The ${path} is not a folder!`);
        }
    } catch (error) {
        console.log("It seems that some specified files don't exist!");
    }
}

const fileSizekB = async (file) => {
    try {
        const stats = await fs.stat(file);
        return stats.size / 1024;
    } catch (error) {
        console.log("It seems that some specified files don't exist!");
        process.exit(1);
    }
}

const diskUsage = async (files) => {
    const promises = files.split("-").map(fileSizekB);
    const sizes = await Promise.all(promises);
    const totalSize = sizes.reduce((total, size) => total + size, 0);
    console.log(`The size of the specified files is ${totalSize.toFixed(1).replace(/\.?0+$/, '')} kilobytes`);
}

const listWorkingDir = async () => {
    const files = await fs.readdir(process.cwd());
    console.log(files.join('\n'));
}

exports.fileExists = fileExists;
exports.createDir = createDir;
exports.removeDir = removeDir;
exports.isFolder = isFolder;
exports.fileSizekB = fileSizekB;
exports.diskUsage = diskUsage;
exports.listWorkingDir = listWorkingDir;