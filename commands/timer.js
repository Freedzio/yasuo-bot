const timeUnits = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60
}

module.exports = function (msg, args) {
  const tmp = args.join().split('');
  const unit = args.join().split('').pop();
  const amount = tmp.filter(i => i !== unit).join();

  console.log(tmp, unit)

  setTimeout(() => {
    msg.reply('czas minął')
  }, amount * timeUnits[unit.toLowerCase()]);

}