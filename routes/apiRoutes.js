
const fs = require("fs"); // Require is a method

// Linking api routes to a series of "data" sources that hold arrays of information on the new/old note entries.
// API GET request uses the route to retrieve array of note data to display.
module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => { // The readFile is anonymous and contains three values.
            if (err) throw err
            else {
                console.log(JSON.parse(data))
                res.json(JSON.parse(data))
            }
        })
    })

    // API POST request uses the route to save new user entries by pushing them into the postEntries arr.
    app.post("/api/notes", (req, res) => {
        let newEntry = req.body;
        newEntry.id = Date.now().toString();
        let postEntries = [];
        fs.readFile("db/db.json", "utf8", (err, data) => { // The readFile is anonymous and contains three values.
            if (err) throw err
            else {
                postEntries = JSON.stringify(data);
            }
        })

        postEntries.push(newEntry);
        fs.writeFile("db/db.json", JSON.stringify(postEntries), (err) => {
            if (err) throw err
            else {
                console.log("entry posted")
            }
        })
        console.log(req.body)
        res.json(newEntry);
    });

    // app.delete("/api/notes/:id", (req, res) => {
    //     let id = req.params.id;
    //     // let deleteEntries = [];
    //     fs.readFile("db/db.json", "utf8", (err, data) => {
    //         const result = postEntries.filter(id => id === id[i]);
    //         console.log(result);

    //     })
    // }); 
}
