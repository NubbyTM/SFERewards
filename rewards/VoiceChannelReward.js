const Reward = require("./reward.js")
module.exports = class VoiceChannelReward extends Reward {
    constructor(){
        super("Voice Channel Reward", 30)
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
                MANAGE_CHANNEL: true,
                MANAGE_PERMISSIONS: true
            }, "Claming reward").catch((e)=>{
                console.log("[error] " + e.stack)  
            });
            c.edit({
                parent_id: "386619790589952010"
            }, "Categorize the channel under the correct category").catch((e)=>console.log)
        }).catch((e)=>{
            console.error("[error] " + e.stack)
        })
        return true
    }
}