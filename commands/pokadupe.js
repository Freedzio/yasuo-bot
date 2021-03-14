const helpers = require('../helpers');

const replies = [
  '( ͡° ͜ʖ ͡°) chciałbyś',
  '( ͡° ͜ʖ ͡°)╭∩╮ nie',
  '( ͠° ͟ʖ ͡°) słucham?',
  '(° ͜ʖ °) dupy to se możesz na Morence zobaczyć',
  '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅] ok, ale nie jestem tani',
  '(\_\_\_\_  .  \_\_\_\_)',
  'moje ciało jest gotowe'
]

module.exports = function (msg, args) {
  // args[0] === 'on' ? active = true && msg.reply('moje ciało jest gotowe')
  //   : args[0] === 'off' ? active = false && msg.reply('koniec psot')
  //     : active &&  msg.reply(helpers.getRandomItem(replies))

  msg.reply(helpers.getRandomItem(replies));
}