const Discord = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Permite banir o usuário mencionado',
  aliases: ['limpar', 'purge', 'clearchat'],
  category: 'Moderation',
  cooldown: 2,
  async execute(message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES'))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Você usou o comando de forma errada')
          .setDescription('Você não tem permissão para utilizar este comando')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    const deleteCount = parseInt(args[0]) + 1;
    if (!!!deleteCount || deleteCount < 0 || deleteCount > 100)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Você usou o comando de forma errada')
          .setDescription('Selecione o número de mensagens para ser deletadas.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    message.channel.bulkDelete(deleteCount);
    const m = await message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Mensagens deletadas')
        .setDescription(`Foram deletadas \`${deleteCount}\` mensagens.`)
        .setColor('GREEN')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    m.delete({ timeout: 5000 });
  }
}