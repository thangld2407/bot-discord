import "dotenv/config";
import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";

import * as commands from "./src/commands/index.js";
import * as events from "./src/events/index.js";

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const start = async () => {
  try {
    const body = [];
    const rest = new REST({ version: "10" }).setToken(TOKEN);

    const bot = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    bot.commands = new Collection();

    //Set commands to Bot
    for (const [_, command] of Object.entries(commands)) {
      bot.commands.set(command.data.name, command);
      body.push(command.data.toJSON());
    }

    //Listen events
    for (const [_, event] of Object.entries(events)) {
      if (event.once) {
        bot.once(event.name, event.execute);
      } else {
        bot.on(event.name, event.execute);
      }
    }

    bot.login(TOKEN);

    console.log(`Started refreshing ${body.length} application (/) commands.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      {
        body,
      }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.log(error);
  }
};

start();
