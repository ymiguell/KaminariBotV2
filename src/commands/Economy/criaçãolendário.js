const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
  name: "criaçãolendário",
  description: "Cria para ganhar VPs",
  category: 'Economy',
  usage: '',
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

      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Aguarde...')
          .setColor('BLUE')
          .setDescription(`Você não pode criar novamente em ${time.hours}h, ${time.minutes}m, e ${time.seconds}s`)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    } else {
      db.add(`money_${message.guild.id}_${user.id}`, amount);
      db.set(`lendario_${message.guild.id}_${user.id}`, Date.now());

      const embed = new MessageEmbed()
      .setTitle('Você criou e ganhou')
      .setDescription(`${amount} VPs :diamond_shape_with_a_dot_inside:`)
      .setColor('BLUE')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

      message.channel.send(embed)
    }
  }
}