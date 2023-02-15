import { SlashCommandBuilder } from "discord.js";
import { GPT } from "../utils/gpt.js";

let res = null;
export const gpt = {
  data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("Using GPT-3 to generate text")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Question send to Chat GPT")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const question = await interaction.options.getString("question");

    if (res) {
      res = await GPT.sendMessage(question, {
        conversationId: res.conversationId,
        parentMessageId: res.id,
      });
    } else {
      res = await GPT.sendMessage(question);
    }

    await interaction.editReply(
      `${interaction.user.username}: ${question} \nChatGPT: ${res.text}`
    );
  },
};
