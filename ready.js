const discord = require("discord.js")
const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async bot => {
    
    await loadSlashCommands(bot)

    console.log(`=======================================\n${bot.user.tag} est bien en Ligne !\n=======================================`)
}