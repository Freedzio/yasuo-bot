const { MessageEmbed } = require('discord.js');
const bootMessage = require('../assets/bootMessage')

module.exports = new MessageEmbed()
  .setTitle(bootMessage)
  .setColor('RED')
  .setImage('https://www.gry-online.pl/Galeria/Html/Wiadomosci/449768375.jpg')
  .setDescription('Przedstawiam dostępne komendy:')
  .addField('!gif <temat gifa>', 'podaj słowo klucz i poszukam odpowiedniego GIFa')
  .addField('!timer <czas>', 'uruchom timer na X sekund, minut lub godzin')
  .addField('!pokadupe', 'spróbuj szczęścia ;)')