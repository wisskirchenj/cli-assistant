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
  console.log(`${key}: ${argsMap[key]}`);
}
exports.processArgs = processArgs;