const express = require('express');
const app = express();
const port = 3000;

app.post("/addUserToAirtable", (req, res) => {
    addUserToAirtable(); // Call the desired function
    res.send("User added successfully");
});


// serve
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log('server running')
})

const Airtable = require('airtable');

// Create an instance of the Airtable client
const base = new Airtable({ apiKey: 'key6UyJSQCDWbU2kl' }).base('app8pxwQgL6nUlPZX/Users');
function addUserToAirtable() {
    const userFields = {
        "fields": {
            "Firstname": "Matthew",
            "Lastname": "Polaniecki",
            "Email": "matthew.polaniecki@gmail.com",
            "Status": "Active"
        }
    };

    fetch("https://api.airtable.com/v0/app8pxwQgL6nUlPZX/Users", {
        method: "POST",
        headers: {
            "Authorization": "Bearer key6UyJSQCDWbU2kl",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFields)
    })
        .then(response => response.json())
        .then(data => {
            console.log("User added successfully:", data);
        })
        .catch(error => {
            console.error("Error adding user:", error);
        });
}

