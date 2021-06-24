/* Concept for a simple animated menu

   ALERT: MESSY CODE!!!
*/


window.onload = function() {
    bombMenu_init();
    chameleonMenu_init(true);
    switch_init();
};

/* menu animation */
function bombMenu_init() {
    var toggleMenuBtns = document.getElementsByClassName("menu-toggle-btn");
    for (var i = 0; i < toggleMenuBtns.length; i++) {
        toggleMenuBtns[i].onclick = expand; /* attach an event handler to every menu-toggle-btn in the page */
    }

    function expand(e) {
        e.target.classList.toggle("active"); /* show/hide menu through class 'active' */
    }
}

/*'chameleon functionality - changes menu color to match background */
var currentSectIndex;

function chameleonMenu_init(isEnabled) {
    if (isEnabled) {
        setMenuColor(); /* trigger the event on enabling without scrolling */
        window.addEventListener("scroll", setMenuColor);
    } else if (!isEnabled) {
        window.removeEventListener("scroll", setMenuColor);
        currentSectIndex = undefined;
    }
}

function setMenuColor() {
    var sections = document.getElementsByClassName("section"); /* collect every section */
    for (var i = 0; i < sections.length; i++) {
        if ((currentSectIndex != i) && ((sections[i].getBoundingClientRect().top < 42 && sections[i].getBoundingClientRect().top > -1) || (sections[i].getBoundingClientRect().bottom > 66 && sections[i].getBoundingClientRect().bottom < sections[i].getBoundingClientRect().height))) { //Need to change hardcoded values here

            /* Pick current bg color */
            var currentBgColor = window.getComputedStyle(sections[i], null).getPropertyValue("background-color");
            /* Set new colors */
            forEach(document.getElementsByClassName("chameleon-menu"), function() { this.style.color = currentBgColor; });
            forEach(document.getElementsByClassName("line"), function() { this.setAttribute("stroke", currentBgColor); });

            currentSectIndex = i; /* keep track of current section to avoid unnecessary recoloring */
        }
    }
}

/* switch buttons functionality */
function switch_init() {
    var switches = document.getElementsByClassName("cmd-toggle");
    for (var i = 0; i < switches.length; i++) {
        switches[i].onclick = switchClass;
    }

    function switchClass(e) {
        var menu = document.getElementsByTagName("nav");
        if (e.target.id == "chameleon-toggle") { /* toggles chameleon functionality */
            if (e.target.checked) {
                forEach(menu, function() { this.classList.add("chameleon-menu"); });
                chameleonMenu_init(true);
            } else {
                forEach(menu, function() { this.classList.remove("chameleon-menu"); });
                chameleonMenu_init(false);

                /* Reset Color */
                forEach(menu, function() { this.style.color = "#666"; });
                forEach(document.getElementsByClassName("line"), function() { this.setAttribute("stroke", "#666"); });
            }
        } else if (e.target.id == "align-toggle") { /* controls menu alignment */
            if (e.target.checked) {
                forEach(menu, function() { this.classList.add("right-menu"); });
                forEach(menu, function() { this.classList.remove("left-menu"); });
            } else {
                forEach(menu, function() { this.classList.add("left-menu"); });
                forEach(menu, function() { this.classList.remove("right-menu"); });
            }
        }
    }
}

/* Utility: just in case more than one menu is needed - shorthand for for loops */
function forEach(nodeList, callback) {
    for (var i = 0; i < nodeList.length; i++) {
        callback.call(nodeList[i]);
    }
}

// DISCLAIMER: This function does require jQuery. I've used it here because the project I'm building this for already uses jQuery, so I thought why not. It can be modified quite simply to be done in raw JavaScript.  Just thought I'd let you know.




// This is the funtion you need to copy
// Copy from line 9 to 34

function autoType(elementClass, typingSpeed) {
    var thhis = $(elementClass);
    thhis.css({
        "position": "relative",
        "display": "inline-block"
    });
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".text-js");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function() {
        thhis.css("opacity", 1);
        thhis.prev().removeAttr("style");
        thhis.text("");
        for (var i = 0; i < amntOfChars; i++) {
            (function(i, char) {
                setTimeout(function() {
                    newString += char;
                    thhis.text(newString);
                }, i * typingSpeed);
            })(i + 1, text[i]);
        }
    }, 800);
}

$(document).ready(function() {
    // Now to start autoTyping just call the autoType function with the 
    // class of outer div
    // The second paramter is the speed between each letter is typed.   
    autoType(".type-js", 100);
});


// timer

(function() {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let birthday = "Sep 30, 2021 00:00:00",
        countDown = new Date(birthday).getTime(),
        x = setInterval(function() {

            let now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            //do something later when date is reached
            if (distance < 0) {
                let headline = document.getElementById("headline"),
                    countdown = document.getElementById("countdown"),
                    content = document.getElementById("content");

                headline.innerText = "It's my birthday!";
                countdown.style.display = "none";
                content.style.display = "block";

                clearInterval(x);
            }
            //seconds
        }, 0)
}());


// slow scroll


$('.single-item').slick();