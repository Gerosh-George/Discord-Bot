module.exports = {
	name: "ping",
	description: "ping-pong",
	aliases: ["test"],
	usage: "!ping",
	args: "optional",
	execute(message, args) {
		if (args[0] == "L" || args[0] == "l") {
			message.channel.send("Pong.").then((sentMsg) => {
				sentMsg.react("🏓");
				const client = sentMsg.client;
				const ping = sentMsg.createdTimestamp - message.createdTimestamp;
				sentMsg.edit(`Bot Latency: ${ping}\nAPI Latency: ${client.ws.ping}`);
			});
		} else {
			message.channel.send("Pong.").then((sentMsg) => {
				sentMsg.react("🏓");
			});
		}
	},
};
