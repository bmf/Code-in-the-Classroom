var uppercase = true;

function toggleCase() {
    if (uppercase) {
        uppercase = false;
        $("#caseToggle").html("Toggle UpperCase");
        $( "#originalText" ).html($( "#originalText" ).html().toLowerCase());
    } else {
        uppercase = true;
        $("#caseToggle").html("Toggle LowerCase");
        $( "#originalText" ).html($( "#originalText" ).html().toUpperCase());
    }
    if (soundOn) speakWord(baseWord);
}

var serifFont = true;

function toggleFont() {
    if (serifFont) {
        serifFont = false;
        document.getElementById("originalText").style.fontFamily = "Arial,sans-serif";
        document.getElementById("fontToggle").innerHTML = "Serif Font";
    } else {
        serifFont = true;
        document.getElementById("originalText").style.fontFamily = "lucida grande";
        document.getElementById("fontToggle").innerHTML = "Sans-Serif";
    }
}

var soundOn = true;

function toggleSound() {
    if (soundOn) {
        soundOn = false;
        document.getElementById("soundToggle").innerHTML = "Sound On";
    } else {
        soundOn = true;
        document.getElementById("soundToggle").innerHTML = "Sound Off";
    }
}

function speakWord(word) {
    if (soundOn) window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
}

function getBrightHex() {
    var hexvals = ["8", "9", "A", "B", "C", "D", "E", "F"];
    currHexVal = "#";
    for(i = 0; i < 6; i++) {
        idx = Math.floor(Math.random() * 7); //picks a num 0 to 14
        currHexVal += hexvals[idx];
    }
    return currHexVal;
}

function getDarkHex() {
    var hexvals = ["0", "1", "2", "3", "4", "5", "6", "7"];
    currHexVal = "#";
    for(i = 0; i < 6; i++) {
        idx = Math.floor(Math.random() * 7); //picks a num 0 to 14
        currHexVal += hexvals[idx];
    }
    return currHexVal;
}

var timeRunning = 0;

var bounceCharFunction;
var bounceChar = function() {
    $('.currentLetter').css({'left':($('#originalText').position().left - 10) + 'px', 'top':($('#originalText').position().top - 20) + 'px'}).animate({top: '+=' + 5}, 200, 'easeOutBounce').animate({top: '-=' + 5}, 200, 'easeOutBounce');
    setTimeout(bounceChar, 400 );
}

$(function(){

	var characterArray = $('#originalText').text().split("");
    $('body').append('<span class="currentLetter">' + characterArray[0] + '</span>');
    //bounceCharFunction = bounceChar();
    bounceChar();

	$(window).keydown(function(e){

		if(String.fromCharCode(e.keyCode).toUpperCase() == characterArray[0]){

			alphacolor = getBrightHex();
			document.getElementById("originalText").style.color = alphacolor;

			backgroundcolor = getDarkHex();
			document.body.style.background = backgroundcolor;

			speakWord(characterArray[0]);

			if(characterArray.length == 26){
				var timer = setInterval(function(){
					timeRunning += 0.01;
					$('#time').text('Time: ' + timeRunning.toFixed(3));
				}, 10);
			}

			$('body').append('<span class="staticLetter">' + characterArray[0] + '</span>');

            $('.staticLetter').css({'left':$('#originalText').position().left + 'px', 'top':$('#originalText').position().top + 'px'}).animate({top: '+=' + 300}, 500, 'easeOutBounce').fadeOut('slow');

            $('.currentLetter').remove();

            characterArray.shift();

			$('#originalText').text(characterArray.join().replace(/,/g, ''));

            //$('#originalText').text().charAt(0).animate({ top: "+=100px" }, 400, "easeOutBounce");
            //$('#originalText').animate({ top: "+=100px" }, 400, "easeOutBounce");

			if(characterArray.length == 0) {
				alert('You typed the alphabet in ' + timeRunning.toFixed(3) + ' seconds!!\n\nREFRESH TO PLAY AGAIN');
            } else {
                $('body').append('<span class="currentLetter">' + characterArray[0] + '</span>');
                //bounceCharFunction = bounceChar();
                bounceChar();
            }
		}
	});
});
