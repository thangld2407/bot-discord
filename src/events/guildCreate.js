import {
    Events,
    Collection,
    Routes,
} from 'discord.js';
import * as commands from "../commands/index.js";
import rest from "../models/rest.js";
import bot from "../models/bot.js";

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const body = [];

bot.commands = new Collection();

export const guildCreate = {
    name: Events.GuildCreate,
    async execute(guild) {
        for (const [_, command] of Object.entries(commands)) {
            bot.commands.set(command.data.name, command);
            body.push(command.data.toJSON());
        }
        const res = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, guild.id),
            {
                body,
            });

        console.log(
            `Successfully added ${res.length} application (/) commands to ${guild.name}.`
        );
    },
};