module.exports = {
    getName: function(){
        return "resetinvite";
    },
    execute: (m, args, bot)=>{
        if (m.member.id != "120285961258008581"){
            m.channel.send("mess with the noot noot, you get the shoot shoot! - don't mess with nubby's bots. (no permission)")
            return
        }
        if (args.length == 0){
            m.channel.send("WHAT ARE YOU DOING?? (not enough arguments)")
            return
        }
        if (args[0]){
            if (bot.invites.has(args[0])){
                bot.invites.delete(args[0])
                m.channel.send(":ok_hand: removed the invite for user")
            } else {
                m.channel.send("Couldn't find an invite for the user ID **" + args[0] + "**")
            }
        }
    }
}