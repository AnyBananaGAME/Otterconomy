const PlayerInfo = require("../../../../src/api/player/PlayerInfo");
const Config = require("../Utils/Config");

module.exports = {
    data: {
        name: "addbalance",
        description: "Add balance",
        minArgs: 0,
        maxArgs: 0,
        requiresOp: true,
    },

    execute(_server, player, args) {
        (async() => {
            if (!args[0]) {
                return player.sendMessage(Config.get().noplayer);
            }
            if (!args[0]) {
                return player.sendMessage(Config.get().noamount)
            }
            let name = args[0];
            let amount = args[1];

            let a = require("../../Otterconomy");
            let db = a.db;
            let table = await db.tableAsync("Oterconomy");

            let pl = PlayerInfo.get(name);
            if (!pl) {
                return player.sendMessage(Config.get().notavalidplayer);
            }

            let money = await table.add(`money_${pl.XUID}`, amount);


            let cfg = Config.get().addbalancecommand;
            let messag = (cfg).replaceAll("{balance}", money)
            let message = (messag).replaceAll("{player}", pl.name)
            player.sendMessage(message);
        })();
    }



}