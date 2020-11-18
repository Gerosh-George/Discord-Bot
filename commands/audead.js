module.exports = {
	name: "audead",
	description: "Moves dead player to dead channel",
	args: true,
	aliases: ["aud"],
	usage: "<user tag>",
	execute(message, args) {
		let dead_channel = message.guild.channels.cache.find(
			(c) => c.name === "Dead",
		);

		if (!dead_channel) {
			message.channel
				.send(
					"There is no active game available! Send `!austart` to start a new game.",
				)
				.then((sentMsg) => {
					sentMsg.react("🤗");
				});
			return;
		}

		if (!message.mentions.users.size) {
			return message.reply("You need to tag them dear!");
		}

		const taggedUsers = message.mentions.users;
		taggedUsers.forEach((user) => {
			message.guild.member(user.id).voice.setChannel(dead_channel.id);
		});
	},
};
