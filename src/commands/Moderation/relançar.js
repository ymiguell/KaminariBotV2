const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'relançar',
  description: 'Relançar o sorteio anterior',
  aliases: ['reroll'],
  usage: '<id/nome>',
  category: 'Moderation',
  cooldown: 2,

  async execute(message, args) {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':interrobang: Erro ao executar o comando.')
        .setDescription('Você não tem permissão para relançar sorteios!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    if (!args[0]) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Você utilizou o comando de maneira errada.')
        .setDescription('Nenhum ID de sorteio fornecido!')
        .setColor('RED')
    );

    let giveaway = message.client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || message.client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':interrobang: Erro ao executar o comando.')
        .setColor('RED')
        .setDescription('Não foi possível encontrar uma sorteio com esse ID / nome!')
    );

    message.client.giveawaysManager.reroll(giveaway.messageID)
      .then(() => {
        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle('Sorteio relançado!')
            .setColor('GREEN')
        )
      })
      .catch((e) => {
        if (e.startsWith(`Sorteio com ID ${giveaway.messageID} não acabou`)) {
          message.channel.send('Este sorteio ainda não terminou')
        } else {
          console.error(e);
          message.channel.send('Um erro ocorreu')
        }
      })
  }
}