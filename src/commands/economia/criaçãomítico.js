const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãomítico",
  description: "Cria para ganhar VPs",
  category: 'Economy',
  aliases: ['criaçaomítico', 'criacãomítico', 'criacaomítico'],
  cooldown: 2,

  async execute(message, args) {

    let user = message.author;
    let timeout = 2592000000;
    let amount = Math.floor(Math.random() * 300 + 1);
    if (message.member.roles.cache.get('772869271767613440')) amount = parseInt(amount * 2.0);

    let mitico = await db.fetch(`mitico_${message.guild.id}_${user.id}`);

    if (mitico !== null && timeout - (Date.now() - mitico) > 0) {
      let time = ms(timeout - (Date.now() - mitico));

      return message.channel.send(`Você já recebeu seu prêmio mítico. Volte em ${time.days}d, ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
    } else {
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`mitico_${message.guild.id}_${user.id}`, Date.now());

      const embed = new MessageEmbed()
      .setTitle('Você criou e ganhou')
      .setDescription(`${amount} VPs`)
      .setColor('PURPLE')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

      message.channel.send(embed)
    }
  }
}