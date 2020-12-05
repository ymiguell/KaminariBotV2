const db = require('quick.db');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãoultimate",
  description: "Cria para ganhar VPs",
  category: 'Economy',
  usage: '',
  aliases: ['criaçaoultimate', 'criacãoultimate', 'criacaoultimate'],
  cooldown: 2,

  async execute(message, args) {

    let user = message.author;
    let timeout = 7776000000;
    let amount = Math.floor(Math.random() * 500 + 1);
    if (message.member.roles.cache.get('772869271767613440')) amount = parseInt(amount * 2.0);

    let ultimate = await db.fetch(`ultimate_${message.guild.id}_${user.id}`);

    if (ultimate !== null && timeout - (Date.now() - ultimate) > 0) {
      let time = ms(timeout - (Date.now() - ultimate));

      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Aguarde...')
          .setColor('BLUE')
          .setDescription(`Você não pode criar novamente em ${time.days}d, ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    } else {
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`ultimate_${message.guild.id}_${user.id}`, Date.now());

      const embed = new MessageEmbed()
      .setTitle('Você criou e ganhou')
      .setDescription(`${amount} VPs :diamond_shape_with_a_dot_inside:`)
      .setColor('PURPLE')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

      message.channel.send(embed)
    }
  }
}