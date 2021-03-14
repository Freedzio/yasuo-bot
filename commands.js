const fs = require('fs');
const path = require('path');

let commands = {};

function getAllCommands() {
  fs.readdir(path.join(__dirname, 'commands'), (err, files) => {
    files.forEach(fileName => {
      const cm = fileName.replace('.js', '')
      commands = {
        ...commands,
        [cm]: require(`./commands/${cm}`)
      }
    })
  })
}

getAllCommands();

module.exports = function (msg) {
  if (process.env.DEBUG === 'true' ? msg.channel.id === process.env.BOT_CHANNEL_ID : true) {
    let tokens = msg.content.split(" ");
    let command = tokens.shift();

    if (command.charAt(0) === "!") {
      command = command.substring(1);

      const timeOfCommand = new Date();
      
      if (Object.keys(commands).includes(command)) {
        commands[command](msg, tokens);
        console.log(`${timeOfCommand}: ${msg.author.username} said ${command} with arguments ${tokens}`);
      } else {
        console.log(`${timeOfCommand}: I dont know that command - ${command}`);
        msg.reply(`Nie znam takiej komendy - ${command}`)
      }
    }
  }
};
