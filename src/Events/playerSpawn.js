var dir = './pluginData/Otterconomy';
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: `${dir}/json.sqlite` });

module.exports = {
    name: "playerSpawn",
    async execute(event, Frog) {
        const player = event.player;

        console.log(player.userData.XUID);

        let table = await db.tableAsync("Oterconomy");
        let money = await table.get(`money_${player.XUID}`);
        if (money === null) table.set(`money_${player.XUID}`, 1000);



    }
}