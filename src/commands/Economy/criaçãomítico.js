const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãomítico",
  description: "Cria para ganhar VPs",
  category: 'Economy',
  usage: '',
  aliases: ['criaçaomítico', 'criacãomítico', 'criacaomítico'],
  cooldown: 2,

  async execute(message, args) {

    let user = message.author;
    let timeout = 2592000000;
    let amount = Math.floor(Math.random() * 250 + 1);
    if (message.member.roles.cache.get('772869271767613440')) amount = parseInt(amount * 2.0);

    let mitico = await db.fetch(`mitico_${message.guild.id}_${user.id}`);

    if (mitico !== null && timeout - (Date.now() - mitico) > 0) {
      let time = ms(timeout - (Date.now() - mitico));

      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Aguarde...')
          .setColor('BLUE')
          .setDescription(`Você não pode criar novamente em ${time.days}d, ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    } else {
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`mitico_${message.guild.id}_${user.id}`, Date.now());

      const embed = new MessageEmbed()
      .setTitle('Você criou e ganhou')
      .setDescription(`${amount} VPs :diamond_shape_with_a_dot_inside:`)
      .setColor('PURPLE')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

      message.channel.send(embed)
    }
  }
}