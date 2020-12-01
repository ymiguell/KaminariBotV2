const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãoraro",
  description: "Cria para ganhar VPs",
  category: 'Economy',
  aliases: ['criaçaoraro', 'criacãoraro', 'criacaoraro'],
  cooldown: 2,

  async execute(message, args) {

    let user = message.author;
    let timeout = 10800000;
    let author = await db.fetch(`criou_${message.guild.id}_${user.id}`);

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));
      return message.channel.send(`Você vai poder criar novamente em ${time.hours}h, ${time.minutes}m e ${time.seconds}s`)
    } else {
      let amount = Math.floor(Math.random() * 15 + 1);
      if (message.member.roles.cache.get('772869271767613440')) amount = parseInt(amount * 2.0);
      db.add(`money_${message.guild.id}_${user.id}`, amount)
      db.set(`criou_${message.guild.id}_${user.id}`, Date.now())

      const embed = new MessageEmbed()
      .setTitle('Você criou e ganhou')
      .setDescription(`${amount} VPs`)
      .setColor('GREEN')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

      message.channel.send(embed)
    }
  }
}