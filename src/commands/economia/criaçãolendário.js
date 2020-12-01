const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãolendário",
  description: "Cria para ganhar VPs",
  category: 'Economy',
  aliases: ['criaçaolendário', 'criacãolendário', 'criacaolendário'],
  cooldown: 2,

  async execute(message, args) {

    let user = message.author;
    let timeout = 86400000;
    let amount = Math.floor(Math.random() * 100 + 1);
    if (message.member.roles.cache.get('772869271767613440')) amount = parseInt(amount * 2.0);

    let lendario = await db.fetch(`lendario_${message.guild.id}_${user.id}`);

    if (lendario !== null && timeout - (Date.now() - lendario) > 0) {
      let time = ms(timeout - (Date.now() - lendario));

      return message.channel.send(`Você já recebeu seu prêmio lendário. Volte em ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
    } else {
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`lendario_${message.guild.id}_${user.id}`, Date.now());

      const embed = new MessageEmbed()
      .setTitle('Você criou e ganhou')
      .setDescription(`${amount} VPs`)
      .setColor('BLUE')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

      message.channel.send(embed)
    }
  }
}