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
				const ping = sentMsg.createdTimeStamp - message.createdTimeStamp;
				sentMsg
					.edit(`Bot Latency: ${ping}\nAPI Latency: ${client.ws.ping}`)
					.catch((err) => {
						console.log("Error in ping edit!");
					});
			});
		} else {
			message.channel.send("Pong.").then((sentMsg) => {
				sentMsg.react("🏓");
			});
		}
	},
};
