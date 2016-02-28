//LOOK INTO PASSING THE UPDATEDRANGE INTO GENERATOR
//I THINK THATLLMEAN HAVING A SEPARATE INTITIAL GENERATOR AND A SECOND GENERATOR
//IF ALREADY SELECTED, DON'T ALLOW TO SELECT AGAIN (IT ADDS TO CURRENT AMOUNT)

$(document).ready(init);

function init() {
	var $display = $('#display');
	generator();
	$('button.reset').click(reset);
	$('button.num').click(selector);
	$('button.submit').click(submission);
}
//next 3 variables used by generator function and submission function
var fullRange = [1,2,3,4,5,6,7,8,9];
var updatedRange = fullRange; //seek to update once buttons become disabled.
var randomConstrictor = updatedRange.reduce(function(a,b) {
	return a+b
});

//random variables I'm using.
var totalOfSelected = 0;
var valueOfSelected = 0;
var resets = 3;
var arrayOfSubmitted = [];
var showAmount = 0;

//generates a random number with range 1 - sum of numbers in updated range;
function generator (){
	showAmount = Math.ceil(Math.random()*randomConstrictor);
	$('div.totalToAchieve').html("<p>Can you pick the numbers that sum up to " + showAmount + "?</p>");
}
//works just fine - gives new generated number;
function reset () {
	if(resets>0){
		generator();
		resets-=1;
		$('button.reset').html("<span>Good job, bozo! You only have "+ resets +" left!</span>");
	}
	else {
		lose();
	}
}
//works just fine - adds class 'selected' upon click and tallies their sum into totalOfSelected
function selector() {
	var $this = $(this);
	$this.addClass('selected');
	valueOfSelected = parseInt($this.text());
	totalOfSelected += valueOfSelected;
	$('div.currentTotal').html("<p>The current sum of the buttons you've selected are: " + totalOfSelected + ".</p>")
}
// WORKS AWESOME. I'M A BOSS!!!!!!
function submission () {
	checkWin();
	$('.selected').each(function(x){
			var $this = $(this);
			var value = parseInt($this.text());
			updatedRange.filter(function(x){
				var index = updatedRange.indexOf(x);
				if(x == value){
					updatedRange.splice(index,1);
				}
			});
			console.log(updatedRange);
			$this.toggle('.selected').removeClass('selected');
	});
	generator();
}

//works just fine! prints win/loss 
function checkWin () {
	if(totalOfSelected == showAmount) {
		$('div.result').html("YOU WON!!!!! didn't think you had it in you : )! jk : ) ");
	}
	else {
		lose();
	}
	totalOfSelected = 0;
}

function lose () {
	$('div.result').html("Too bad, SUCKA!!!! Try again!");
}




