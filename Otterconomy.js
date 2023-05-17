const cp = require('child_process')
const fs = require('fs')
const path = require("path");

const Logger = require("../../src/server/Logger");
const plugin = require("./package.json");
const Frog = require('../../src/Frog');
const CommandManager = require("../../src/player/CommandManager");
const { readdir } = require("fs/promises");
const Commands = require("../../src/server/Commands");

var req = async module => {
    try {
        require.resolve(module);
    } catch (e) {
        console.log(`Could not resolve "${module}"\nInstalling`);
        cp.execSync(`npm install ${module}`);
        await setImmediate(() => {});
        console.log(`"${module}" has been installed`);
    }
    console.log(`Requiring "${module}"`);
    try {
        return require(module);
    } catch (e) {
        console.log(`Could not include "${module}". Restart the script`);
        process.exit(1);
    }
};

var dir = './pluginData/Otterconomy';

if (!fs.existsSync(dir)) {
    console.log("Test")
    fs.mkdirSync(dir, { recursive: true });
}


module.exports = {
    db: null,

    onLoad() {
        Logger.info(`Loaded ${plugin.name} v${plugin.version}`);
        const main = async() => {
            await req('better-sqlite3')
            await req('quick.db')
            const { QuickDB } = require("quick.db")
            this.db = new QuickDB({ filePath: `${dir}/json.sqlite` });
            Logger.warning("Database created!");


        }
        const eventFiles = fs
            .readdirSync(`${__dirname}/src/Events`)
            .filter((file) => file.endsWith(".js"));

        (async() => {
            main();
            await Commands.commandList.push([
                require("./src/Commands/CommandBalance"),
                require("./src/Commands/CommandAddBalance")
            ]);

            for (const file of eventFiles) {
                const event = require(`./src/Events/${file}`);
                if (event.once) {
                    Frog.eventEmitter.once(event.name, (...args) => event.execute(...args, Frog));
                } else {
                    Frog.eventEmitter.on(event.name, (...args) => event.execute(...args, Frog));
                }
            }
        })();


    }





}