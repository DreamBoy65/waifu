//Cmd
module.exports = {
  name: "",
  aliases: [],
  group: "",
  description: "",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: [],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: false,
  run: async(client, message, args) => {
    try {
      
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e.stack).bgred)
    }
  }
}

//Slash
module.exports = {
  name: "",
  description: "",
  cooldown: {
    time: 5000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  run: async(client, interaction) => {
    try {
      
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgred)
    }
  }
}

/*
options: [
		//{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
		//{"String": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getString("ping_amount")
		//{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
		//{"Channel": { name: "what_channel", description: "To Ping a Channel lol", required: false }}, //to use in the code: interacton.getChannel("what_channel")
		//{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
		//{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
		{"StringChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", "botping"], ["Discord Api", "api"]] }},
  ],
  */