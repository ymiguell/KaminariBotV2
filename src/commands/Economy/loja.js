const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { execute } = require('./editvp');

module.exports = {
  name: 'loja',
  description: 'Exibe a loja do servidor.',
  usage: '',
  category: 'Economy',
  aliases: ['store'],
  cooldown: 2,

  async execute(message, args) {

    const embed = new Discord.MessageEmbed()
      .setColor('YELLOW')
      .setTitle('Loja')
      .setDescription(`2800RP - 50.000 VPs\n1380RP - 25.000 VPs`)
      .setTimestamp();

    message.channel.send(embed);
  }
}