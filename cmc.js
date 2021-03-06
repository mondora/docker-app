var _		= require("lodash");
var exec	= require("child_process").exec;
var fs		= require("fs");
var mkdirp	= require("mkdirp");
var spawn	= require("child_process").spawn;

var apps = fs.readdirSync("templates").reduce(function (acc, filename) {
	if (filename.slice(-4) === ".dft") {
		acc[filename.slice(0, -4)] = fs.readFileSync("templates/" + filename, "utf8");
	}
	return acc;
}, {});

var appName = process.argv[2];
var options = JSON.parse(fs.readFileSync("options/" + appName + ".json", "utf8"));

var dockerfile = _.template(apps[appName], options, {interpolate: /{{([\s\S]+?)}}/g});
var imageName = appName + "-" + options.checkout;
var dirName = "apps/" + imageName;
mkdirp.sync(dirName);
fs.writeFileSync(dirName + "/Dockerfile", dockerfile, "utf8");

var buildArgs = [
	"build",
	"--no-cache",
	"-t",
	imageName,
	"apps/" + imageName
];
var stopArgs = [
	"stop",
	appName
];
var rmArgs = [
	"stop",
	appName
];
var runArgs = [
	"run",
	"-d",
	"--name",
	appName,
	"-p",
	options.port + ":" + options.port,
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
	console.log("Stopping");
	var stop = spawn("docker", stopArgs);
	stop.on("close", function () {
		console.log("Removing");
		var rm = spawn("docker", rmArgs);
		rm.on("close", function () {
			console.log("Running");
			var run = spawn("docker", runArgs);
			run.stdout.on("data", function (data) {
				console.log(data);
			});
			run.on("close", function (code) {
				console.log("Run finished");
			});
		});
	});
});
