'use strict';

// Global Variable
require('dotenv').config();
const PORT = process.env.PORT;
// Main Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// App configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import uuid module
const { v4: uuidv4, validate } = require('uuid');

// importing user model, enmap, and auth middleware
const enmap = require('./database/main');
const userSchema = require("./database/models/user");
const auth = require("./middleware/auth");

// Register
app.post("/register", (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { email, username } = req.body;

        // Validate user input
        if (!email && username)
            return res.status(400).send("email and username input is required");
        if (!email) 
            return res.status(400).send("email input is required");
        if (!username)
            return res.status(400).send("username input is required");

        // Validate if user already exist in our database
        if (enmap.has(email))
            return res.status(409).send("User Already Exist. Please Login");

        // Create token for our user
        const token = uuidv4();

        // Save the user schema in the memory
        const User = userSchema(username, email, token);
        
        // Create user in our database
        enmap.ensure(email, User);

        // return new user
        res.status(201).json(User);
    } catch (err) {
        console.log(err.stack);
        return res.status(500).send(err.message);
    }
    // Our register logic ends here
});

// Login
app.post("/login", (req, res) => {

    try {
        // Our login logic starts here
        // Get user input
        const { email } = req.body;

        // Validate user input
        if (!email) {
            return res.status(400).send("email input is required");
        }
    
        // Validate if user exist in our database
        if (!enmap.has(email)) {
            return res.status(409).send("User Doesn't Exist. Please Register");
        } else {
            // Get the user data
            const userData = enmap.get(email);
            
            // Return it to the user
            return res.status(201).json(userData);
        }
    } catch (err) {
        console.log(err.stack);
        return res.status(500).send(err.message);
    }
    
    // Our register logic ends here
});

app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

// server listening     
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});