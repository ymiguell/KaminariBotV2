module.exports = {
  name: 'exec',
  description: '?',
  aliases: ['eval'],
  usage: '<code>',
  category: 'Utils',
  cooldown: 0,
  async execute(message, args) {
    if (!message.client.config.owners.includes(message.author.id)) return message.channel.send(`🚫 **You do not have permission**`);
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(evaled, { code: "xl" });
    } catch (err) {
      message.channel.send(err, { code: 'console' }).then(m => m.react('🆘'));
    }
  }
}