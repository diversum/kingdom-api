import colors from 'colors'

var url = "mongodb://localhost:27017/kingdom"

let host = process.env.MONGODB_PORT_27017_TCP_ADDR
let port = process.env.MONGODB_PORT_27017_TCP_PORT

if (host && port) {
  url = `mongodb://${host}:${port}/kingdom`

  console.log(`using mongodb hosted on '${host.green}:${port.green}'`)
}

export default {
  url
}
