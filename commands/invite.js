module.exports = {
    getName: function(){
        return "invite";
    },
    execute: (m, args, bot)=>{
        if (bot.invites.has(m.member.id)){
            m.reply("You already have an invite. I'll send your current one to your Direct Messages.")
            m.member.send("Specialized Invite: https://discord.gg/" + bot.invites.get(m.member.id))
            return
        }
        m.guild.channels.find("name", "all-members").createInvite({
            unique: true,
            maxAge: 0
        }, "Invite for a user. custom loves this part.").then((inv)=>{
            m.reply("I've created an invite for you, it should be linked to your account shortly!")
            m.member.send("Specialized Invite: https://discord.gg/" + inv.code)
            bot.invites.set(m.member.id, inv.code)
        })
    }
}