module.exports = function (msg, args) {
  console.log(args)
  const unit = args.join().split('').pop()
  console.log(unit)
  msg.reply(unit.toString())
}