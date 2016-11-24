/* globals console require setTimeout Promise */

const httpRequester = require("./utils/http-requester");
const htmlParser = require("./utils/html-parser");
const queuesFactory = require("./data-structures/queue");
const modelsFactory = require("./models");
const constants = require("./config/constants");
const wait = require("./utils/wait-promise");
const _ = require("lodash");
const mongoose = require("mongoose");
const SimpleMovie = require("./models/simple-movie-model");

require("./config/mongoose")(constants.connectionString);

// const db = mongoose.connection;
// db.once("open", () => {
//     // we're connected!
//     console.log("we're connected!");
// });

// startSimpleMovieScrapping(25);


SimpleMovie.find({ name: "Sausage Party - Es geht um die Wurst" }).then(res => {
    for (let i = 0; i < res.length; i+=1) {
        console.log(res[i]);
    }
    return res;
});