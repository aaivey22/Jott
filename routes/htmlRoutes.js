// Exporting the function containing the routes

var path = require("path");

module.exports = function (app) {

    // Using the express GET method to display html according to the route.

    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

}