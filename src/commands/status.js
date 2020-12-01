const { MessageEmbed } = require('discord.js');

const emojis = {
  online: '<:online:779713595209809920>',
  idle: '<:idle:779713655704911872>',
  dnd: '<:dnd:779713719135371304>',
  off: '<:offline:779713798508511262>'
}

const formattedStatus = {
  online: 'Online',
  idle: 'Ausente',
  dnd: 'Não pertube',
  off: 'Offline'
}

module.exports = {
  name: 'status',
  description: 'Veja se o usuário está no celular, PC ou na web!',
  aliases: ['clientstatus', 'activity', 'presence'],
  category: 'Utils',
  usage: '[@user]',
  cooldown: 0,
  async execute(message, args) {
    const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;

    const desktop = getFormattedStatus(user.presence.clientStatus.desktop),
      mobile = getFormattedStatus(user.presence.clientStatus.mobile),
      web = getFormattedStatus(user.presence.clientStatus.web);

    const embed = new MessageEmbed()
      .setAuthor(`Status de Presença de ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))
      .setDescription(`${getEmoji(user.presence.clientStatus.desktop)} **Desktop:** ${desktop}
      ${getEmoji(user.presence.clientStatus.mobile)} **Mobile:** ${mobile}
      ${getEmoji(user.presence.clientStatus.web)} **Web:** ${web}`)
      .setColor('#03ff81')

    message.channel.send(embed);
  }
}

function getEmoji(status) {
  return status ? emojis[status] : emojis.off;
}

function getFormattedStatus(status) {
  return status ? formattedStatus[status] : formattedStatus.off;
}