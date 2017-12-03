const VoiceChannelReward = require ("./../rewards/VoiceChannelReward.js")
const RoleReward = require("./../rewards/RoleReward.js")
module.exports = {
    getName: function(){
        return "test";
    },
    execute: (m, args, cl)=>{
        if (m.author.id != "120285961258008581"){
            m.channel.send("You do not have permission to run this command!")
            return
        }
        if (args.length == 0){
            m.channel.send("At least one argument is required.")
            return
        }
        var reward = new VoiceChannelReward();
        switch (args[0].toLowerCase()){
            case "voicechannel":
                reward = new VoiceChannelReward();
                break
            case "role":
                reward = new RoleReward();
                break
            default:
                m.channel.send("That is not a valid reward type.")
                return
                break
        }
        if (reward.claimReward(m.member)){
            m.channel.send(":ok_hand: Test successful")
            return
        } else {
            m.channel.send(":( Failed to give.")
        }
    }
}