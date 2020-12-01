const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'vp',
  description: 'Veja sua quantidade de vps',
  aliases: ['valespoints', 'valepoints', 'valepoint', 'vps'],
  usage: '',
  cooldown: 5,
  permission: '*',

  async execute(message, args) {

    let user = message.mentions.users.first() || message.author;
        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

    const embed = new MessageEmbed()
      .setTitle('Seus VPs')
      .setDescription(`**\`$${bal}\`**`)
      .setColor('GREEN')
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    message.channel.send(embed);
  }
}
