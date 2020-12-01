const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'level',
  description: 'Veja seu level e XP',
  aliases: ['xp'],
  usage: '',
  category: 'Utils',
  cooldown: 3,
  permission: '*',
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;

    const xp = await db.get(`member_${message.guild.id}_${user.id}.XP`) || 0,
      level = await db.get(`member_${message.guild.id}_${user.id}.level`) || 0;

    const embed = new MessageEmbed()
      .setDescription(`> Level: \`${level}\`\n> XP: \`${xp}\``)
      .setColor(message.client.config.color);

    message.channel.send(`${message.author}`, { embed: embed })
  }
}