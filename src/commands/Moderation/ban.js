const Discord = require("discord.js");

module.exports = {
  name: 'ban',
  description: 'Permite banir o usuário mencionado',
  usage: '<@membro> [motivo]',
  category: 'Moderation',
  aliases: ['banir', 'punir'],
  cooldown: 2,
  async execute(message, args) {
    const member = message.mentions.members.first();

    if (!message.member.hasPermission("BAN_MEMBERS"))
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
          .setDescription('Você não pode banir a si mesmo, seu suicida.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    const isBannable = member.bannable;
    if (!isBannable)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Não foi possível banir esse membro')
          .setDescription('Ele tem um cargo superior ao meu.')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );

    args.shift()
    const reason = args.join(' ');
    const msg = await message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Você realmente deseja banir este usuário?')
        .setDescription(`Reaja a mensagem com ✅ para confirmar o banimento\nMotivo: ${reason ? reason : '¯\\_(ツ)_/¯'}`)
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
      member.ban({
        reason: reason ? reason : '¯\\_(ツ)_/¯'
      });
      msg.delete({ timeout: 100 });

      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Usuário banido')
          .setDescription(`Você acaba de banir \`${member.user.tag} (${member.user.id})\` pelo motivo \`${reason ? reason : '¯\\_(ツ)_/¯'}\``)
          .setColor('GREEN')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    })
  }
}