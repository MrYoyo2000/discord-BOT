const fs = require("fs")

module.exports = async Bot => {

    fs.readdirSync("./Commandes").filter(ƒ => ƒ.endsWith(".js")).forEach(async ƒile => {
       
        let command = require(`../Commandes/${ƒile}`)
        if(!command.name || typeof command.name !== "string") throw new TypeError (`The commande ${ƒile.slice(0, ƒile.length - 3)} has no name !`)
        Bot.commands.set(command.name, command)
        console.log(`commande ${ƒile} load successfully !`)
    })
}