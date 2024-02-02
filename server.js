const express = require("express");
const { execSync } = require("child_process");
const path = require("path");

const app = express();
const port = 5000;

// Set up view engine (for initial rendering) - Remove this if not needed
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// route to serve the index.ejs in the views directory
app.get("/", (req, res) => {
	res.render("index");
});

// API endpoint to get status and updates
app.get("/api/status", (req, res) => {
	const commandOutput = executeCommands();
	res.json(commandOutput);
});

function executeCommands() {
	const isIagCliRunning = execSync(
		'pgrep -f "/home/b/iag-cli-linux /snapshot/iagon-node-cli/build"'
	);
	const latestVersion = execSync(
		'curl -s https://api.github.com/repos/Iagonorg/mainnet-node-CLI/releases/latest | grep -o -P -m 1 "v.{0,5}"'
	)
		.toString()
		.trim()
		.replace("v", "");
	const currentVersion = execSync(`/home/b/iag-cli-linux --version`)
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
