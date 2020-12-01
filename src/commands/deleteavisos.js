const Discord = require('discord.js');
const warnings = require('./avisos');
const db = require('quick.db');

module.exports = {
  name: 'deleteavisos',
  description: 'Deleta todos os avisos do usuário mencionado',
  usage: '<@membro>',
  category: 'Moderation',
  aliases: ['apagaravisos', 'deletewarns', 'deletewarnings'],
  cooldown: 2,
  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Você não tem permissão.')
          .setDescription('Você precisa ter a permissão de gerenciar servidor.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Você utilizou o comando de forma errada.')
        .setDescription('Você se esqueceu de mencionar um usuário válido.')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (user.bot) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Você utilizou o comando de forma errada.')
        .setDescription('Você não pode mencionar um bot.')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    if (!warnings) return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`**${user.username} não tem avisos**`)
        .setColor('BLUE')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.delete(`avisos_${message.guild.id}_${user.id}`);
    const embed = new Discord.MessageEmbed()
      .setTitle('Sucesso!')
      .setColor('GREEN')

    message.channel.send(embed)
  }
}