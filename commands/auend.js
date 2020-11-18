module.exports = {
	name: "auend",
	args: false,
	description: "Removes the channels created by austart command",
	usage: "!auend",
	aliases: ["aue"],
	async execute(message, _args) {
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

		await transferPlayers(message.guild);

		message.channel.send("Game has ended!").then((sentMsg) => {
			sentMsg.react("💀");
		});

		if (alive_channel) {
			console.log("In alive delete");
			alive_channel
				.delete()
				.catch((err) => console.error("Error in deleting alive"));
		}

		if (dead_channel) {
			console.log("In dead delete");
			dead_channel
				.delete()
				.catch((err) => console.error("Error in deleting dead"));
		}
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

	return new Promise((resolve, reject) => {
		alive_channel.members.forEach((member) => {
			console.log("In alive move");
			member.voice
				.setChannel(general_VChannel.id)
				.then((res) => console.log("Worked"))
				.catch((err) =>
					console.error("Error in moving alive\n ------------ \n", err),
				);
		});

		dead_channel.members.forEach((member) => {
			console.log("In dead move");
			member.voice
				.setChannel(general_VChannel.id)
				.then((res) => console.log("Worked"))
				.catch((err) => {
					console.error("Error in moving dead\n ------------ \n", err);
				});
		});
		resolve(true);
	});
}
