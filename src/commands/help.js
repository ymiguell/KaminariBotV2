const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List of commands',
  aliases: ['commands', 'ajuda'],
  usage: '[command]',
  category: 'Utils',
  cooldown: 5,
  permission: '*',
  async execute(message, args) {
    if (!args[0]) {
      const utilsCommands = [], modCommands = [], funCommands = [];

      message.client.commands.forEach(c => {
        switch (c.category) {
          case 'Moderation':
            modCommands.push(`\`${c.name} ${c.usage}\` ${c.description}`);
            break;
          case 'Fun':
            funCommands.push(`\`${c.name} ${c.usage}\` ${c.description}`)
            break;
          default:
            utilsCommands.push(`\`${c.name} ${c.usage}\` ${c.description}`)
            break;
        }
      });

      console.log(utilsCommands, modCommands, funCommands)

      const embed = new MessageEmbed()
        .setAuthor(`${message.client.user.username} commands`, message.client.user.displayAvatarURL({ format: 'png', size: 128 }))
        .addFields([
          {
            name: 'Moderação',
            value: modCommands.join('\n')
          },
          {
            name: 'Diversão',
            value: funCommands.join('\n')
          },
          {
            name: 'Utilidades',
            value: utilsCommands.join('\n')
          }
        ])
        .setColor(message.client.config.color)
        .setFooter(
          `${message.author.tag} | <required> [optional]`,
          message.author.displayAvatarURL({ dynamic: true })
        );

      message.author.send(embed)
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply('Enviei meus comandos em seu privado!');
        })
        .catch(error => {
          console.error(`Não foi possível enviar uma DM ${message.author.tag}.\n`, error);
          message.reply('Parece que não posso enviar uma DM para você! Você está com a DM desativada?');
        });
    } else {
      const info = message.client.commands.get(args[0]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
      if (!info) return message.channel.send(
        new MessageEmbed()
          .setDescription(`Esse comando não foi encontrado, tente usar \`${message.client.config.prefix}help\``)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
          .setColor('RED')
      );

      const embedInfo = new MessageEmbed()
        .addField('Usage', `${message.client.config.prefix}${info.name} ${info.usage}`)
        .addField('Description', info.description)
        .addField('Need permission', info.permission)
        .addField('Aliases', info.aliases.join(', '))
        .setColor(message.client.config.color)
        .setFooter(message.author.tag + ' | <required> [optional]', message.author.displayAvatarURL({ dynamic: true }))

      message.channel.send(embedInfo);
    }
  }
}
