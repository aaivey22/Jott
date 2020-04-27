var fs = require("fs"); // Require is a method

module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => { // The readFile is anonymous and contains three values.
            if (err) throw err
            console.log(JSON.parse(data))
            res.json(JSON.parse(data))
        })
    })
    
    app.post("/api/notes", (req, res) => {
        console.log(req.body)
        // fs.appendFile("db/db.json", )
    })
}

//[{"title":"Test Title","text":"Test text"}]