const Discord = require('discord.js');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});

const bot = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildModeration,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildScheduledEvents,
    Discord.GatewayIntentBits.AutoModerationConfiguration,
    Discord.GatewayIntentBits.AutoModerationExecution,
    Discord.GatewayIntentBits.GuildMessagePolls,
    Discord.GatewayIntentBits.DirectMessagePolls
  ]
});

bot.on("messageCreate", message=>{
  if (message.content === "ping"){
    message.channel.send("pong!")
  }
});

bot.login(process.env.token)

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
