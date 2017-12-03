module.exports = {
    getName: function(){
        return "restart";
    },
    execute: (m, args, bot)=>{
        if (m.member.id!="120285961258008581"){
            m.channel.send("No permission!")
        } else {
            m.channel.send("Restarting...")
            console.log("Restart requested by user with ID " + m.member.id)
            setTimeout(()=>{process.exit(0)}, 1000)
        }
    }
}