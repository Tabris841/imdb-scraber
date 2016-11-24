module.exports = {
    connectionString: "mongodb://localhost/moviesDb",
    genres: ["action", "sci-fi", "fantasy", "horror", "comedy"],
    pagesCount: 50,
    selector: ".col-title span[title] a",
    template: "http://www.imdb.com/search/title?genres=<%= genre %>&title_type=feature&0sort=moviemeter,asc&page=<%= pageNum %>&view=simple&ref_=adv_nxt"
};