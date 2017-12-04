const Discord = require ("discord.js")
module.exports = {
    getName: function(){
        return "leaderboard";
    },
    execute: (m, args, bot)=>{
        function sortAlg(a,b){
            return a.uses-b.uses;
        }
        m.guild.fetchInvites().then((invites)=>{
            var places = [];
            invites.forEach((a, i)=> {
                if (bot.invites.hasKey(a)){
                    if (!m.guild.members.find("id", bot.invites.getKey(i.code))){
                        return
                    }
                    var member = m.guild.members.find("id", bot.invites.getKey(i.code))
                    places.push({
                        name: member,
                        uses: i.uses
                    })
                }
            });
            setTimeout(()=>{
                places.sort(sortAlg)
                if (places.length >= 10){
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle("Leaderboard – SFE Invites")
                        .setDescription("The leaderboard of invites on the reward bot!")
                        .addField("First Place", places[0].name + " - " + places[0].uses, true)
                        .addField("Second Place", places[1].name + " - " + places[1].uses, true)
                        .addField("Third Place", places[2].name + " - " + places[2].uses, true)
                        .addField("Fourth Place", places[3].name + " - " + places[3].uses, true)
                        .addField("Fifth Place", places[4].name + " - " + places[4].uses, true)
                        .addField("Sixth Place", places[5].name + " - " + places[5].uses, true)
                        .addField("Seventh Place", places[6].name + " - " + places[6].uses, true)
                        .addField("Eigth Place", places[7].name + " - " + places[7].uses, true)
                        .addField("Ninth Place", places[8].name + " - " + places[8].uses, true)
                        .addField("Tenth Place", places[9].name + " - " + places[9].uses, true)
                        .setColor([255,255,0])
                    m.channel.send("Here's the leaderboard.", {embed})
                } else {
                    m.channel.send("Not enough invites registered to calculate positions")
                }
            }, 1000)
        })
    }
}