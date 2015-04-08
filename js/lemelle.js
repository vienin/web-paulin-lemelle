var buildPortfolio = function (index) {
    var albums = Object.keys(index).sort();

    // Add the images as links with thumbnails to the page:
    var count = 0;
    portfoliocontainer = $('<div/>').addClass("row").appendTo($('#portfolio-container'));
    $.each(albums, function (i) {
        var album = albums[i];

        var linkscontainer = $('<div/>').addClass("row");
        var titlecontainer = $('<div/>')
            .append($('<div/>')
                .append($('<h2/>')
                    .addClass("page-header")
                    .text(album)
                )
                .addClass("col-lg-12")
            )
            .addClass("row");

        // Create a dedicated section for the album
        var id = (count == 0) ? "" : count;
        var section = $("<section/>")
            .append($("<div/>")
                .addClass("row")
                .addClass("portfolio-section")
                .attr("id", "photo" + id)
            )
            .append(titlecontainer)
            .append(linkscontainer)
            .addClass("content-section")
            .addClass("text-center")
            .addClass("photo-thumbnails")
            .insertBefore($('#contact'))

        var first;
        $.each(index[album], function () {
            var photo = this;
            var thumb = photo.split(".")[0] + "_tn.jpg";
            var baseurl = 'http://www.paulin-lemelle.com/photos/' + album + "/";

            if (first == undefined) {
                // Add an entry to the portfolio for the album
                first = $("<div/>")
                    .append($('<a/>')
                        .append($('<img>')
                            .addClass("img-responsive")
                            .prop('src', baseurl + "thumbs/" + thumb)
                            .addClass("portfolio-item")
                        )
                        .prop('href', "#photo" + id)
                    )
                    .append($('<h4/>')
                        .append($('<a/>').prop('href', "#photo" + id).text(album))
                    )
                    .append($('<p/>'))
                    .addClass("col-lg-3")
                    .addClass("col-md-4")
                    .addClass("col-sm-6")
                    .appendTo(portfoliocontainer);
            }

            // Add the image in the proper section
            $("<div/>")
                .append($('<a/>')
                    .append($('<img>')
                        .addClass("img-responsive")
                        .prop('src', baseurl + "thumbs/" + thumb)
                    )
                    .prop('href', baseurl + photo)
                    .addClass('thumbnail')
                    .attr('data-gallery', '')
                )
                .addClass("col-lg-3")
                .addClass("col-md-4")
                .addClass("col-sm-6")
                .addClass("thumb")
                .appendTo(linkscontainer);
        });
        count++;
    });

    // Add pagination
    // var pagelist = $("<ul/>").addClass("pagination");
    // $("<div/>")
    //     .append($("<div/>")
    //         .append(pagelist)
    //         .addClass("col-lg-12")
    //     )
    //     .addClass("row")
    //     .addClass("text-center")
    //     .appendTo(portfoliocontainer);
}

var indexUrl = "http://www.paulin-lemelle.com/photos/index.json";
$(function() {
    // Try to get the JSON file via usual way
    $.getJSON(indexUrl, function(index){
        // Build the portfolio from the json index result
        buildPortfolio(index);
    })
    .error(function() {
        console.warn("Unbale to retrieve the json index from " + indexUrl +
                     ", using json proxy http://jsonp.jit.su/");
        // If error can not retrieve the JSON file, use the jsonp.jit proxy
        // (usualy cause No 'Access-Control-Allow-Origin' header error)
        $.getJSON('http://jsonp.jit.su/?callback=?&url=' + indexUrl, function(index){
            buildPortfolio(index);
        })
    })

    $('#blueimp-gallery').data('useBootstrapModal', 0);
});
