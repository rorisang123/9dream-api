const express = require('express');

const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

// Endpoints

 /* DATA */
 const status = {
    "Status": "Running"
};
 
const UserModel = {};

const organisationUserModel = {}

const campaignerUserModel = {}

const voterUserModel = {}

const expertUserModel = {}

const voteModel = {}

const transactionModel = {}

const promiseModel = {}

const reviewModel = {}

const campaignModel = {}

 // Endpoints
