const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const { Collection } = require("discord.js");
const ffmpeg = require("fluent-ffmpeg");
const SpotifyWebApi = require("spotify-web-api-node");
const Queue = require("./queue");

class Player {
  constructor(client, opts) {
    this.client = client;
    this.startSpotify();
    this.con = this.client.fun.mergeObj(this.config, opts);
    this.queue = new Collection();
  }

  async play(args, opts = {}) {
    let int = opts.int;
    let queue = this.getQueue(int.guild.id) || this.setQueue(int.guild.id);
    queue.play(args, opts);
  }

  setQueue(guildId) {
    this.queue.set(guildId, new Queue());
    return this.getQueue(guildId);
  }

  getQueue(guildId) {
    return this.queue.get(guildId);
  }

  deleteQueue(guildId) {
    if (this.getQueue(guildId)) {
      return this.queue.delete(guildId);
    }
  }

  async search(args, type = "st") {
    let results;
    if (type === "st") {
      let data = await this.spotify.searchTracks(args);
      results = data?.body.tracks.items;
    }

    return results;
  }

  startSpotify() {
    this.spotify = new SpotifyWebApi({
      clientId: "34dda3e648274012aecbba1412cd1154",
      clientSecret: "e8e21a52f254443db08e6356f0dce0b3",
    });

    this.spotify.clientCredentialsGrant().then(
      (data) => {
        this.spotify.setAccessToken(data.body["access_token"]);
      },
      function (err) {
        console.log(
          "Something went wrong when retrieving an access token",
          err
        );
      }
    );
  }

  get config() {
    return {
      defaultSearch: "st",
    };
  }
}

module.exports = Player;
