module.exports = function (msg, args) {
  const unit = Array.from(args).pop()
  msg.reply(unit)
}