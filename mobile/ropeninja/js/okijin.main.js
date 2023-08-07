///////////////////////////////////////////////////////////////////////////////
// file okijin.main.js
// Copyright (c) 2015 Frédéric J. Rézeau. All rights reserved.
///////////////////////////////////////////////////////////////////////////////

function startGame() {
    // Initialize the API.
    if (OkijinAPI) {
        OkijinAPI.initialize();
    }

    // Game events.
    var onGameLoading = function (percent) {
        console.log("onGameLoading: " + JSON.stringify(percent));
    };

    var onGameSessionStarted = function (session) {
        console.log("onGameSessionStarted: " + JSON.stringify(session));
        const score = localStorage.getItem("ropeninja_azure_userdata");
//        console.log(JSON.parse(score));
        const urlParams = new URLSearchParams(window.location.search);
		fetch("https://switchgames.onrender.com/updateScore", {method: "POST", body:JSON.stringify(
		{	    userId: urlParams.get("userId"),
			    score: session.score,
			    game_name: "ropeninja"
    	}	)}).then(console.debug);
		//};
		//setTimeout(onUpdate, 200);
//	    };
	//    setTimeout(onUpdate, 200);

    };

    var onGameSessionEnded = function (session) {
        console.log(session.score)
        console.log("onGameSessionEnded: " + JSON.stringify(session));
        if (OkijinAPI) {
            OkijinAPI.showInterstitial();
        }
    };

    var isDesktop = function () {
        if (OkijinAPI) {
            return OkijinAPI.isDesktop();
        }
        else {
            return false;
        }
    };

    // Initialize the game.
    var settings = {
        "root": OkijinAPISettings ? OkijinAPISettings.gameId : "",
        "onGameLoading": onGameLoading,
        "onGameSessionStarted": onGameSessionStarted,
        "onGameSessionEnded": onGameSessionEnded,
        "useHighResolution": isDesktop()
    };

    OkijinGame.initialize(settings);

    // Prevent scrolling when moving.
    $(document).on("touchmove", function (e) {
        "use strict";
        e.preventDefault();
    });
}

// Document has loaded.
$(document).ready(function () {
    "use strict";

    // Disable scrollbars.
    $("body").css("overflow", "hidden");
    // Remove outlines.
    $("body > *").css("outline", "none");

    $(".roundbox").corner();

    if (OkijinAPISettings && OkijinAPISettings.autoStart) {
        startGame();
    }
});

// Window is resized.
$(window).resize(function () {
    "use strict";
    if (OkijinGame.getCurrentGameState() ||
        // Bit hacky but to support legacy engine for zombies can't jump.
        (OkijinAPISettings && OkijinAPISettings.gameId === "zombiescantjump" && OkijinGame.getLogoTime())) {
        // Reset the display.
        OkijinGame.resetDisplay();
    }
});

// Provides requestAnimationFrame in a cross browser way. @author paulirish / http://paulirish.com/
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
        "use strict";
        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}
