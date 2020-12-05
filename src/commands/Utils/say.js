module.exports = {
  name: 'say',
  description: 'Faça o bot escrever no chat',
  aliases: ['falar', 'escrever'],
  usage: '<mensagem>',
  category: 'Utils',
  cooldown: 0,
  async execute(message, args) {
    const memberPermissions = message.channel.permissionsFor(message.member);
    if (!memberPermissions.has('MANAGE_MESSAGES'))
      return message.channel.send(':x: **|** Você não tem a permissão de gerenciar mensagens.');
    if (!args.length)
      return message.channel.send(':x: **|** Qual a mensagem? Uso: `say <mensagem>`');

    message.delete();
    message.channel.send(args.join(' '));
  }
}