const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const dl = require("play-dl");
const ffmpeg = require("fluent-ffmpeg");
const { EventEmitter } = require("events");

class Queue extends EventEmitter {
  constructor(client, opts = {}) {
    super();
    this.client = client;
    this.int = opts.int;

    this.player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });
  }

  async play(args, opts) {
    this.join(opts.channel);
    let song = this.search(args);
    console.log(song);
  }

  join(channel) {
    this.connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    this.connection.subscribe(this.player);
  }

  async search(args, limit = 1) {
    let sp_data = await dl.spotify(args);

    let searched = await dl.search(`${sp_data.name}`, {
      limit: limit,
    });

    return searched.length > 0 ? searched : searched[0];
  }
}

module.exports = Queue;
