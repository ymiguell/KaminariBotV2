# KaminariBot v2.0.7-dev

A simple bot for Discord, using discord.js

## License

Mozilla Public License 2.0

| Permissions | Limitations | Conditions |
|-|-|-|
| ✔️ Commercial use | ❌ Liability | ℹ️ Disclose source |
| ✔️ Modification | ❌ Trademark use | ℹ️ License and copyright notice |
| ✔️ Distribution | ❌ Warranty | ℹ️ Same license (file) |
| ✔️ Patent use | | |
| ✔️ Private use | | |

## ./src/Client.js

```js
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
```

## Database Keys

### guild_{guild.id}

```js
{
  prefix: string,
  welcomeChannel: string,
}
```

### member_{guild.id}_{user.id}

```js
{
  warnings: number,
  level: number,
  XP: number
}
```
