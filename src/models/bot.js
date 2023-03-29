import {
    Client,
    GatewayIntentBits,
} from "discord.js";

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

export default bot;