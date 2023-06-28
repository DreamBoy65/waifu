const {
  Client
} = require(`@shadowgarden/djs-framebot`)
const config = require("./config")
const client = new Client(config)
const Player = require("./player/index")
const SoundBoard = require("djs-soundboard")
client.sound = new SoundBoard()
client.player = new Player(client)
global.cl = client

client.start()