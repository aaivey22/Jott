const fs = require("fs"); // Require is a method

// Linking api routes to a series of "data" sources that hold arrays of information on the new/old note entries.
// API GET request uses the route to retrieve array of note data to display.
module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        let postEntries = [];

        fs.readFile("db/db.json", "utf8", (err, data) => { // The readFile is anonymous and contains three values.
            if (err) throw err
            else if (data) {
                console.log("get().10", JSON.parse(data))
                res.json(JSON.parse(data))
            };
        });
    });

    // API POST request uses the route to save new user entries by pushing them into the postEntries arr.
    app.post("/api/notes", (req, res) => {
        let newEntry = req.body;
        newEntry.id = Date.now().toString();

        fs.readFile("db/db.json", "utf8", (err, data) => { // The readFile is anonymous and contains three values.
            if (err) throw err
            else if (data) {
                postEntries = JSON.parse(data);
            }
            console.log("postEntries.26", { postEntries });
            postEntries.push(newEntry);

            fs.writeFile("db/db.json", JSON.stringify(postEntries), (err) => {
                if (err) throw err
            });
            console.log("req.body.31", req.body)
            res.json(newEntry);

        });

    });

    // API DELETE request uses the route to FIND the selected note entry by ID and remove it from the array with SPLICE.
    // The remaining entries whose ID do not match the "chosen" ID remain in the deleteEntries array and written back to the browser.
    app.delete("/api/notes/:id", (req, res) => {
        let id = req.params.id;

        fs.readFile("db/db.json", "utf8", (err, data) => {
            let deleteEntries = JSON.parse(data)
            let deletedEntry = deleteEntries.find(entry => entry.id === id)
            let indexEntry = deleteEntries.indexOf(deletedEntry)
            deleteEntries.splice(indexEntry, 1);

            fs.writeFile("db/db.json", JSON.stringify(deleteEntries), (err) => {
                if (err) throw err
                res.json({ ok: true });
            });
        });
    });
};