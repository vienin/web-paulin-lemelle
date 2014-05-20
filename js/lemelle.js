
$(function() {
    $.getJSON("http://decatombe.fr/lemelle/photos/index.json",
        function(index) {
            var albums = Object.keys(index).sort();

            // Add the images as links with thumbnails to the page:
            var count = 0;
            var countindex = 0;
            var portfoliocontainer;
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
                    var baseurl = 'http://decatombe.fr/lemelle/photos/' + album + "/";

                    if (first == undefined) {
                        if (countindex == 0) {
                            portfoliocontainer = $('<div/>').addClass("row").appendTo($('#portfolio'));
                        }

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
                            .addClass("col-md-3")
                            .addClass("col-sm-6")
                            .appendTo(portfoliocontainer);

                        if (++countindex >= 4) countindex = 0;
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
                        // .addClass("col-lg-3")
                        .addClass("col-md-3")
                        .addClass("col-sm-6")
                        .appendTo(linkscontainer);
                });
                count++;
            });

            // Add pagination
            var pagelist = $("<ul/>").addClass("pagination");
            $("<div/>")
                .append($("<div/>")
                    .append(pagelist)
                    .addClass("col-lg-12")
                )
                .addClass("row")
                .addClass("text-center")
                .appendTo(portfoliocontainer);
        }
    );
    $('#blueimp-gallery').data('useBootstrapModal', 0);
});
