const axios = require('axios');
const { WebhookClient, MessageEmbed } = require('discord.js');

const config = require('../config.json');

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

let previousStatus = null;

// Send webhook function
const sendWebhook = async (message, color) => {
    try {
        const { webhook } = config;
        await axios.post(webhook, {
            content: message,
            embeds: [
                {
                    title: "Minecraft Server Status",
                    description: message,
                    color,
                }
            ],
        });
    } catch (error) {
        console.error('Error sending Discord Webhook.', error.message)
    }
};

// Check server status function
const checkMinecraftServer = async () => {
  const { serverIP, serverPort } = config;
  while (true) {
    try {
        const res = await axios.get(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`);
        const isOnline = res.status === 200 && res.data && res.data.online;
        if(isOnline !== previousStatus) {
            previousStatus = isOnline;
            const message = isOnline ? `✅ ${serverIP} is ONLINE! ✅` : `❌ ${serverIP} is OFFLINE! ❌`;
            const embedMessage = isOnline ? `${serverIP} is ONLINE!` : `${serverIP} is OFFLINE!`;
            const color = isOnline ? 0x00FF00 : 0xFF0000;
            console.log(message);
            sendWebhook(message, color);
        }
    } catch (error) {
        console.error(error);
    }
    await sleep(30000);
  }
};

checkMinecraftServer();
