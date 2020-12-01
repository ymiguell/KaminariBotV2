const db = require('quick.db');
const Discord = require('discord.js');
const { execute } = require('./editvp');

module.exports = {
  name: 'inventário',
  description: 'Exibe seu iventário.',
  usage: '<item>',
  category: 'Economy',
  aliases: ['inventario', 'inv'],
  cooldown: 2,

  async execute(message, args) {

    let items = await db.fetch(`inventory_${message.guild.id}_${message.author.id}`);
    const Embed = new Discord.MessageEmbed()
      .addField('Inventário', items ? items : "Nada")
      .setColor('#02c7c4')
      .setFooter(message.author.tag, message.author.displayAvatarURL());
    message.channel.send(Embed);

  }
}