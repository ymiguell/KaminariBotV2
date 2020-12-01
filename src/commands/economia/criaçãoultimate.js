const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãoultimate",
  description: "Cria para ganhar VPs",
  category: 'Economy',
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

      return message.channel.send(`Você já recebeu seu prêmio ultimate. Volte em ${time.days}d, ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
    } else {
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`ultimate_${message.guild.id}_${user.id}`, Date.now());

      const embed = new MessageEmbed()
      .setTitle('Você criou e ganhou')
      .setDescription(`${amount} VPs`)
      .setColor('PURPLE')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

      message.channel.send(embed)
    }
  }
}