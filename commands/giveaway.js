module.exports = {
    getName: function(){
        return "giveaway";
    },
    execute: (m, args, bot)=>{
        if (args.length >= 2){
            switch (args[0]){
                case "enter":
                    if (bot.giveaway.has(args[1].toLowerCase())){
                        var giveaway = bot.giveaway.get(args[1].toLowerCase());
                        if (!giveaway.active){
                            m.channel.send("That giveaway has ended.")
                            return
                        }
                        if (giveaway.entries.includes(m.member.id)){
                            m.channel.send("heh trying to enter same giveaway twice. funny. i should give that to you though. eh, too much useless storage.")
                            return
                        }
                        giveaway.entries.push(m.member.id);
                        bot.giveaway.set(args[1].toLowerCase(), giveaway)
                        m.channel.send("Entered the giveaway!")
                    }
                    break;
                case "host":
                    if (!m.member.roles.has(m.guild.roles.find("name", "Giveaway Host").id)){
                        m.channel.send("You do not have permission to host giveaways.")
                        return;
                    }
                    var sliced = args.slice(1).join(" ")
                    if (sliced.split(" | ").length >= 3){
                        var parts = sliced.split(" | ")
                        if (parts.length != 3) {
                            m.channel.send("You need at least 3 parts, separated by a pipe ` | `")
                            return;
                        }
                        if (bot.giveaway.has(parts[0].toLowerCase())){
                            m.channel.send("A giveaway already exists with that name `" + parts[0].toLowerCase() + "`.")
                            return
                        }
                        var giveawayObject = {
                            title: parts[1] + "", 
                            description: parts[2] + "",
                            host: m.member.id,
                            active: true,
                            entries: []
                        }
                        bot.giveaway.set(parts[0].toLowerCase() + "", giveawayObject);
                        m.guild.channels.find("id", "389479501228277762").send(`A giveaway is being hosted!\n\nHost: ${m.member}\nTitle: **${parts[1]}**\nDescription: **${parts[2]}**\n\nEnter with rewards>giveaway enter ${parts[0].toLowerCase()}`)
                        m.channel.send("Hosting giveaway!");
                    } else {
                        m.channel.send("Invalid command usage. Giveaway title and description required.")
                    }
                    break;
                case "end":
                    if (!bot.giveaway.has(args[1])){
                        m.channel.send("That giveaway does not exist.")
                        return;
                    }
                    if (!bot.giveaway.get(args[1]).active){
                        m.channel.send("That giveaway has already ended.");
                        return;
                    }
                    var entries = bot.giveaway.get(args[1]).entries;
                    function randomNumber (min, max){
                        return Math.floor((Math.random() * max) + min);
                    }
                    var specialNumber = randomNumber(0, entries.length - 1);
                    var success = false;
                    var member;
                    for (var i in entries){
                        var entry = entries[i];
                        if (i != specialNumber){
                            continue;
                        }
                        if (!m.guild.members.exists("id", entry)){
                            m.channel.send("Sorry, but an unexpected error occurred while ending the giveaway. Try later.")
                            return
                        }
                        success = true
                        member = m.guild.members.find("id", entry);
                    }
                    if (!success){
                        m.channel.send("Not a success :( try again.")
                        return;
                    }
                    if (member){
                        m.guild.channels.find("name", "giveaways").send("The giveaway **" + bot.giveaway.get(args[1].toLowerCase()).title + "** has been ended. The winner is " + member + "! Congratulations! Contact " + m.member + " to recieve your reward!")
                        m.channel.send(":ok_hand: successfully ended reward!");
                        return;
                    } else {
                        m.channel.send("An unexpected error occurred while executing the command. Try again.")
                        return;
                    }
                    break;
                default:
                    m.channel.send("Invalid command usage. Use this command without arguments to find usage")
                    return;
                    break;
            }
        } else {
            m.channel.send("Commands:\nenter <giveaway> - Enter the giveaway\nhost <giveaway shortname> | <giveaway title> | <description> - host a giveaway! [Admin only]\nend <giveaway> - End a giveaway [you must be hosting it to end]")
        }
    }
}