const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: 'reembolsar',
  description: 'Você vende o seu cargo de região pela metade do preço.',
  usage: '',
  category: 'Vale',
  aliases: ['removercargo', 'reembolso', 'vendercargo'],
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

    //Águas de Sentina
    message.member.roles.remove(IDs.MarujodeAguasdeSentina)
    if (!message.member.roles.cache.some(r => ['781007947655544832'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.MarujodeAguasdeSentina)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo das Águas de Sentina com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#591d01')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Pitlover  
    message.member.roles.remove(IDs.CidadadoDePitlover)
    if (!message.member.roles.cache.some(r => ['781007805561569341'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.CidadadoDePitlover)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Cidadão de Pitlover com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#015959')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Mago de Ixtal  
    message.member.roles.remove(IDs.MagodeIxtal)
    if (!message.member.roles.cache.some(r => ['781007717895897098'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.MagodeIxtal)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Mago de Ixtal com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#eb0292')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Mestre Ioniano
    message.member.roles.remove(IDs.MestreIoniano)
    if (!message.member.roles.cache.some(r => ['781007539450019891'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.MestreIoniano)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Mestre Ioniano com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#35b045')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Baderneiro de Zaun
    message.member.roles.remove(IDs.BaderneiroDeZaun)
    if (!message.member.roles.cache.some(r => ['781007633535598592'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.BaderneiroDeZaun)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Baderneiro De Zaun com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#017510')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Glacinata
    message.member.roles.remove(IDs.Glacinata)
    if (!message.member.roles.cache.some(r => ['781007454719836160'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.Glacinata)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Glacinata com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#0006ba')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Fantasma Das Ilhas Das Sombras
    message.member.roles.remove(IDs.FantasmaDasIlhasDasSombras)
    if (!message.member.roles.cache.some(r => ['781007307579850793'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.FantasmaDasIlhasDasSombras)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Fantasma Das Ilhas Das Sombras com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#2b5750')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Protetor De Targon
    message.member.roles.remove(IDs.ProtetorDeTargon)
    if (!message.member.roles.cache.some(r => ['781007361737359411'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.ProtetorDeTargon)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Protetor De Targon com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#95d9de')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Sobrevivente do Vazio
    message.member.roles.remove(IDs.SobreviventedoVazio)
    if (!message.member.roles.cache.some(r => ['781007179595251733'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.SobreviventedoVazio)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Sobrevivente do Vazio com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#5c0fbf')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Conquistador Noxiano
    message.member.roles.remove(IDs.ConquistadorNoxiano)
    if (!message.member.roles.cache.some(r => ['781007122195415041'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.ConquistadorNoxiano)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Conquistador Noxiano com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#ff4242')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Explorador de Shurima
    message.member.roles.remove(IDs.ExploradorDeShurima)
    if (!message.member.roles.cache.some(r => ['781007034543112203'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.ExploradorDeShurima)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Explorador de Shurima com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#ffd500')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Realeza Demaciana
    message.member.roles.remove(IDs.RealezaDemaciana)
    if (!message.member.roles.cache.some(r => ['781006878305026078'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.RealezaDemaciana)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Realeza Demaciana com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#a4ff08')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

    //Um Yordle
    message.member.roles.remove(IDs.UmYordle)
    if (!message.member.roles.cache.some(r => ['781006659072950312'].includes(r.id))) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':x: Erro ao tentar reembolsar.')
        .setDescription('Você não tem nenhum cargo de região!')
        .setColor('RED')
    );
    if (message.member.roles.cache.has(IDs.UmYordle)) return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(':white_check_mark: Você reembolsou o cargo Um Yordle com sucesso!')
        .setDescription('Obs: Apenas 150 VPs retornaram para sua conta.')
        .setColor('#d0f2d9')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    );
    db.add(`money_${message.guild.id}_${message.author.id}`, '150');

  }
}
