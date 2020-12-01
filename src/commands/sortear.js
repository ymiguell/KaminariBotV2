const Discord = require('discord.js')
const ms = require('ms');
const { execute } = require('./vale/zaun');

module.exports = {
  name: 'sortear',
  description: 'Sorteia ;-;',
  aliases: ['giveaway', 'sorteio'],
  category: 'Economy',
  cooldown: 2,

  async execute(message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':interrobang: Erro ao executar o comando.')
        .setDescription('Você não tem permissão para iniciar sorteios!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    let channel = message.mentions.channels.first();

    if (!channel) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Você usou o comando de maneira errada')
        .setDescription('Mencione o canal para ocorrer o sorteio!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    let giveawayDuration = args[1];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Você usou o comando de maneira errada')
        .setDescription(':alarm_clock: Forneça uma duração válida!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    let giveawayWinners = args[2];

    if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Você usou o comando de maneira errada')
        .setDescription(':medal: Forneça um número de vencedores!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    let giveawayPrize = args.slice(3).join(" ");

    if (!giveawayPrize) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':pray: Você se esqueceu de definir um nome ao sorteio')
        .setDescription('Utilize: <prefixo>sortear <canal> <duração> <numerodeganhadores> <nomedosorteio>')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    message.client.giveawaysManager.start(channel, {
      time: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: giveawayWinners,
      hostedBy: message.client.config.hostedBy ? message.author : null,

      messages: {
        giveaway: (message.client.config.everyoneMention ? "@everyone\n\n" : "") + "SORTEIO",
        giveawayEned: (message.client.config.everyoneMention ? "@everyone\n\n" : "") + "SORTEIO FINALIZADO",
        timeRemaining: "Tempo restante: **{duration}**",
        inviteToParticipate: "Reaja com 🎉 para participar",
        winMessage: "Parabéns {winners}, você venceu **{prize}**",
        embedFooter: "Giveaway time!",
        noWinner: "Não foi possível determinar um vencedor",
        hostedBy: "Hospedado por {user}",
        winners: "ganhador(s)",
        endedAt: "Termina em",
        units: {
          seconds: "segundos",
          minutes: "minutos",
          hours: "horas",
          days: "dias",
          pluralS: false
        }
      }
    })

    message.channel.send(`Sorteio começando em ${channel}`);
  }
}
