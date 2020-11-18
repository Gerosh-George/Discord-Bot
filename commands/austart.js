module.exports = {
	name: "austart",
	args: false,
	description: "Creates the voice channels for the among us game",
	usage: "!austart",
	aliases:["aus"],
	execute(message, args) {
		let alive_channel = message.guild.channels.cache.find(
			(c) => c.name === "Alive",
		);
		let dead_channel = message.guild.channels.cache.find(
			(c) => c.name === "Dead",
		);

		if (alive_channel && dead_channel) {
			transferPlayer(message.guild);
			return message.channel.send("The game is already active");
		}

		try {
			if (!alive_channel) {
				message.guild.channels
					.create("Alive", {
						type: "voice",
					})
					.then((channel) => {
						let categoryID = message.guild.channels.cache.find(
							(c) => c.name == "Voice Channels" && c.type == "category",
						).id;

						channel.setParent(categoryID);
						channel.setUserLimit(10);
						transferPlayer(message.guild)
					});
			}

			if (!dead_channel) {
				message.guild.channels
					.create("Dead", {
						type: "voice",
					})
					.then((channel) => {
						let categoryID = message.guild.channels.cache.find(
							(c) => c.name == "Voice Channels" && c.type == "category",
						).id;

						channel.setParent(categoryID);
						channel.setUserLimit(10);
					});
			}
			
			message.channel.send("SHHH!🤫 The Game is ready!");

		} catch (err) {
			message.channel.send(
				"Some error in creating the voice channels! (Check Permissions)",
			);
			console.error(err);
		}
	},
};

function transferPlayer(guild) {
	let alive_channel = guild.channels.cache.find((c) => c.name === "Alive");

	const general_VChannel = guild.channels.cache.find(
		(c) => c.name === "General" && c.type === "voice",
	);

	for (const [memberid, member] of general_VChannel.members) {
		if (alive_channel.full) break;
		member.voice.setChannel(alive_channel.id);
	}
}
