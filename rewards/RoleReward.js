const Reward = require("./reward.js")
module.exports = class RoleReward extends Reward {
    constructor(){
        super("Pro Inviter Role", 10, "role")
    }
    claimReward(user){
        var guild = user.guild;
        var guildChannels = guild.channels.array();
        var role = guild.roles.find("name", "Pro Inviter")
        if (user.roles.find("name", role.name)){
            return false
        }
        user.addRole(role.id)
        return true
    }
}