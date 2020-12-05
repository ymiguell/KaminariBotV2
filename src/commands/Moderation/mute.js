const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Muta o usuario mencionado.',
  usage: '<user> [motivo]',
  category: 'Moderation',
  aliases: ['mutar'],
  cooldown: 2,

  async execute(message, args) {

    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':interrobang: Erro ao executar o comando.')
        .setDescription('Você não tem permissão para mutar usuários!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!user) message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você se esqueceu de mencioanar alguém ou esse usuário não foi encontrado!')
        .setColor('RED')
    );

    if (user.id === message.author.id) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você não pode se silenciar!')
    );

    let role = message.guild.roles.cache.find(x => x.name === 'Mutado');

    if (!role) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Não foi possível encontar o cargo <Mutado> ')
        .setColor('RED')
    );

    let reason = args.slice(1).join(' ');
    if (reason === null) reason = 'Unspecified'

    user.roles.add(role);

    await message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Comando executado com sucesso.')
        .setDescription(`${user} foi silenciado pelo seguinte motivo: ${reason}`)
        .setColor('GREEN')
    );

    user.send(
      new Discord.MessageEmbed()
        .setTitle('Server: VΔLΞ')
        .setDescription(`Você foi silenciado por ${message.guild.name} pelo seguinte motivo: ${reason}`)
        .setColor('#000000')
    );

  }
}