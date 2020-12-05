const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'avisar',
  description: 'Avisa o usuário mencionado no privado',
  usage: '<@membro> <motivo>',
  category: 'Moderation',
  aliases: ['warn'],
  cooldown: 2,
  async execute(message, args) {
    if (!message.member.hasPermission('MANAGE_GUILD'))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Sem permissão')
          .setDescription('Você não pode executar esse comando.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    if (!user || user.bot || message.author.id === user.id || message.guild.owner.user.id === user.id)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Uso do comando incorreto')
          .setDescription('Mencione um usuário válido.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    args.shift();
    const reason = args.join(' ');
    const warnings = await db.get(`member_${message.guild.id}_${user.id}.warnings`);
    if (warnings >= 3)
      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Esse usuário está com mais de 3 avisos')
          .setDescription(`Recomendamos banir esse usuário:\n${message.client.config.defaultPrefix}ban ${user} Atingiu o limite de avisos`)
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    const m = await message.channel.send('**Avisando usuário...**');
    await db.add(`member_${message.guild.id}_${user.id}.warnings`, 1);

    user.send(
      new Discord.MessageEmbed()
        .setTitle('Você foi avisado!')
        .setDescription(`Pelo motivo: \`${reason}\`\nNo servidor \`${message.guild.name}\``)
        .setColor('BLUE')
        .setFooter(`Pelo staff: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    )
      .then(() => m.edit(`${user.tag} avisado com sucesso!`))
      .catch(() => m.edit(`Houve um erro ao avisar ${user.username}: Ele pode ter bloqueado as DMs. O aviso foi contado de qualquer forma.`))
  }
}