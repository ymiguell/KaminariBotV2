const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãoépico",
  description: "Cria para ganhar VPs",
  category: 'Economy',
  aliases: ['criaçaoépico', 'criacãoépico', 'criacaoépico'],
  cooldown: 2,

  async execute(message, args) {

    let user = message.author;
    let timeout = 43200000;
    let amount = Math.floor(Math.random() * 100 + 1);
    if (message.member.roles.cache.get('772869271767613440')) amount = parseInt(amount * 2.0);

    let epico = await db.fetch(`epico_${message.guild.id}_${user.id}`);

    if (epico !== null && timeout - (Date.now() - epico) > 0) {
      let time = ms(timeout - (Date.now() - epico));

      return message.channel.send(`Você já recebeu seu prêmio épico. Volte em ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
    } else {
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`epico_${message.guild.id}_${user.id}`, Date.now());

      const embed = new MessageEmbed()
      .setTitle('Você criou e ganhou')
      .setDescription(`${amount} VPs`)
      .setColor('YELLOW')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

      message.channel.send(embed)
    }
  }
}