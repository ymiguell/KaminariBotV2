const Discord = require('discord.js');

module.exports = {
    name: 'convite',
    description: 'Convide o bot para o seu servidor!',
    aliases: ['invite', 'convites', 'invites'],
    usage: '',
    cooldown: 5,
    permission: '*',
    execute(message, args) {
        var url = `https://discord.com/oauth2/authorize?client_id=762667748651827211&permissions=8&scope=bot`
        var embed = new Discord.MessageEmbed()
            .setTitle('Me convide para o seu servidor!')
            .setDescription(`Clique no botão ao lado: [LINK](${url})`)
            .setFooter('Acesse nossa página para mais informações:\nhttps://kaminari.kallel.tech/')
            .setColor('#000000').setThumbnail(message.client.user.displayAvatarURL())

        message.channel.send(embed);
    }
}
