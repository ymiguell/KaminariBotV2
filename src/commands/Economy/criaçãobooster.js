const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãobooster",
  description: "Criar para ganhar VPs(apenas para boosters)",
  category: 'Economy',
  usage: '',
  aliases: ['criaçaobooster', 'criacãobooster', 'criacaobooster'],
  cooldown: 2,

  async execute(message, args) {

    if (!message.member.roles.cache.get('772869271767613440'))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(':x: Falta de permissões.')
          .setColor('RED')
          .setDescription('Você não deu boost no servidor, logo você não pode utilizar esse comando.')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    let user = message.author;
    let timeout = 1296000000;
    let author = await db.fetch(`boostou_${message.guild.id}_${user.id}`);

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Aguarde')
          .setColor('BLUE')
          .setDescription(`Você não pode criar novamente em ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s`)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      )
    } else {
      let amount = Math.floor(Math.random() * 250 + 1);
      if (message.member.roles.cache.get('772869271767613440')) amount = parseInt(amount * 2.0);

      db.add(`money_${message.guild.id}_${user.id}`, amount)
      db.set(`boostou_${message.guild.id}_${user.id}`, Date.now())

      message.channel.send(`${user}, você boostou e ganhou ${amount} VPs :diamond_shape_with_a_dot_inside:`)
    }
  }
}