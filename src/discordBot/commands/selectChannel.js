const { MessageActionRow, MessageSelectMenu, VoiceChannel } = require("discord.js");

async function fetchChannels(interaction) {
    const channelsMap = await interaction.guild.channels.fetch()
    return Array.from(channelsMap)
        .map(([key, value]) => value)
        .filter(channel => channel instanceof VoiceChannel);
}


async function fetchChannelsList(interaction, togetherCode) {
    const channels = await fetchChannels(interaction);
    const options = channels.map(channel => {
        return {
            label: channel.name,
            description: channel.name,
            value: JSON.stringify({
                togetherCode: togetherCode,
                channelId: channel.id
            })
        }
    });
    const row = new MessageActionRow().addComponents(new MessageSelectMenu()
        .setCustomId("selectVoiceChannel")
        .setPlaceholder("Nothing selected")
        .addOptions(options));
    await interaction.reply({
        content: "Select Voice Channel",
        components: [row],
    });
}

module.exports = { fetchChannelsList };