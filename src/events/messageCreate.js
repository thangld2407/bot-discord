import { Events } from "discord.js";
import { GPT } from "../utils/gpt.js";
let res = null;

export const messageCreate = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;

    if (message.channelId === "1075242583414014003") {
      if (message.content === "-reset") {
        res = null;
        await message.reply("Đã làm mới cuộc trò chuyện.");
        return;
      }

      if (res) {
        res = await GPT.sendMessage(message.content, {
          conversationId: res.conversationId,
          parentMessageId: res.id,
        });
      } else {
        res = await GPT.sendMessage(message.content);
      }

      await message.reply(res.text);
    }
  },
};
