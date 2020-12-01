const Discord = require('discord.js');
const Client = require('./src/Client');
const client = new Client();
const fs = require('fs');
const db = require('quick.db');
const { getPrefix } = require('./src/Utils');
const roles = require('./src/roles');

const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`)
  client.commands.set(command.name, command);
};


// Switch presence
client.on('ready', () => {
  console.log(`${client.user.tag} ready.\n${client.guilds.cache.size} guilds`);
  const cEconomy = fs.readdirSync('./src/commands/economia').filter(file => file.endsWith('.js'));
  for (const file of cEconomy) { const command = require(`./src/commands/economia/${file}`); client.commands.set(command.name, command); };
  const cVale = fs.readdirSync('./src/commands/vale').filter(file => file.endsWith('.js'));
  for (const file of cVale) { const command = require(`./src/commands/vale/${file}`); client.commands.set(command.name, command); };

  activities = [
    {
      name: `k!help`,
      type: 'WATCHING'
    },
    {
      name: 'League of Legends',
      type: 'STREAMING',
      url: 'https://www.twitch.tv/ymiguell',
    },
    {
      name: 'Spotify',
      type: 'LISTENING'
    },
    {
      name: 'Minecraft',
      type: 'PLAYING'
    },
  ]

  let index = 0;
  setInterval(() => {
    const message = activities[index];
    index++
    client.user.setActivity(message)
    if (index >= activities.length) index = 0;
  }, 10000)
});

// welcome system
client.on('guildMemberAdd', async member => {
  if (!member.guild) return;

  const welcomeChannelID = await db.get(`guild_${member.guild.id}.welcomeChannel`);
  const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);
  const prefix = await getPrefix(member.guild, client);

  if (!welcomeChannelID) return;
  if (!welcomeChannel || welcomeChannel.type === 'category' || welcomeChannel.type === 'voice') {
    return member.guild.owner.user.send(`O canal que você definiu \`${welcomeChannelID}\` não existe ou é invalido. Use \`${prefix}setWelcomeChannel <Menção de Canal/ID de Canal>\``)
  }

  const permissions = welcomeChannel.permissionsFor(member.guild.me);
  if (permissions.has('SEND_MESSAGES') || permissions.has('VIEW_CHANNEL')) {
    return member.guild.owner.user.send(`O canal que você definiu \`${welcomeChannelID}\` está privado. Defina um canal válido usando \`${prefix}setWelcomeChannel <Menção de Canal/ID de Canal>\``)
  }

  const embed = new Discord.MessageEmbed()
    .setThumbnail(member.guild.iconURL({ dynamic: true, size: 512, format: 'png' }))
    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))
    .setDescription(`Bem-vindo \`${member.user.tag}\`!`)
    .setFooter(`ID: ${member.user.id}`);

  welcomeChannel.send(embed).catch(console.error);
})

// welcome system
client.on('guildMemberRemove', async member => {
  if (!member.guild) return;

  const welcomeChannelID = await db.get(`guild_${member.guild.id}.welcomeChannel`);
  const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);
  const prefix = await getPrefix(message.guild, client);

  if (!welcomeChannelID) return;
  if (!welcomeChannel || welcomeChannel.type === 'category' || welcomeChannel.type === 'voice') {
    return member.guild.owner.user.send(`O canal que você definiu \`${welcomeChannelID}\` não existe ou é invalido. Use \`${prefix}setWelcomeChannel <Menção de Canal/ID de Canal>\``)
  }

  const permissions = welcomeChannel.permissionsFor(member.guild.me);
  if (permissions.has('SEND_MESSAGES') || permissions.has('VIEW_CHANNEL')) {
    return member.guild.owner.user.send(`O canal que você definiu \`${welcomeChannelID}\` está privado. Defina um canal válido usando \`${prefix}setWelcomeChannel <Menção de Canal/ID de Canal>\``)
  }

  const embed = new Discord.MessageEmbed()
    .setThumbnail(member.guild.iconURL({ dynamic: true, size: 512, format: 'png' }))
    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))
    .setDescription(`\`${member.user.tag}\` saiu.`)
    .setFooter(`ID: ${member.user.id}`);

  welcomeChannel.send(embed).catch(console.error);
})

// command handler
client.on('message', async message => {
  if (!message.guild) return;
  //if (message.guild.id !== '566806942207574033') return;
  if (message.author.bot) return;

  const prefix = await db.get(`guild_${message.guild.id}.prefix`) || client.config.defaultPrefix;
  if (!message.content.startsWith(prefix)) {
    let xpRole;
    roles.reverse().forEach(xpRoles => {
      if (!!xpRole) return;

      let role = message.member.roles.cache.get(xpRoles.ID);
      if (role) xpRole = role;
    });

    // Se o usuário não tiver um cargo de XP, ele dá o cargo com menos level possível.
    if (!xpRole) return message.member.roles.add(roles.find(r => r.nome === 'Poro').ID);

    // Ele vai pegar informações como level, xp necessário do cargo.
    let data = roles.find(r => xpRole.id === r.ID);

    // Ele vai adicionar o ganho de XP na database
    await db.add(`member_${message.guild.id}_${message.author.id}.XP`, 10); //data.GanhoXP);

    // Vai definir uma variável contendo o novo XP do usuário
    let userXP = await db.get(`member_${message.guild.id}_${message.author.id}.XP`);

    // Se o XP do usuário for maior ou igual a 100, ele reseta o XP, e adiciona um level pro usuário
    if (userXP >= 100) {
      db.set(`member_${message.guild.id}_${message.author.id}.XP`, 0);
      await db.add(`member_${message.guild.id}_${message.author.id}.level`, 1);

      // Ele cria uma variável com o level do usuário
      let userLevel = await db.get(`member_${message.guild.id}_${message.author.id}.level`);

      // Ele avisa o usuário que o mesmo upou de level e deleta a própria mensagem após 5 segundos
      const msg = await message.channel.send(`🆙 **|** ${message.author} foi pro level ${userLevel}`);
      msg.delete({ timeout: 5000 });

      // Ele vai pegar os novos dados do cargo do novo level do usuário
      let newRoleData = roles.find(r => r.Level === userLevel);

      // Ele adiciona o cargo do level do usuário
      if (newRoleData) return message.member.roles.add(newRoleData.ID);
    }
    return;
  }

  const args = message.content.trim().slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases.includes(commandName));

  if (!command) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Esse comando não existe!')
      .setDescription(`Tente utilizar \`${client.config.defaultPrefix}help\` para ver a lista de comandos.`)
      .setColor('RED');

    return message.channel.send(embed);
  };

  if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`:x: **|** Aguarde mais \`${timeLeft.toFixed(1)}\` segundos.`)
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.log(error);
    console.log('Algo que achavamos que nunca ia acontecer, aconteceu...');
    message.reply(':x: **|** Um erro ocorreu, tente novamente mais tarde.');
  }
})

//GiveAways System
const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
//GiveAways System

client.login(client.config.token);