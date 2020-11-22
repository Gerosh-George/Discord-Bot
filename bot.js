const fs = require("fs");

//const { prefix, token } = require("./config.json");
const prefix = "!";

const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//listeners
client.on("ready", ready);
client.on("message", sendReply);
client.on("guildCreate", sayHi);

function ready() {
	console.log(`Logged in as ${client.user.tag}!`);
}

//send thank you for adding message
function sayHi(guild) {
	console.log(`Added to a server! --- ${guild.name}`);
	guild.channels.cache.forEach((channel) => {
		if (channel.name === "general") {
			channel.send(
				"Hey! I am Gideon\nI was created by Gerosh George😎\nYou can enter !help to see all my commands",
			);
			return;
		}
	});
}

let hey_replies = [
	"How can I help you?",
	"How are you?",
	"What's up?",
	"Is there anything that I can do for you?",
	"Hope you are having a great time! 😄",
];

// send replies
function sendReply(message) {
	if (message.channel.type === "dm" && !message.author.bot) {
		return message.reply("Sorry! I don't take commands in DM channel 🤖");
	}

	//calling gideon
	if (message.content.toLowerCase() === "hey gideon") {
		var reply_back =
			hey_replies[Math.floor(Math.random() * hey_replies.length)];
		message.channel.send(`Hey ${message.author} 👋\n${reply_back}`);
	}

	//checking message from user and prefix checker
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandname = args.shift().toLowerCase();

	const command =
		client.commands.get(commandname) ||
		client.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(commandname),
		);

	if (!command) {
		return message.reply(
			"Unknown Command or alias!😕\nEnter !help to see all the commands",
		);
	}

	if (command.name !== "help" && command.args != "optional") {
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
}

//using env variable containing my bot token
client.login(process.env.BOT_TOKEN).catch((err) => {
	console.log("Error in connecting!");
});

// client
// 	.login("ADD_Your_Bot_Token_here")
// 	.catch((err) => {
// 		console.log("Error in connecting!");
// 	});
