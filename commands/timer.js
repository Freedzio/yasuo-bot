module.exports = function (msg, args) {
  console.log(args)
  const unit = args.split().pop()
  console.log(unit)
  msg.reply(unit.toString())
}