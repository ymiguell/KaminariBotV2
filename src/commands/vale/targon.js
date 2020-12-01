const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: 'targon',
  description: 'Você compra um cargo com determinada contia de VPs',
  usage: '<região>',
  category: 'Economy',
  aliases: ['protetordetargon', 'protetortargon'],
  cooldown: 2,

  async execute(message, args) {
    const IDs = {
      MarujodeAguasdeSentina: '781007947655544832',
      CidadadoDePitlover: '781007805561569341',
      MagodeIxtal: '781007717895897098',
      MestreIoniano: '781007539450019891',
      BaderneiroDeZaun: '781007633535598592',
      Glacinata: '781007454719836160',
      ProtetorDeTargon: '781007361737359411',
      FantasmaDasIlhasDasSombras: '781007307579850793',
      SobreviventedoVazio: '781007179595251733',
      ConquistadorNoxiano: '781007122195415041',
      ExploradorDeShurima: '781007034543112203',
      RealezaDemaciana: '781006878305026078',
      UmYordle: '781006659072950312'
    };

    const balance = await db.get(`money_${message.guild.id}_${message.author.id}`);

    if (message.guild.id !== '566806942207574033') return;
    if (message.member.roles.cache.has(IDs.MarujodeAguasdeSentina)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Marujo das Águas de Sentina!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.CidadadoDePitlover)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Cidadão de Pitlover!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.MagodeIxtal)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Mago de Ixtal!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.MestreIoniano)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Mestre Ioniano!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.BaderneiroDeZaun)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Baderneiro de Zaun!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.Glacinata)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Glacinata!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.ProtetorDeTargon)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Proteto de Targon!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.FantasmaDasIlhasDasSombras)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Fanstama das Ilhas das Sombras!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.SobreviventedoVazio)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Sobrevivente do Vazio!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.ConquistadorNoxiano)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Conquistador Noxiano!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.ExploradorDeShurima)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Explorador De Shurima!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.RealezaDemaciana)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo Realeza Demaciana!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    if (message.member.roles.cache.has(IDs.UmYordle)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao executar o comando.')
        .setDescription('Você já possui o cargo UmYordle!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );

    if (balance < 300) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Erro ao confirmar compra :x:')
        .setDescription('Você não tem VPs suficientes!')
        .setColor('RED')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    message.member.roles.add(IDs.ProtetorDeTargon)
    db.subtract(`money_${message.guild.id}_${message.author.id}`, '300')
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle('Cargo setado com sucesso!⚔️')
        .setDescription('Obs: 300VPs foram removidos da sua conta!')
        .setColor('#97752C')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
  }
}