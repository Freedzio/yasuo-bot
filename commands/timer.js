module.exports = function (msg, args) {
  console.log(args)
  const unit = args.toString().split().pop()
  console.log(unit)
  msg.reply(unit.toString())
}