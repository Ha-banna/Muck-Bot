const Discord = require('discord.js');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});

const messageOffenders = {};

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

bot.on("messageCreate", async (message) => {
  if (message.channel.id === "1232805994615017552" && message.author.id !== '678621201177772054' && !message.author.bot) {
    try {
      const member = await message.guild.members.fetch(message.author.id);
      let mutedRole = message.guild.roles.cache.find(role => role.name === "Muted");

      if (member) {
        message.author.send("You have been muted for sending messages in the improper channel");
        messageOffenders[message.author.id] = (messageOffenders[message.author.id] || 0) + 1;

        if (!mutedRole) {
          mutedRole = await message.guild.roles.create({
            name: 'Muted',
            permissions: []
          });
        }

        // Add the muted role to the member
        const oldRoles = member.roles.cache;
        await member.roles.remove(member.roles.cache);
        await member.roles.add(mutedRole);

        // React to the message
        message.react("😡");
        member.send(`Number of offences: ${messageOffenders[message.author.id]}`);
        member.send(`You will be muted for: ${messageOffenders[message.author.id] * 30 * 2} seconds`);

        setTimeout(async () =>{
          await member.roles.remove(mutedRole);
          await member.roles.add(oldRoles);
          await member.send("I have returned your roles! Please don't do it again.")
          
        }, 30000 * messageOffenders[message.author.id] * 2);
      }
    } catch (error) {
      console.error('Error fetching member or timing out:', error);
    }
  } else if (message.content === "ping") {
    message.channel.send("pong!");
  } else if (message.content === "pong") {
    message.channel.send("ping!");
  } 
});


bot.on("guildAuditLogEntryCreate", async(action)=>{
  if(action.action === 27){
    const member = await bot.guilds.cache.get("706582735426420757").members.fetch(action.executorId);
    await member.voice.setChannel(null);
    
    member.send("You have been removed for being a hreme");
  }
});

bot.login(process.env.token)

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
