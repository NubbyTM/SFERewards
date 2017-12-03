# SFE Rewards

This bot is designed for the SFE Discord, which allows you to create an invite and get rewards when it's used!

## Installation

Download the project, and run these commands:

```
npm i -S hydrabolt/discord.js
npm rebuild # to make sure enmap and enmap-level work properly
npm start # start the bot.
```

Then create a `config.js` file inside the folder. Put this inside the file:
```javascript
module.exports = {
    token: "your token",
    prefix: "prefix you want for the bot"
}
```

## Dependencies (node.js)

- discord.js v11.0+
- enmap
- enmap-level