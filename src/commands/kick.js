const Discord = require("discord.js");

module.exports = {
  name: 'kick',
  description: 'Permite kickar o usuário mencionado',
  usage: '<@membro> [motivo]',
  category: 'Moderation',
  aliases: ['expulsar', 'chutar', 'kickar'],
  cooldown: 2,
  async execute(message, args) {
    const member = message.mentions.members.first();

    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.reply("Você não pode utilizar este comando.")

    if (!member)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Você usou o comando de forma errada')
          .setDescription('Você deve mencionar um membro.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    if (member.user.id === message.author.id)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Você usou o comando de forma errada')
          .setDescription('Você não pode kickar a si mesmo, seu suicida.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    const isKickable = member.kickable;
    if (!isKickable)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Não foi possível kickar esse membro')
          .setDescription('Ele tem um cargo superior ao meu.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    args.shift()
    const reason = args.join(' ');
    const msg = await message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Você realmente deseja kickar este usuário?')
        .setDescription(`Reaja a mensagem com ✅ para confirmar o kick\nMotivo: ${reason ? reason : '¯\\_(ツ)_/¯'}`)
        .setColor('GREEN')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    msg.react("✅")

    const filter = (r, u) => r.emoji.name === "✅" && u.id === message.author.id;
    const collector = msg.createReactionCollector(filter, {
      max: 1
    });

    collector.on('collect', c => {
      c.remove(message.author.id);
      member.kick({
        reason: reason ? reason : '¯\\_(ツ)_/¯'
      });
      msg.delete({ timeout: 100 });

      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Usuário kickado')
          .setDescription(`Você acaba de kickar \`${member.user.tag} (${member.user.id})\` pelo motivo \`${reason ? reason : '¯\\_(ツ)_/¯'}\``)
          .setColor('GREEN')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    })
  }
}