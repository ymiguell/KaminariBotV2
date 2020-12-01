const db = require('quick.db');

module.exports = {
  async getPrefix(guild, client) {
    let prefix = await db.get(`guild_${guild.id}.prefix`);
    if (!prefix) prefix = client.config.defaultPrefix;
    return prefix;
  }
}