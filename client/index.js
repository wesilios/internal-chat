var io = require('socket.io-client');
const chalkLib = require('chalk');

var socket = io("http://localhost:3000");
var chalk = new chalkLib.Instance({ enabled: true, level: 3 });

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var id = "";
var buffer = "";


function chat(){
	rl.question(chalk.magenta("» "), (answer) => {
		buffer = `(${chalk.yellow(new Date())}) ${chalk.yellow(id)}: ${chalk.hex('#7f7fff')(answer)}`;
		socket.emit("message", buffer);
		chat();
	});
}

socket.on('connect', () => {
	rl.question(`What's your name? `, (answer) => {
			socket.emit("message", `<(>,")> ${chalk.green(answer)} has joined the chat`);
			id = answer;
			chat();

	});

	socket.on('msg', function(data){
		if(buffer!=data){
			console.log("\n" + `${data}`);
			chat();
		}
	});
})
