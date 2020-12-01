const Discord = require('discord.js');

module.exports = class extends Discord.Client {
  constructor() {
    super({ disableMentions: 'everyone' });
    this.config = {
      defaultPrefix: 'k!',
      color: '#03D3FC',
      owners: ['396110783680872449'],
      token: 'segue eu la na twitch kkkk https://www.twitch.tv/ymiguell',
    }

    this.commands = new Discord.Collection();
    this.queue = new Map();
  }
}