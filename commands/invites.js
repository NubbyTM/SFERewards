const VoiceChannelReward = require("./../rewards/VoiceChannelReward.js")
const RoleReward = require("./../rewards/RoleReward.js")
module.exports = {
    getName: ()=>{
        return "invites";
    },
    execute: (m, args, bot)=>{
        if (!bot.invites.has(m.author.id)){
            m.channel.send("You don't have an invite.")
            return
        }
        m.guild.fetchInvites().then((i)=>{
            var inv = i.get(bot.invites.get(m.author.id))
            var uses = inv.uses;
            m.channel.send("You have **" + uses + "** invites! Good job!")
        })
    }
}