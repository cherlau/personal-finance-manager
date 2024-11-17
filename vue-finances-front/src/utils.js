const formatError = message => {
  const messageSplited = message.split(':')
  return messageSplited[messageSplited.length - 1].trim()
}

export {
  formatError
}
