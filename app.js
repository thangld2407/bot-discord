import "dotenv/config";
import * as events from "./src/events/index.js";
import bot from "./src/models/bot.js"

const TOKEN = process.env.DISCORD_TOKEN;

const start = async () => {
  try {
    //Listen events
    for (const [_, event] of Object.entries(events)) {
      event.once
        ? bot.once(event.name, event.execute)
        : bot.on(event.name, event.execute);
    }

    bot.login(TOKEN);

  } catch (error) {
    console.log(error);
  }
};

try {
  start();
} catch (error) {
  console.log(error);
}

