const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Desmuta o usuario mencionado.',
  usage: '<user>',
  category: 'Moderation',
  aliases: ['desmutar'],
  cooldown: 2,

  async execute(message, args) {

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':interrobang: Erro ao executar o comando.')
        .setDescription('Você não tem permissão para desmutar usuários!')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    let role = message.guild.roles.cache.find(x => x.name === "Mutado");

    if (user.roles.cache.has(role)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Este membro não está mutado!')
        .setColor('RED')
    );

    user.roles.remove(role);

    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Comando executado com sucesso.')
        .setDescription(`${user} foi desmutado.`)
        .setColor('GREEN')
    );

  }
}