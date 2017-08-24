
var $hamburger = $(".hamburger");
var clicked = true;

$hamburger.on("click", function(e) {
    $hamburger.toggleClass("is-active");

    if (clicked === true) {
        document.getElementById("sidenav-menu").style.width = "250px";
        clicked = false;
    } else {
        document.getElementById("sidenav-menu").style.width = "0";
        clicked = true;
    }

});

