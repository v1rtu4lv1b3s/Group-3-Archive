```js
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
    await channel.send(welcomeMessage);
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
```
