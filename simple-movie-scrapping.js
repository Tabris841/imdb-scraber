/* globals console require setTimeout Promise */
"use strict";

const httpRequester = require("./utils/http-requester");
const htmlParser = require("./utils/html-parser");
const queuesFactory = require("./data-structures/queue");
const modelsFactory = require("./models");
const constants = require("./config/constants");
const wait = require("./utils/wait-promise");
const _ = require("lodash");

require("./config/mongoose")(constants.connectionString);

let urlsQueue = queuesFactory.getQueue();

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let compiled = _.template(constants.template);
        let url = compiled({
            genre,
            "pageNum": i + 1
        });
        urlsQueue.push(url);
    }
});

function getMoviesFromUrl(url) {
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then(result => {
            const selector = constants.selector;
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then(movies => {
            let dbMovies = movies.map(movie => {
                return modelsFactory.getSimpleMovie(movie.title, movie.url);
            });

            modelsFactory.insertManySimpleMovies(dbMovies);

            return wait(1000);
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getMoviesFromUrl(urlsQueue.pop());
        })
        .catch(err => {
            console.dir(err, { colors: true });
        });
}

module.exports = (asyncPagesCount) => {
    Array.from({ length: asyncPagesCount })
        .forEach(() => getMoviesFromUrl(urlsQueue.pop()));
};
