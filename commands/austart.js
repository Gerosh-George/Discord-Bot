const Discord = require("../node_modules/discord.js");

module.exports = {
	name: "austart",
	args: "optional",
	description: "Creates the voice channels for the among us game",
	usage: "!austart",
	aliases: ["aus"],
	execute(message, args) {
		let alive_channel = message.guild.channels.cache.find(
			(c) => c.name === "Alive",
		);
		let dead_channel = message.guild.channels.cache.find(
			(c) => c.name === "Dead",
		);

		if (args.length > 0) {
			const region = args[0];
			const code = args[1];

			if (code.length != 6) {
				return message.reply("Invalid Code!").then((sentMsg) => {
					sentMsg.react("❌");
				});
			}

			const auEmbed = new Discord.MessageEmbed()
				.setColor("#0099FF")
				.setTitle(`Among Us Game started by ${message.author.tag}`)
				.setDescription("Just type in the code and enter the room!")
				.setThumbnail(
					"https://www.nme.com/wp-content/uploads/2020/10/Among-Us-2-1392x884.jpg",
				)
				.addField("Region", region)
				.addField("Code", code)
				.setFooter(
					"If you were not in General VC then you would not have been automatically added to alive channel",
				);

			message.channel.send(auEmbed);
		}

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
						transferPlayer(message.guild);
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
