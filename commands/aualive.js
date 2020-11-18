module.exports = {
	name: "aualive",
	args: true,
	aliases: ["aua"],
	description: "Moving user from dead to alive channel coz of your mistake😠",
	usage: "<user tag>",
	execute(message, args) {
		let alive_channel = message.guild.channels.cache.find(
			(c) => c.name === "Alive",
		);

		if (!alive_channel) {
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
			message.guild.member(user.id).voice.setChannel(alive_channel.id);
		});
	},
};
