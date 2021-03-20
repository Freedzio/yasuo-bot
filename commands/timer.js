const timeUnits = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60
}

module.exports = function (msg, args) {
  const tmp = args.join().split('');
  const unit = tmp.pop();
  const amount = parseInt(tmp.filter(i => i !== unit).join());
  console.log(amount)

  setTimeout(() => {
    msg.reply(`czas minął - ${args}`)
  }, amount * timeUnits[unit.toLowerCase()]);

}