/* globals console require setTimeout Promise */

const httpRequester = require("./utils/http-requester");
const htmlParser = require("./utils/html-parser");
const queuesFactory = require("./data-structures/queue");
const modelsFactory = require("./models");
const constants = require("./config/constants");
const wait = require("./utils/wait-promise");
const _ = require("lodash");

require("./config/mongoose")(constants.connectionString);

// startSimpleMovieScrapping(25);