var _ = require("lodash");
var exec = require("child_process").exec;
var fs = require("fs");
var mkdirp = require("mkdirp");

var apps = fs.readdirSync("templates").reduce(function (acc, filename) {
	if (filename.slice(-4) === ".dft") {
		acc[filename] = fs.readFileSync(filename, "utf8");
	}
	return acc;
}, {});

var appName = process.argv[2];
var options = JSON.parse(fs.readFileSync(process.argv[4], "utf8"));

var dockerfile = _.template(apps[appName], options);
var imageName = appName + "-" + options.checkoutCommit;
var dirName = "apps/" + imageName;
mkdirp.sync(dirName);
fs.writeFileSync(dirName + "/Dockerfile", dockerfile, "utf8");

var buildCommand = "docker build -t " + imageName + " .";
var runCommand = "docker run " + imageName;

console.log("Running:");
console.log(buildCommand);
exec(buildCommand, function (error) {
	if (error) {
		throw new Error(error);
	}
	console.log("Running:");
	console.log(runCommand);
	exec(runCommand, function (error) {
		if (error) {
			throw new Error(error);
		}
	});
});
