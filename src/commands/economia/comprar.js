const db = require('quick.db');
const Discord = require('discord.js');
const { execute } = require('./editvp');

module.exports = {
  name: 'comprar',
  description: 'Permite comprar algum item da loja.',
  usage: '<item>',
  category: 'Economy',
  aliases: ['buy'],
  cooldown: 2,

  async execute(message, args) {
    let purchase = args.join(" ");
    if (!purchase) message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Uso do comando incorreto')
        .setDescription('Mencione o item que você quer comprar!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    let items = await db.fetch(`inventory_${message.guild.id}_${message.author.id}`, { items: [] });
    let amount = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

    if (purchase === 'Item 1') {
      if (amount < 150000) return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Erro ao confirmar compra :x:')
          .setDescription('Você não tem VPs suficientes!')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
      db.subtract(`money_${message.guild.id}_${message.author.id}`, 150000);
      db.push(`inventory_${message.guild.id}_${message.author.id}`, "Item 1");
      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Sucesso ao confirmar compra :white_check_mark:')
          .setDescription('Você comprou o Item 1 com sucesso, \nmostre seu inventario para um staff!')
          .setColor('GREEN')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    }
    if (purchase === 'Item 2') {
      if (amount < 50000) return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Erro ao confirmar compra :x:')
          .setDescription('Você não tem VPs suficientes!')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
      db.subtract(`money_${message.guild.id}_${message.author.id}`, 50000);
      db.push(`inventory_${message.guild.id}_${message.author.id}`, "Item 2");
      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Sucesso ao confirmar compra :white_check_mark:')
          .setDescription('Você comprou o Item 2 com sucesso, \nmostre seu inventario para um staff!')
          .setColor('GREEN')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    }
    if (purchase === 'Item 3') {
      if (amount < 45000) return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Erro ao confirmar compra :x:')
          .setDescription('Você não tem VPs suficientes!')
          .setColor('RED')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
      db.subtract(`money_${message.guild.id}_${message.author.id}`, 45000);
      db.push(`inventory_${message.guild.id}_${message.author.id}`, "Item 3");
      message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Sucesso ao confirmar compra :white_check_mark:')
          .setDescription('Você comprou o Item 3 com sucesso, \nmostre seu inventario para um staff!')
          .setColor('GREEN')
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      );
    }
  }
}