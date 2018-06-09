var mainRunning = false;
var refreshIntervalId = null;
function mainStarter(){
	if (!mainRunning){
		mainRunning = true;
		main();
	}
	else {
		try{
			clearInterval(refreshIntervalId);
			mainRunning = true;
			main();
		}
		catch(err){
			console.log(err);
		}
	}
}
function focusOnTextBox(){
	document.getElementById('textarea').focus();
}
function main(){
	  var sentenceLength = 10;
		  function createSentence(){
		var resultString = '';
		for (var i = 0; i < sentenceLength; i++){
			wordIndex = Math.floor(Math.random() * 900);
			resultString += wordList[wordIndex] + ' ';
		}
		var sliced = resultString.slice(0,-1) + '.';
		return sliced;
	}
	document.getElementById('textarea').value = '';
	document.getElementById('typedString').value = '';
	var desiredString = createSentence();
	document.getElementById('desiredString').innerHTML = desiredString;
	var timer= -2
	var time = document.getElementById('timer');
	var textInput = document.getElementById('textarea').value;
	var counter = 0;
	function checkIfCorrect(){
		if (counter%20==0){
			timer++;
			if (timer>-1){
				time.innerHTML = 'Time elapsed: '+String(timer);
			}
		}
		counter++;
		// console.log(desiredString);
		// console.log(document.getElementById('textarea').value);
		textInput = document.getElementById('textarea').value;
		typedLetters = textInput.length;
		if (textInput == desiredString.slice(0,typedLetters)){
			document.getElementById('typedString').innerHTML = textInput;
		}
		//console.log(textInput.slice(0,typedLetters));
		if (desiredString == textInput){
			clearInterval(refreshIntervalId);
			time.innerHTML = 'Finished! Time: '+ String(timer) + 'sec';
			time.innerHTML += '<br>WPM: ' + String(Math.floor((60*sentenceLength)/timer));
			mainRunning = false;
		}

		document.getElementById('desiredString').innerHTML = desiredString;
	}
	refreshIntervalId = setInterval(checkIfCorrect, 50);

}
