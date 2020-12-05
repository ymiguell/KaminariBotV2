const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: 'setwelcome',
  description: 'Seta o canal para enviar mensagem de boas-vindas.',
  aliases: ['setWelcomeChannel', 'setchannelwelcome', 'bem-vindo', 'setarbem-vindo'],
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
    db.set(`welchannel_${message.guild.id}`, channel.id)
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Canal setado com sucesso!')
        .setDescription(`O canal de boas-vindas está setado como ${channel}`)
        .setColor('GREEN')
    );
  }
}