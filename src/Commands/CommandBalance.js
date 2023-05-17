const Config = require("../Utils/Config");

module.exports = {
    data: {
        name: "balance",
        description: "Check your balance",
        minArgs: 0,
        maxArgs: 1,
        requiresOp: false,
    },

    execute(_server, player) {
        (async() => {
            let a = require("../../Otterconomy");
            let db = a.db;
            let table = await db.tableAsync("Oterconomy");
            let money = await table.get(`money_${player.XUID}`);

            let cfg = Config.get().balancecommand;
            let message = (cfg).replaceAll("{balance}", money)

            player.sendMessage(message);
        })();
    }
}
