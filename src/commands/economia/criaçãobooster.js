const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "criaçãobooster",
    description: "Criar para ganhar VPs(apenas para boosters)",
    category: 'Economy',
    aliases: ['criaçaobooster', 'criacãobooster', 'criacaobooster'],
    cooldown: 2,

  async execute(message, args) {

    if (!message.member.roles.cache.get('772869271767613440'))
  return message.channel.send('Você não deu boost no servidor, logo você não pode utilizar esse comando.');
  
    let user = message.author;
    let timeout = 604800000;
    let author = await db.fetch(`boostou_${message.guild.id}_${user.id}`);

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));
      return message.channel.send(`Você não pode trabalhar novamente em ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s`)
    } else {
      let amount = Math.floor(Math.random() * 300 + 1);
      if (message.member.roles.cache.get('772869271767613440')) amount = parseInt(amount * 2.0);

      db.add(`money_${message.guild.id}_${user.id}`, amount)
      db.set(`boostou_${message.guild.id}_${user.id}`, Date.now())

      message.channel.send(`${user}, 
você boostou e ganhou ${amount} VP`)
    }
  }
}