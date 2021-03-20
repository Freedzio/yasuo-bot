const timeUnits = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60
}

module.exports = function (msg, args) {
  const tmp = args.join().split('');
  console.log('tmp', tmp)
  const unit = tmp.pop();
  console.log('tmp', tmp)
  const amount = parseInt(tmp.filter(i => i !== unit).join());
  console.log(amount)

  setTimeout(() => {
    msg.reply(`czas minął - ${args}`)
  }, amount * timeUnits[unit.toLowerCase()]);

}