module.exports = {
	name: "aurestart",
	args: false,
	description: "Restarts the game by moving all players in Alive voice channel",
	usage: "!aurestart",
	aliases: ["aur"],
	execute(message, args) {
		let alive_channel = message.guild.channels.cache.find(
			(c) => c.name === "Alive",
		);
		let dead_channel = message.guild.channels.cache.find(
			(c) => c.name === "Dead",
		);

		if (!alive_channel && !dead_channel) {
			message.channel
				.send(
					"There is no active game available! Send `!austart` to start a new game.",
				)
				.then((sentMsg) => {
					sentMsg.react("🤗");
				});
			return;
		}

		for (const [memberId, member] of dead_channel.members) {
			member.voice.setChannel(alive_channel.id);
		}

		message.channel.send("Game has been restarted!").then((sentMsg) => {
			sentMsg.react("🤫");
		});
	},
};
