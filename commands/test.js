
module.exports = {
    getName: function(){
        return "test";
    },
    execute: (m, args, cl)=>{
        var s = "Test command executed succesfully."
        if (args.length != 0){
            s += " Arguments (join method): " + args.join(" ")
        }
        m.channel.send(s)
    }
}