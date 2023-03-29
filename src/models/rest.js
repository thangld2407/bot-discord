import "dotenv/config";
import {
    REST,
} from "discord.js";

const TOKEN = process.env.DISCORD_TOKEN;

const rest = new REST({ version: "10" }).setToken(TOKEN);

export default rest;