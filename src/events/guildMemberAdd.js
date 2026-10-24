import { EmbedBuilder, userMention } from "discord.js";

const CHANNEL_NAME = process.env.CHANNEL_NAME;
const MEME_URL = process.env.MEME_URL || "";

const event = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      (channel) => channel.name === CHANNEL_NAME
    );

    if (!channel) {
      console.error(`Welcome channel "${CHANNEL_NAME}" not found.`);
      return;
    }

    const welcomeMessage = await getWelcomeMessageWithMeme(member.id);
    console.log("MEME_URL is set:", Boolean(MEME_URL));
    console.log("Embed payload:", JSON.stringify(welcomeMessage.embeds));

    try {
      const sent = await channel.send(welcomeMessage);
      console.log("Welcome sent. Embed count:", sent.embeds.length);
      console.log("Embed image:", sent.embeds[0]?.image?.url ?? "NO IMAGE");
    } catch (error) {
      console.error("Failed to send welcome embed:", error);
    }
  },
};

const getWelcomeMessageWithMeme = async (userId) => {
  return {
    content: `Welcome to the Archive Bot ${userMention(userId)}!\nHere's a meme for you to enjoy!`,
    embeds: [
      new EmbedBuilder().setImage(MEME_URL),
    ],
  };
};

export default event;
