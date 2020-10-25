//select to start game
document.querySelector('.button-start').onclick = function () {
	'use strict';

	let playName = prompt('What\'s You\'re Name??');

	//check the input name is empty
	if (playName == null || playName == "") {

		playName = 'unKnown';
	}

	document.querySelector('.name span').innerHTML = playName;

	//remove the splash window
	document.querySelector('.button-start').remove();

}

//effect duration
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);
//Create the order key
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

//add the css propertry(order) into block

blocks.forEach((block, index) => {

	block.style.order = orderRange[index];


	// Add Click Event
	block.addEventListener('click', function () {

		// Trigger The Flip Block Function
		flipBlock(block);


	});

});



//shuffle function

function shuffle(array) {
	let current = array.length,
		temp,
		random;


	while (current > 0) {

		//        get random number 
		random = Math.floor(Math.random() * current);
		//        decreae current 
		current--;


		//        swap the value of variable

		//        store the current value in stash
		temp = array[current];
		//        assign the current to random number
		array[current] = array[random];

		array[random] = temp;

	}
	return array;
}

//flipped function
function flipBlock(selectedBlocks) {

	//add class in this element
	selectedBlocks.classList.add('is-flipped');

	//	  collect all flipped card
	let allFlipped = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

	//	check there is two flipped card or not
	if (allFlipped.length === 2) {

		//		stopped clicked function
		stopClicking();
		//		//		check Matched card
		checkMatchingBlock(allFlipped[0], allFlipped[1]);


	}

}

//stop clicking function

function stopClicking() {

	//	add class to the main container not click
	blocksContainer.classList.add('no-clicking');

	setTimeout(() => {


		//	remove class to the main container not click
		blocksContainer.classList.remove('no-clicking');

	}, duration);


}

//check if the two block matching

function checkMatchingBlock(firstBlock, secondBlock) {

	let triesElement = document.querySelector('.triesNum span');


	if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

		firstBlock.classList.remove('is-flipped');
		secondBlock.classList.remove('is-flipped');

		firstBlock.classList.add('has-match');
		secondBlock.classList.add('has-match');

		//		to play the win music
		document.querySelector('#success').play();



	} else {

		triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

		setTimeout(() => {
			firstBlock.classList.remove('is-flipped');
			secondBlock.classList.remove('is-flipped');
		}, duration);
		
		//		to play the fal music
		document.querySelector('#fail').play();
		
	}
}
