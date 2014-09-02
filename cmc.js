var _ = require("lodash");
var exec = require("child_process").exec;
var fs = require("fs");
var mkdirp = require("mkdirp");
var spawn = require('child_process').spawn;


var apps = fs.readdirSync("templates").reduce(function (acc, filename) {
	if (filename.slice(-4) === ".dft") {
		acc[filename.slice(0, -4)] = fs.readFileSync("templates/" + filename, "utf8");
	}
	return acc;
}, {});

var appName = process.argv[2];
var options = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));

var dockerfile = _.template(apps[appName], options, {interpolate: /{{([\s\S]+?)}}/g});
var imageName = appName + "-" + options.checkoutCommit;
var dirName = "apps/" + imageName;
mkdirp.sync(dirName);
fs.writeFileSync(dirName + "/ssh-key.pem", fs.readFileSync("ssh-key.pem"));
fs.writeFileSync(dirName + "/Dockerfile", dockerfile, "utf8");

var buildArgs = [
	"build",
	"-t",
	imageName,
	"apps/" + imageName
];
var runArgs = [
	"run",
	"-d",
	imageName
];

console.log("Building image");
var build = spawn("docker", buildArgs);
build.stdout.on("data", function (data) {
	console.log("stdout: " + data);
});
build.stderr.on("data", function (data) {
	console.log("stderr: " + data);
});
build.on("close", function (code) {
	console.log("Build finished");
	console.log("Running");
	var run = spawn("docker", runArgs);
	run.stdout.on("data", function (data) {
		console.log("stdout: " + data);
	});
	run.stderr.on("data", function (data) {
		console.log("stderr: " + data);
	});
	run.on("close", function (code) {
		console.log("Run finished");
	});
});
