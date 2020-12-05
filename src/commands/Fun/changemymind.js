const Discord = require('discord.js');
const { changemymind } = require('canvacord');
const canva = require('canvacord');

module.exports = {
  name: 'changemymind',
  description: 'Exibe o meme "change my mind" com a frase colocada.',
  usage: '<frase>',
  category: 'Fun',
  aliases: ['mudesuaideia'],
  cooldown: 5,

  async execute(message, args) {

    message.channel.startTyping();

    let text = args.join(" ");

    if (!args[0]) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Comando utilizado de maneira errada.')
        .setDescription('Escreva a frase!')
    );

    let image = await canva.Canvas.changemymind(text);

    let changeMyMind = new Discord.MessageAttachment(image, "cmm.png")

    message.channel.stopTyping(true);
    
    message.channel.send(changeMyMind);

  }
}