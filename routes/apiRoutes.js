// LOAD DATA
// Linking our api routes to a series of "data" sources that hold arrays of information on the new/old note entries.

const fs = require("fs"); // Require is a method

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

    app.post("/api/notes", (req, res) => {
        let newEntry = req.body;
        newEntry.id = Date.now().toString();
        const postEntries = [];

        fs.readFile("db/db.json", "utf8", (err, data) => { // The readFile is anonymous and contains three values.
            if (err) throw err
            else {
                let postEntriesFormatted = JSON.parse(data);
                for (let i = 0; i < postEntriesFormatted.length; i++) {
                    postEntries.push(postEntriesFormatted[i]);
                }
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
}

// var tableData = require("../data/tableData");
// var waitListData = require("../data/waitinglistData");


// // ===============================================================================
// // ROUTING
// // ===============================================================================

// module.exports = function(app) {
//   // API GET Requests
//   // Below code handles when users "visit" a page.
//   // In each of the below cases when a user visits a link
//   // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
//   // ---------------------------------------------------------------------------

//   app.get("/api/tables", function(req, res) {
//     res.json(tableData);
//   });

//   app.get("/api/waitlist", function(req, res) {
//     res.json(waitListData);
//   });

//   // API POST Requests
//   // Below code handles when a user submits a form and thus submits data to the server.
//   // In each of the below cases, when a user submits form data (a JSON object)
//   // ...the JSON is pushed to the appropriate JavaScript array
//   // (ex. User fills out a reservation request... this data is then sent to the server...
//   // Then the server saves the data to the tableData array)
//   // ---------------------------------------------------------------------------

//   app.post("/api/tables", function(req, res) {
//     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//     // It will do this by sending out the value "true" have a table
//     // req.body is available since we're using the body parsing middleware
//     if (tableData.length < 5) {
//       tableData.push(req.body);
//       res.json({result: true});
//     }
//     else {
//       waitListData.push(req.body);
//       res.json(false);
//     }
//   });

//   // ---------------------------------------------------------------------------
//   // I added this below code so you could clear out the table while working with the functionality.
//   // Don"t worry about it!

//   app.post("/api/clear", function(req, res) {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;
//     console.log(req.body);
//     res.json({ ok: true });
//   });
// };
