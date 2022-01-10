const { Client, Collection, Intents } = require("discord.js")
const CommandManager = require(`../struct/commands/Manager`);
const consoleUtil = require(`../util/console`);
const { readdirSync } = require('fs');
const { join } = require('path');
const processEvents = require(`../util/processEvents`);
const Mongoose = require("../struct/mongoose")
const colors = require('colors');

class Bot extends Client {
    constructor () {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ],
            allowedMentions: {
                parse: ["users"]
            },
        })
            
        this.emoji = require("../config/emoji")
        this.config = require("../config/config")
        this.commands = new CommandManager(this)
        this.slashCommands = new Collection()
        this.resolvers = require("../util/resolvers")

        require("../util/extenders")
        this.database = null

        if (this.config.database?.enable === true){
            this.database = new Mongoose(this, this.config.database);
        }
    }
    
    /**
     * commands
     */
 
    loadCommands(settings = {}){
    
        let log = true;
        const bypass = Boolean(settings.bypass);

    if (typeof settings.log === 'boolean'){
      log = settings.log;
    };

    function check(){
      if (!bypass){ process.exit(); } else { return true; };
    };

    if (typeof settings.parent !== 'string'){
      if (log) consoleUtil.warn('Command parent folder not set, reverting to default directory \'commands\'', '[BOT WARN]');
      settings.parent = 'commands';
    };

    this.commands.parent = settings.parent;

    if (!settings.paths?.length){
      settings['paths'] = ['']
    };

    if (!Array.isArray(settings.paths)){
      if (log) { consoleUtil.error(`INVALID_COMMAND_PATH: No Paths to load commands from.`, 'path'); };
      if (check()) return;
    };

    if (!(this.commands instanceof CommandManager)){
      this.commands = new CommandManager({ groups: settings.groups });
    };

    for (let dir of settings.paths){
      if (Array.isArray(dir)){
        dir = join(...dir);
      };

      let files = null;

      try {
        files = readdirSync(join(process.cwd(), settings.parent, dir))
        .filter(f => f.split('.').pop() === 'js');
      } catch {
        if (log){
          consoleUtil.error(`DIR_NOT_FOUND: Cannot resolve path '${join(process.cwd(), settings.parent, dir)}'`, 'dir');
        };
        if (check()) continue;
      };

      for (const file of files){
        this.commands.add(require(join(process.cwd(), settings.parent, dir, file)), { log, bypass });
      };
    };

    if (log){
      consoleUtil.success(`Loaded ${this.commands.size} commands!`)
    };
  };
  
  /**
   * Load slashCommands
   */
   loadSlash(settings = {}) {
     require("../util/handlers/scmdHandler")(this)
   }

  /**
   * Load event files to this client instance
   * @param {LoadEventSettings} settings The settings for loading the events
   * @returns {void}
   */
  loadEvents(settings = {}){

    const log = settings.log && typeof settings.log === 'boolean';
    const bypass = settings.bypass && typeof settings.bypass === 'boolean';

    function check(){
      if (!bypass){ process.exit(); } else { return true; };
    };

    if (typeof settings.parent !== 'string'){
      if (log){
         consoleUtil.warn('Events parent folder not set, reverting to default directory \'events\'');
      } else {
        // Do nothing...
      };
      settings.parent = 'events';
    };

    let files = null;

    try {
      const load = (dirs) => {
      const events = readdirSync(`./${settings.parent}/${dirs}/`).filter((d) => d.endsWith("js"));

  for (const file of events) {
      const evt = require(`../events/${dirs}/${file}`);
      const eName = file.split(".")[0];
      this.on(eName, evt.bind(null, this));
  }
        consoleUtil.success(`Loaded ${events.length} events of ${dirs}.`)
 };

     settings.dirs?.forEach(x => load(x))

    } catch (e) {
     consoleUtil.warn("Error while loading events. ")
        console.log(e)
   }
      
  }

  //Load Events
  listentoProcessEvents(events = [], config = {}){
    if (!Array.isArray(events)){
      return;
    };

    if (typeof config !== 'object'){
      config = {};
    };

    for (const event of events){
      process.on(event, (...args) => {
        if (config.ignore && typeof config.ignore === 'boolean'){
          return;
        } else {
          return processEvents(event, args, this);
        };
      });
    };
  };
}

module.exports = Bot