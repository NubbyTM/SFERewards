const VoiceChannelReward = require("./../rewards/VoiceChannelReward.js")
const RoleReward = require("./../rewards/RoleReward.js")
module.exports = {
    getName: ()=>{
        return "rewards";
    },
    execute: (m, args, bot)=>{
        var rewards = [VoiceChannelReward, RoleReward]
        var rewardString = ""
        for (var a in rewards){
            var Reward = rewards[a];
            var r = new Reward();
            rewardString += "`" + r.getName() + " (" + r.getShortName() + ")` - Invites Required: **" + r.getRequiredInvites() + "**\n"
        }
        m.channel.send("Rewards: \n" + rewardString)
    }
}