const Discord = require("../node_modules/discord.js");

module.exports = {
	name: "aucode",
	args: true,
	aliases: ["ausc"],
	description: "Creates an invite with the code and region of the game",
	usage: "<region> <code>",
	async execute(message, args) {
		const voiceChannel = message.guild.channels.cache.find(
			(c) => c.name === "General" && c.type === "voice",
		);

		let region = args[0];
		let code = args[1];

		if (args[0].length == 6 && args[0].toLowerCase() !== "europe") {
			return message.reply(
				"The proper usage would be: `!aucode <region> <code>`",
			);
		}

		if (region.toLowerCase() === "as" || region.toLowerCase() === "asia")
			region = "Asia";
		else if (region.toLowerCase() === "eu" || region.toLowerCase() === "europe")
			region = "Europe";
		else if (
			region.toLowerCase() === "na" ||
			region.toLowerCase() === "north america"
		)
			region = "North America";
		else
			return message
				.reply(
					"The only regions available are:\nEurope (eu)\nAsia (as)\nNorth America (na)",
				)
				.then((sentMsg) => {
					sentMsg.react("❌");
				});

		if (code.length != 6)
			return message
				.reply("Invalid Code! Code length should be 6")
				.then((sentMsg) => {
					sentMsg.react("❌");
				});

		code = code.toUpperCase();

		const invite = await voiceChannel.createInvite({
			maxAge: 0,
			maxUses: 20,
			unique: false,
		});

		const auEmbed = new Discord.MessageEmbed()
			.setColor("#0099FF")
			.setTitle(`Among Us Game started by ${message.author.tag}`)
			.setDescription("Just type in the code and enter the room!")
			.setThumbnail(
				"https://www.nme.com/wp-content/uploads/2020/10/Among-Us-2-1392x884.jpg",
			)
			.addField("Region", region)
			.addField("Code", code)
			.addField("General Voice Channel", `[Click Here!](${invite})`)
			.setFooter(
				"You need to be in General VC so that the bot can move you into the Alive channel when the game begins!",
			);

		message.channel.send(auEmbed);
	},
};
