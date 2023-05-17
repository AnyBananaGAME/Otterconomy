const { readFileSync } = require("fs");
const { load } = require("js-yaml");

module.exports = {
    get() {
        let config = load(readFileSync("./plugins/Otterconomy/src/Utils/config.yml"));
        return config;
    }
}