// backend.js
import cors from "cors";
import express from "express";

// Step 1: Define the Users Data Structure
const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspiring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});


//function to delte a user by ID
const deleteUserbyID = (id) => {
    for (let i = 0; i < users["users_list"].length; i++) {
        if (users["users_list"][i]["id"] === id) {
            users["users_list"].splice(i, 1);
            return "Success";
        }
    }
    return "User not found";
};

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const result = deleteUserbyID(id);
    res.send(result);
});


//action to get all users that match a given name and a given job
const findUsersByNameAndJob = (name, job) => {
    const matchingUsers = [];
    for (let i = 0; i < users["users_list"].length; i++) {
        if (users["users_list"][i]["name"] === name && users["users_list"][i]["job"] === job) {
            matchingUsers.push(users["users_list"][i]);
        }
    }
    return matchingUsers;
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined && job != undefined) {
        const result = findUsersByNameAndJob(name, job);
        res.send(result);
    }
    else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    }
    else {
        res.send(users);
    }
});



app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
