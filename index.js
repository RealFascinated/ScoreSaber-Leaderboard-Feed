const WebSocket = require('ws');
const webhook = require("webhook-discord")
const Config = require('./config.json')

if (!Config.webhook) {
    console.log("Please set your webhook in config.json")
    process.exit(1)
}
if (!Config.countryOnly) {
    console.log("Please set the countryOnly in config.json")
    console.log("ALL or country (eg: UK)")
    process.exit(1)
}

const Hook = new webhook.Webhook(Config.webhook);
const socket = new WebSocket('wss://scoresaber.com/ws');

socket.addEventListener('message', (event) => {
    if (event.data == "Connected to the ScoreSaber WSS") {
        console.log("Connected to ScoreSabers WebSocket!")
        return;
    }
    const data = JSON.parse(event.data);
    const playerInfo = data.commandData.score.leaderboardPlayerInfo;
    const leaderboard = data.commandData.leaderboard;
    const score = data.commandData.score;
    
    if (score.rank == 1 && score.pp) { // Checks if the score is the first place and if the map is ranked
        if (Config.countryOnly != "ALL" && Config.countryOnly != playerInfo.country) {
            return;
        }

        const msg = new webhook.MessageBuilder()
            .setName("Score Feed")
            .setColor("#00FF00")
            .setAuthor(`${playerInfo.name} has set a #1 on ${leaderboard.songName}!`, null, `https://scoresaber.com/u/${playerInfo.id}`)
            .addField("Score", score.baseScore, true)
        if (score.pp) {
            msg.addField("PP", score.pp, true)
        }
        msg.addField("Leaderboard", `[${leaderboard.songName}](https://scoresaber.com/leaderboard/${leaderboard.id})`, true)
        Hook.send(msg); // Sends the score to the webhook
    }
});