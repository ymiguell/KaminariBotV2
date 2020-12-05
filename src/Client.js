const Discord = require('discord.js');

module.exports = class extends Discord.Client {
  constructor() {
    super({ disableMentions: 'everyone' });
    this.config = {
      defaultPrefix: '.',
      color: '#03D3FC',
      owners: ['396110783680872449'],
      token: 'coloque o seu token aqui',
    }

    this.commands = new Discord.Collection();
    this.queue = new Map();
  }
}
