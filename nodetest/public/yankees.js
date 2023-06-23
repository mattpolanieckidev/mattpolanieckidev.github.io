function addUserToAirtable() {
    fetch("/addUserToAirtable", {
        method: "POST"
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error adding user:", error);
        });
}

