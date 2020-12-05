const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: 'setgoodbye',
  description: 'Seta o canal para enviar mensagem de despedidas.',
  aliases: ['setGoodByeChannel', 'setgoodbye', 'good-bye', 'setar-despedidas', 'goodbye'],
  usage: '<canal>',
  category: 'Moderation',
  cooldown: 5,

  async execute(message, args) {

    let channel = message.mentions.channels.first()

    if (!channel) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(':x: Comando utilizado de maneira errada.')
          .setDescription('Mencione o canal para ser setado!')
          .setColor('RED')
      );
    }
    db.set(`byechannel_${message.guild.id}`, channel.id)
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Canal setado com sucesso!')
        .setDescription(`O canal de despedidas está setado como ${channel}`)
        .setColor('GREEN')
    );
  }
}