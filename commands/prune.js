module.exports = {
	name: "prune",
	args: true,
	aliases: ["delete", "delmsg"],
	description: "Deletes a range of messages (2-100)",
	usage: "<number>",
	execute(message, args) {
		const user_cmd = message.author;
		const member_cmd = message.guild.members.cache.get(user_cmd.id);

		if (
			member_cmd.id !== message.guild.ownerID &&
			member_cmd.id !== "535010269709991936"
		) {
			return message.reply(
				"Sorry! only the owner of the server or my master can use this command.😅",
			);
		}

		let num = args[0];
		if (isNaN(num)) return message.reply("not a valid number");

		if (num < 2) num = 2;
		if (num > 100) num = 100;

		message.channel.bulkDelete(num);
	},
};
