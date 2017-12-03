module.exports = class Reward {
    constructor(name, invites){
        this.name = name
        this.invites = invites
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
}