const timeUnits = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60
}

module.exports = function (msg, args) {
  if (args.length === 1) {

    const tmp = args.join().split('');
    const unit = tmp.pop().toLowerCase();

    if (Object.keys(timeUnits).includes(unit)) {
      const amount = parseInt(tmp.join(''));
      msg.reply(`Timer uruchomiony na ${args}`)

      setTimeout(() => {
        msg.reply(`czas minął - ${args}`)
      }, amount * timeUnits[unit]);

    } else {
      msg.reply('nieprawidłowa jednostka czasu - wybierz s, m lub h')
    }
  }
}