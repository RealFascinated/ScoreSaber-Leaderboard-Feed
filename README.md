# ScoreSaber-Leaderboard-Feed
Simple leaderboard feed for score saber that sends #1 to the webhook

# Setup
Rename the config example to `config.json` </br>
Setup your config values </br>
Load the node project </br>
```bash
npm i
# or 
yarn 
```

# Loading
```bash
node .
```

# Default Config
```json
{
    "webhook": "", # The Discord Webhook
    "countryOnly": "" # Allow only this countrys or scores in the feed, can also be "ALL" to allow every country.
}
```
