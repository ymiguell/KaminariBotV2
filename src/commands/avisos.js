const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'avisos',
  decription: 'Mostra o número de avisos do usuário mencionado.',
  usage: '[@member]',
  category: 'Moderation',
  aliases: '[warnings]',
  cooldown: 2,
  async execute(message, args) {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    const warnings = await db.get(`member_${message.guild.id}_${user.id}.warnings`) || 0;

    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Avisos')
        .setDescription(`${user} tem ${warnings < 1 ? 'nenhum' : `\`${warnings}\``} aviso${warnings > 1 ? 's' : ''}.`)
        .setColor('GREEN')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
  }
}