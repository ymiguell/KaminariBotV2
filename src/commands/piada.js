const { get } = require('axios').default;
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'piada',
  description: 'Veja uma piada!',
  aliases: ['tiodopave'],
  usage: '',
  category: 'Fun',
  cooldown: 5,
  permission: '*',
  async execute(message, args) {
    message.channel.startTyping();
    const res = await get(
      'https://us-central1-kivson.cloudfunctions.net/charada-aleatoria',
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    const embed = new MessageEmbed()
      .setAuthor('Piada da Google Assistente', 'https://i.imgur.com/tOe35vc.png')
      .setDescription(`**${res.data.pergunta}**\n\n||${res.data.resposta}||`)
      .setColor('#0099FF')

    message.channel.stopTyping(true);
    message.channel.send(embed);
  }
}