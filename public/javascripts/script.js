jQuery(document).ready(function ($) {
    console.log("Main JS script loaded");

    // Calling the jQuery UI tabs() method, to create tabbed portions of the pages i.e.
    // on the login screen, and in the admin panel
    $(".tabs").tabs();

    // Calling the resizeFigures() method, as defined below. The purpose of this method is to
    // combat the issues with resizing of embedded objects (such as swfs and videos). As I wanted
    // to make each of these elements responsive (along with any other media elements on the page).
    // Each video and swf is wrapped in a container, and set to scale to the container's size. In order
    // to ensure that this container matches with the other figures on the screen, using this function
    // to find the largest figure, and then resizing all other figures and containers to match this.
    resizeFigures();

    // Everytime the window is resized, calling the same resizeFigures() method so that the figures
    // will be recalculated and the containers sized appropriatley
    $(window).resize(function () {
        // Resetting each figure's minHeight to it's initial value, so that when the resizeFigures() funciton
        // runs, it is not basing it's new height value on the current dimensions of the figures
        $("figure").css("minHeight", "initial");
        resizeFigures();
    });

    $(".tabs").on("tabsactivate", function (event, ui) {
        $("form input").not("[type='submit']").removeClass("formWarning");
    });
});

// This function is called each time the page is reloaded, or the window is resized, to ensure that varying
// types of content are all sized the same i.e. images, video and swfs
function resizeFigures() {
    // Creating a temporary variable to store the largest height of the figures currently
    var maxFigHeight = 0;

    // Looping through each figure on the page, to find the current largest height
    $('figure').each(function () {
        // Using a ternary operator to test this figure's height against the current maximum figure height
        // detected. If this figure is taller, then updating maxFigHeight to reflect this, otherwise setting
        // maxFigHeight to equal it's current value
        maxFigHeight = maxFigHeight > $(this).height() ? maxFigHeight : $(this).height();
    });
    $(".objectContainer").css("height", $("figure img").height());
    $("figure").css("height", maxFigHeight * 1.02);

    $("video").each(function () {
        $(this).css("left", ($(this).parent().width() - $(this).width()) / 2);
    });

    console.log("Figures resized");
}

// Creating an asynchronous function to check if the credentials a user has supplied are available.
// Takes in three parametres. The requested username, requested url, and the callback function to which
// the response data should be returned when a response is received from the server
function checkCredentialsAvailable(username, url, cb) {
    console.log("Checking if the username - " + username + " and url - " + url + " are available");
    $.post("/checkCredentialsAvailable", { requestedUsername: username, requestedPortfolioURL: url }, function (serverResponse) {

        console.log("Username available = " + serverResponse.usernameAvailable + " and url available = " + serverResponse.portfolioURLAvailable);
        // Passing the response data back to the callback function
        cb(serverResponse);
    }, "json");
}
