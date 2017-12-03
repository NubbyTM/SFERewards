const cluster = require ("cluster")
if (cluster.isMaster){
    cluster.fork()
    cluster.on("exit", function (w,c,s){
        cluster.fork()
    })
} else if (cluster.isWorker){
    const Discord = require("discord.js")
    const fs = require ("fs")
    const Enmap = require("enmap")
    const EnmapLevel = require("enmap-level")
    var config = require ("./config.js")
    var bot = new Discord.Client();

    var invitesLevel = new EnmapLevel({name:"invites"})
    var invites = new Enmap({provider:invitesLevel})
    bot.invites = invites;

    var commands = []

    bot.on("message", (m)=>{
        if (m.author.bot) return
        if (!m.content.startsWith(config.prefix)) return
        if (!m.guild) return
        //console.log("[log] debug: " + m.content)
        var commandName = m.content.slice(config.prefix.length).split(" ")[0];
        for (var a in commands){
            //console.log("[log] debug: " + commands[a].getName() + "//" + commandName)
            if (commands[a].getName() == commandName){
                try {
                    commands[a].execute(m, m.content.split(" ").slice(1), bot)  
                } catch (e){
                    console.log("[error] " + e.stack)
                    m.reply("an internal error occurred while executing that command, please try again later.")
                } 
            }
        }
    })

    bot.on("ready", ()=>{
        console.log("[log] connected to discord")
        var commandDir = fs.readdirSync("./commands/")
        for (var a in commandDir){
            var B = require("./commands/" + commandDir[a])
            console.log("[log] registered command " + B.getName())
            commands.push(B)
        }
    })
    bot.on("error", (e)=>{
        console.error("[error/client] " + e.stack)
    })
    process.on("error", (e)=>{
        console.error("[uncaught error] " + e.stack)
    })
    process.on("exit", ()=>{
        bot.invites.db.close()
    })
    bot.login(config.token)
}