const { execSync } = require('child_process');

try {
  const output = execSync('sudo /home/b/./iag-cli-linux get:status 2>&1');
  const substring = "Node is up and running"
  console.log((output.toString().includes(substring) ? "running" : 'not running'));
} catch (error) {
  console.error('Error executing command:', error);
}
