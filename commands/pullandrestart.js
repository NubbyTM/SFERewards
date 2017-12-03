var child = require("child_process")
module.exports = {
    getName: function(){
        return "pullandrestart";
    },
    execute: (m, args, bot)=>{
        if (m.member.id!="120285961258008581"){
            m.channel.send("No permission!")
        } else {
            m.channel.send("Pulling from GitHub and restarting!")
            child.exec("git pull origin master", {}, (e, stdout, stderr)=>{
                setTimeout(()=>{process.exit(0)}, 2500)
            })
            console.log("Restart requested by user with ID " + m.member.id)
        }
    }
}