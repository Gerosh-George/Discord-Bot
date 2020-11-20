module.exports = {
	name: "auclear",
	args: false,
	aliases: ["auc"],
	description: "Deletes the channels created by austart command",
	usage: "!auclear",
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

		if (alive_channel.members.size > 0 || dead_channel.members.size > 0) {
			return message.channel
				.send(
					"Some users are active on the channels. Send !auend first and then try again!",
				)
				.then((sentMsg) => {
					sentMsg.react("😶");
				});
		}

		alive_channel.delete();
		dead_channel.delete();
	},
};
