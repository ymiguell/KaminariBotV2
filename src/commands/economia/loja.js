const Discord = require('discord.js');
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
      .setDescription(`Item 1 - 150.000 VP\nItem 2 - 50.000 VP\n Item 3 - 45.000 VP\nItem 4 - 30.000 VP. \n Item 5 - 24.000 VP. \n Item 6 - 10 .000 VP.`)
      .setTimestamp();

    message.channel.send(embed);
  }
}