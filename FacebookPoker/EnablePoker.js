// Copyright (c) 2015 Jorel Ali. All rights reserved.

console.log("Facebook Auto poker has started");
runningThread = setInterval(function() {
		var pokeButtons = document.getElementsByClassName('_42ft _4jy0 _4jy3 _4jy1 selected _51sy');
		for(i = 0; i < pokeButtons.length; i++) {
			if(pokeButtons[i].text == "Poke back") {
				pokeButtons[i].click();
			}
		}
	}, 5000);