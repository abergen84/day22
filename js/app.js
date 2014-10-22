window.onload = app;

// runs when the DOM is loaded
function app() {

    // load some scripts (uses promises :D)
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }).then(function() {
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;

    
    var options = {
            api_key: "aavnvygu0h5r52qes74x9zvo"
        },

        //start app
        var client = new EtsyClient(options);
    });

}

function EtsyClient(x) {
    if (!x.api_key) {
        throw new Error("Yo where da API key?");
    }

    this.etsy_url = "https://openapi.etsy.com/"; //instead of "this.", you could put "EtsyClient." but that is like the Excel version of hardcoding
    this.version = x.api_version || "v2/";
    this.api_key = x.api_key;
    this.complete_api_url = this.etsy_url + this.version;

    this.setupRouting();
}

EtsyClient.prototype.pullListings = function() {
    return $.getJSON(this.complete_api_url + "listings/active.js?api_key=" + this.api_key +
        "&includes=Images&callback=?").then(function(data) {
        return data;
    });
}

EtsyClient.prototype.pullListing = function(id) {
    return $.getJSON(this.complete_api_url + "listings/" + id + ".js?api_key=" + this.api_key +
        "&includes=Images&callback=?").then(function(data) {
        return data;
    });
}

EtsyClient.prototype.loadTemplate = function(name) {
    if (!this.templates) {
        this.templates = {};
    }

    var self = this;

    if (this.templates[name]) {
        var promise = $.Deferred();
        promise.resolve(this.templates[name]);
        return promise;
    } else {
        return $.get('./templates/' + name + '.html').then(function(data) {
            self.templates[name] = data;
            return data;
        });
    }
}

EtsyClient.prototype.drawListings = function(templateString, data) {

    document.querySelector('#TemplateDestination').innerHTML = data.results.map(function(x) {
        return _.template(templateString, x);
    }).join('');
}

EtsyClient.prototype.drawListing = function(templateString, data) {

    document.querySelector('#TemplateDestination').innerHTML =
        return _.template(templateString, data.results[0]);
}

EtsyClient.prototype.setupRouting = function() {

    var self = this;

    Path.map("#/").to(function() {
        $.when(
            self.loadTemplate("listing"),
            self.pullListings(this.params.id)
        ).then(function() {
            self.drawListings(arguments[0], arguments[1]);

            console.dir(self)
        })
    });

Path.map("#/message/:anymessage").to(function() {
	alert(this.params.anymessage);
})

Path.map("#/listing/:id").to(function() {
	$.when(
		self.loadTemplate("singlelisting"),
		self.pullListing(this.params.id)
		).then(function() {
			self.drawListing(arguments[0], arguments[1]);
		})
});



//sets default hash to draw all listings
Path.root("#/");
Path.listen();


}
