const VoiceChannelReward = require("./../rewards/VoiceChannelReward.js")
module.exports = {
    getName: ()=>{
        return "claimreward";
    },
    execute: (m, args, bot)=>{
        if (!bot.invites.has(m.author.id)){
            m.channel.send("You must have a specalized invite first to claim a reward!\nYou can get a specialized one with sferewards>invite.")
            return
        }
        if (args.length == 0){
            m.channel.send("Silly, use the proper syntax!! sferewards>claimreward <reward>\nDo sferewards>rewards for a list of rewards!")
            return
        }
        m.guild.fetchInvites().then((i)=>{
            var inv = i.get(bot.invites.get(m.author.id))
            var uses = inv.uses;
            var reward = new VoiceChannelReward();
            switch (args[0]){
                case "voiceChannel":
                    reward = new VoiceChannelReward();
                    break
                default:
                    m.channel.send("That is not a valid reward type.")
                    break
            }
            if (reward.canClaimReward(m, uses)){
                if (reward.claimReward(m.member)){
                    m.channel.send(":ok_hand: you've collected your dank " + reward.getName())
                } else {
                    m.channel.send("Oops! An error occurred while giving you your reward. Try again later.")
                }
            } else {
                m.channel.send("You don't have enough invites for this reward")
            }
        })
    }
}