/* globals require module */
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ActorSchema = new Schema({
    role: {
        name: String,
        required: true
    },
    name: {
        name: String,
        required: true
    },
    imdbId: {
        name: Number,
        required: true
    },
    image: {
        name: String,
        required: true
    }
});

let ModelDetailsSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    trailer: String,
    title: {
        name: String,
        required: true
    },
    description: {
        name: String,
        required: true
    },
    categories: {
        name: String,
        required: true
    },
    releaseDate: {
        name: Date,
        required: true
    },
    actors: [ActorSchema]
});

module.exports = mongoose.model("ModelDetailsSchema", ModelDetailsSchema);