const prefix = "!";
const Discord = require("../node_modules/discord.js");

module.exports = {
	name: "help",
	args: true,
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands", "cmd", "command"],
	usage: "<cmd name>",
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			const helpEmbed = createHelpEmbed(commands);
			return message.channel.send(helpEmbed).then((sentMsg) => {
				sentMsg.react("☑");
			});
		} else {
			const infoEmbed = cmdInfoEmbed(commands, args, message);
			if (infoEmbed !== null)
				return message.channel.send(infoEmbed).then((sentMsg) => {
					sentMsg.react("✅");
				});
		}
	},
};

function createHelpEmbed(commands) {
	var description =
		"I can help you with your Among Us Game 😄\nList of useful commands:\n";

	commands.forEach((command) => {
		if (command.name !== "help" && command.name !== "reload")
			description += `\`${prefix}${command.name}\` - ${command.description}\n`;
	});

	const helpEmbed = new Discord.MessageEmbed()
		.setColor("#0099FF")
		.setTitle("Help Manual")
		.setDescription(`${description}`);

	helpEmbed.addField("\u200b", "\u200b");

	helpEmbed.addField(
		`You can send \`${prefix}help [command name]\` to get info on a specific command!`,
		"\u200b",
	);

	return helpEmbed;
}

function cmdInfoEmbed(commands, args, message) {
	const name = args[0].toLowerCase();
	const command =
		commands.get(name) ||
		commands.find((c) => c.aliases && c.aliases.includes(name));

	if (!command) {
		message.reply("That command is not valid!");
		return null;
	}

	const infoEmbed = new Discord.MessageEmbed()
		.setColor("#0099FF")
		.setTitle("CMD INFO")
		.setDescription(`\`${prefix}${command.name}\``);

	if (command.description)
		infoEmbed.addField("Description", `${command.description}`);
	if (command.aliases) infoEmbed.addField("Aliases", `${command.aliases}`);
	if (command.usage) infoEmbed.addField("Usage", `${command.usage}`);
	if (command.args) infoEmbed.addField("Arguments", `${command.args}`);

	return infoEmbed;
}
