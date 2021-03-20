module.exports = function (msg, args) {
  const unit = args.split().pop()
  msg.reply(unit)
}