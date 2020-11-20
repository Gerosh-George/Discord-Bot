module.exports = {
	name: "auend",
	args: false,
	description: "Moves all user into general voice channel!",
	usage: "!auend",
	aliases: ["aue"],
	execute(message, _args) {
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

		transferPlayers(message.guild);

		message.channel.send("Game has ended!").then((sentMsg) => {
			sentMsg.react("💀");
		});
	},
};

function transferPlayers(guild) {
	const alive_channel = guild.channels.cache.find(
		(c) => c.name === "Alive" && c.type === "voice",
	);

	const dead_channel = guild.channels.cache.find(
		(c) => c.name === "Dead" && c.type === "voice",
	);

	const general_VChannel = guild.channels.cache.find(
		(c) => c.name === "General" && c.type === "voice",
	);

	alive_channel.members.forEach(async (member) => {
		member.voice.setChannel(general_VChannel.id);
	});

	dead_channel.members.forEach(async (member) => {
		member.voice.setChannel(general_VChannel.id);
	});
}
