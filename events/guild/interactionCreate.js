const { handleSlash } = require("../../util/handlers/scmdHandler2")

module.exports = async(client, interaction) => {
  await handleSlash(client, interaction)
}