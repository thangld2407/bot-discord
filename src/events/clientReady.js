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

//Set commands to Bot

export const clientReady = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    for (const [_, command] of Object.entries(commands)) {
      bot.commands.set(command.data.name, command);
      body.push(command.data.toJSON());
    }
    console.log(`Started refreshing ${body.length} application (/) commands.`);
    console.time("process");
    const res = await Promise.all(client.guilds.cache.map((guild) => {
      console.log(guild.id);
      return rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, guild.id),
        {
          body,
        });
    }));
    console.timeEnd("process");
    console.log(
      `Successfully reloaded ${res.length} application (/) commands.`
    );
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
