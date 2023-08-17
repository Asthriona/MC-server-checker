# MC Server Status Check
This is a lazy attempt to make a server status check. 
Initially the codebase was bad but working, Now it's less bad and still working.  
I update this right after r/place 2023, so I'm still recovering. (I just slept 10 hours max during the whole 6 days.)  
  
## How to Install? 
You may run this on any OS.  
You need: 
- NodeJS 8 or higher
  
copy the `config.json.exemple` and name it `config.json`  
```bash
mv config.json.exemple config.json
```  
  
then fillup the information with your server IP (`123.123.123.123` or `minecraft.asthriona.com` are both valid **"** *`IPs`* **"**), port, and a webhook link from a discord channel.
```json 
{
    "serverIP": "minecraft.asthriona.com",
    "serverPort": 25565,
    "webhook": "https://canary.discord.com/api/webhooks/XXXXXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```
then install the NPM packages and run it.
```bash
npm i
node src/index.js
```  
  
To keep the app running I would suggest [PM2](https://pm2.keymetrics.io/) or simillar apps.  
  
## What I use: 

- [mcsrvstat.us's API](https://mcsrvstat.us/)
- [Axios](https://axios-http.com/fr/docs/intro)
- [Discord Webhook](https://discord.com/developers/docs/resources/webhook)
