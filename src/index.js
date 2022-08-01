const { status } = require("minecraft-server-util");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require('axios');
const { serverIP, serverPort, webhook } = require('./config.json');

const option = {
    timeout: 1000 * 5,
    enableSRV: true,
}

let Status =  null;
let server = {};

function getStatus() {
    status('fubuki.asthriona.space', 25565, option)
        .then(data => {
            if (!Status) {
                console.log("Server is online (first check)")
                server = {
                    version: data.version.name,
                    players: data.players.online,
                    maxPlayers: data.players.max,
                    motd: data.motd.clean,
                }
                Status = {
                    online: true,
                    isFirst: true,
                    title: "✅✅ Fubuki is now online! ✅✅",
                    message: `This is the first message. \nThe server might never been down in the first place. \nJust letting you know :)\nServer IP: \`fubuki.asthriona.space\`\nModpack: \`FTB Infinity Evolved\`\nVersion: \`${server.version}\`\nPlayers: \`${server.players} \\ ${server.maxPlayers}\`\nmotd: \`${server.motd}\``,
                    color: "#4718336"

                }
                return sendMessage(Status, server);
            } else if (Status.online == true) {
                server = {
                    version: data.version.name,
                    players: data.players.online,
                    maxPlayers: data.players.max,
                    motd: data.motd.clean,
                }
                Status = {
                    online: true,
                    isFirst: false,
                }
            } else if (Status.online == false && Status !== null) {
                console.log("server is back online!")
                server = {
                    version: data.version.name,
                    players: data.players.online,
                    maxPlayers: data.players.max,
                    motd: data.motd.clean,
                }
                Status = {
                    online: true,
                    isFirst: false,
                    title: "✅✅ Fubuki is now back online! ✅✅",
                    color: "#4718336"
                }
                sendMessage(Status, server);
            } else {
                server = {
                    version: data.version.name,
                    players: data.players.online,
                    maxPlayers: data.players.max,
                    motd: data.motd.clean,
                }
                Status = {
                    online: true,
                    isFirst: false,
                }
            }
        })
        .catch(err => {
            if (Status.online == false) {
                console.log("Server is still offline.");
            } else if (Status.online == true) {
                console.log("Server is now offline.");
                Status = {
                    online: false,
                    isFirst: false,
                    title: "❌❌ Fubuki went down! ❌❌",
                    message: `The minecraft server went down. Ping @Asthrona#0001 if the issue is not solved in the next 10 minutes.`,
                    color: "#ff0000"
                }
                sendMessage(Status, server);
            } else {
                console.log("Server is still offline.");
            }
        })
    };
    setInterval(getStatus, 10000);
    function sendMessage(Status, server) {
        axios.post('https://canary.discord.com/api/webhooks/1003680583186120764/NX_MppL7UYD6wtE7uw56qCOwuibvN-rYXuCZ5Z7Tf7u2rCBLU_BsjaEDTSUr6sKqwC9z', {
            "embeds": [
                {
                    "title": Status.title,
                    "description": Status.message,
                    "color": 4718336
                }
            ],
            "attachments": []
        })
        .then((res) => {
            console.log(res.data);
        })
    }

