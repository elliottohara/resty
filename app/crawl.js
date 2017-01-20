var casper = require('casper').create();
var html;

function getLinks() {
// Scrape the links from top-right nav of the website
    var x = document.querySelectorAll('body');
    return x[0].innerHTML;
}

// Opens casperjs homepage
casper.start('http://casperjs.org/');

casper.then(function () {
    html = this.evaluate(getLinks);
});

casper.run(function () {
    console.log(html);
    casper.done();
});