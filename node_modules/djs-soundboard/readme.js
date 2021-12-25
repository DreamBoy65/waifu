const fs = require("fs")
let array = []

fs.readdirSync("./src/").forEach(dir => {
  const files = fs.readdirSync(`./src/${dir}/`).filter(f => f.endsWith(".mp4") || f.endsWith(".mp3"))
  
  array.push({
    category: dir,
    files: []
  })
  
  let Arr = array.find(c => c.category === dir)
  
  files.forEach(file => {
    Arr.files.push(`+ - ${file.split(".")[0]}`)
  })
})

fs.writeFileSync("readme.MD", [
  `<p ="center">
   <img src="https://img.shields.io/npm/dt/djs-soundboard?style=for-the-badge">
   <img src="https://img.shields.io/npm/v/djs-soundboard?style=for-the-badge">
   <a href = "https://discord.gg/7UQaVPBQka" > <img src="https://img.shields.io/badge/Server-Invite-brightgreen" href = "">
   </a>
</p>`,
   "",
   "# Example",
   "",
   "```js",
   'const SoundBoard = require("djs-soundboard")',
   "",
   "let sound = new SoundBoard",
   "",
   'let channel = message.member.voice.channel // required*',
   "",
   'sound.play(channel, "bruh") //Sound',
   '```',
   "",
   '# Sounds:',
   array.map(c => {
     return `\n\n+ ${c.category.toUpperCase()}\n${c.files.join("\n")}`
   }),
   "",
   `Last Updated: ${new Date()}`
].join("\n"))