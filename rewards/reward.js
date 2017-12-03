module.exports = class Reward {
    constructor(name, invites,shortname){
        this.name = name
        this.invites = invites
        this.shortname = shortname;
    }
    canClaimReward(member, invites){
        if (invites >= this.invites){
            return true
        }
        return false
    }
    getName(){
        return this.name
    }
    getRequiredInvites(){
        return this.invites
    }
    getShortName(){
        return this.shortname
    }
}