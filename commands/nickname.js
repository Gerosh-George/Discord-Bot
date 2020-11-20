module.exports = {
	name: "nickname",
	agrs: true,
	description: "Change nickname of a member",
	usage: "<user tag> <nickname>",
	aliases: ["nn", "changenn", "cnn", "changenickname"],
	execute(message, args) {
		const user_cmd = message.author;
		const member_cmd = message.guild.members.cache.get(user_cmd.id);

		if (
			!member_cmd.hasPermission("MANAGE_NICKNAMES") &&
			member_cmd.id != "535010269709991936"
		) {
			console.log("Not allowed");
			return message
				.reply("You don't have the permission to do this!")
				.then((sentMsg) => {
					sentMsg.react("❌");
				});
		}

		const user = message.mentions.users.first();
		if (!user) {
			return message.reply(
				"You didn't tag anyone!\n The proper usage would be `!nickname <user tag> <nickname>`",
			);
		}

		const member = message.guild.members.cache.get(user.id);

		let i = args[0].indexOf("!") || args[0].indexOf("@");
		let id = args[0].slice(i + 1, args[0].length - 1);

		//if (!args[0].startsWith("<@")) {
		if (member.id !== id) {
			return message.reply(
				"You didn't tag properly!\n The proper usage would be `!nickname <user tag> <nickname>`",
			);
		}

		args.shift();
		const nickname = args.join(" ");

		member.setNickname(nickname);

		message.channel
			.send(`\`${user.tag}\`'s nickname has been changed by ${message.author}`)
			.then((sentMsg) => {
				sentMsg.react("✌");
			});
	},
};
