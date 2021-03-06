
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'editvp',
  description: 'Permite editar a quantidade de VPs de qualquer usuário.',
  usage: '<@valor> <user>',
  category: 'Economy',
  aliases: ['changevp'],
  cooldown: 2,

  async execute(message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.reply(':x: Você não tem permissão para editar VPs')
    }

    if (!args[0]) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Você utilizou o comando de maneira errada.')
        .setColor('RED')
        .setDescription(`Utilize: (prefix)editvp <valor> [@user]`)
    );


    if (isNaN(args[0])) return message.channel.send(
      new Discord.MessageEmbed()
      .setTitle(':x: Você utilizou o comando de maneira errada.')
      .setColor('RED')
      .setDescription(':unamused: Você se esqueceu de colocar o valor!')
    );
    let user = message.mentions.users.first() || message.author
    message.channel.send(':white_check_mark: VPs editados com sucesso! ' + args[0] + ' VPs para ' + `${user}`)
    db.add(`money_${message.guild.id}_${user.id}`, args[0])
  }
}