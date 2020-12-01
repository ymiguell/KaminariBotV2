const Discord = require('discord.js')
const ms = require('ms');

module.exports = {
  name: 'relançar',
  description: 'Relançar o sorteio anterior',
  aliases: ['reroll'],
  category: 'Economy',
  cooldown: 2,

  async execute(message, args) {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Você não tem permissão para relançar sorteios');

    if (!args[0]) return message.channel.send('Nenhum ID de sorteio fornecido');

    let giveaway = message.client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || message.client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) return message.channel.send('Não foi possível encontrar uma sorteio com esse ID / nome');

    message.client.giveawaysManager.reroll(giveaway.messageID)
      .then(() => {
        message.channel.send('Sorteio relançado')
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