const express = require("express");
const { execSync } = require("child_process");
const path = require("path");
const os = require("os");

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "public")));

// Set up view engine (for initial rendering)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Get the home directory dynamically
const HOME_DIRECTORY = os.homedir();

app.get("/", (req, res) => {
	res.render("index");
});

// API endpoint to get status and updates
app.get("/api/status", (req, res) => {
	const commandOutput = executeCommands();
	res.json(commandOutput);
});

function executeCommands() {
	const output = execSync(`sudo /home/b/./iag-cli-linux get:status 2>&1`);
	const substring = "Node is up and running"
	const isIagCliRunning = output.toString().includes(substring);
	const latestVersion = execSync(
		'curl -s https://api.github.com/repos/Iagonorg/mainnet-node-CLI/releases/latest | grep -o -P -m 1 "v.{0,5}"'
	)
		.toString()
		.trim()
		.replace("v", "");

	const currentVersion = execSync(`${HOME_DIRECTORY}/iag-cli-linux --version`)
		.toString()
		.trim();

	const isUpdateAvailable = latestVersion !== currentVersion;

	return {
		status: isIagCliRunning.toString().trim() ? "running" : "stopped",
		isUpdateAvailable,
		latestVersion,
		currentVersion,
	};
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
