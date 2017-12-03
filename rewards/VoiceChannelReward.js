const Reward = require("./reward.js")
module.exports = class VoiceChannelReward extends Reward {
    constructor(){
        super("Voice Channel Reward", 30, "voicechannel")
    }
    claimReward(user){
        var guild = user.guild;
        var guildChannels = guild.channels.array();
        for (var a in guildChannels){
            if (guildChannels[a].type === "voice"){
                if (guildChannels[a].name.startsWith(user.user.username)){
                    return false
                }
            }
        }
        guild.createChannel(user.user.username + "'s Channel", "voice").then((c)=>{
            c.overwritePermissions(user.id, {
                MANAGE_CHANNELS: true,
                MANAGE_ROLES: true
            }, "Claming reward").catch((e)=>{
                console.log("[error] " + e.stack)  
            });
            c.edit({
                parentID: "386619790589952010"
            }, "Categorize the channel under the correct category").catch((e)=>{console.log(e)})
        }).catch((e)=>{
            console.error("[error] " + e.stack)
        })
        return true
    }
}