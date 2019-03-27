'use strict';

var userName = prompt('Hello! What is your name? ');


if(userName){
  alert('Welcome to the site, ' + userName + '\nLets learn a little bit about me!');
  console.log('Welcome to the site, ' + userName);
}else{
  alert('You didn\'t enter a name but that is ok! \nLets learn a little bit about me!');
  console.log('You didn\'t enter a name but that is ok!');
}


/* Arrays */
//Questions
var questionArray = ['Do I have a dog?', 'Was I in the Army?', 'Am I Married?', 'Am I from Seattle?', 'Do I like to cardio?', 'What is my favorite number? (Hint: its between 0-∞)', 'What counties have I lived in besides the United States?'];
//Answers
var answerArray = [true, true, false, false, false, 23, ['iraq', 'afghanistan']];
//List of yes answers
var listOfYes = ['yes', 'y', 'yea', 'ya', 'yaw', 'yeehaw', 'correct', 'absolutely'];

var userResponse;
//this variable holds HTML data to build list of questions
var questionTextToHTML = '';

//Loop for questions and reponses
var i = 0;
var attempts = 0; //for attempts on guessing questions
var numberOfAttempts = 4;
while(i < questionArray.length){
  var completeAnswer = false; //validates when to add questions to HTML

  //prompts user for information based on question 
  userResponse = prompt(questionArray[i]);

  if(userResponse)
  {
    /*This first section is for evaluating the questions and coloring them */

    //This checks to see if the answer is in the yes list (everything is lowercase)
    //this will return a true or false(if its in the list its yes) and compares with
    //the answer
    //This takes care of the first questions with a simple boolean answer
    if(i < 5){
      if((listOfYes.indexOf(userResponse.toLowerCase()) >= 0) === answerArray[i]){
        alert('You, are right!');
        questionTextToHTML += '<li style=\'background: green;\'>';
      }else{
        alert('No, that was incorrect');
        questionTextToHTML += '<li style=\'background: red;\'>';
      }
      completeAnswer = true; //only one chance!
    }else if(i === 5 || i === 6){ //evaluating the number guessing
      //track if the guess was true or false
      var incorrect = true;
      //adjust attempt limit based on question
      numberOfAttempts = (i === 5) ? 4 : 6;
      if(attempts < numberOfAttempts){
        //if correct
        if((i === 5 && Number(userResponse)) === answerArray[i] ||
        (i === 6 && answerArray[i].indexOf(userResponse.toLowerCase()) >=0))
        {
          alert('You, are right!');
          incorrect = false;
          //color correct answer
          questionTextToHTML += '<li style=\'background: green;\'>';
          completeAnswer = true; //if they guess correct they would have finished!
        }else{
          alert('No, that was incorrect!' +
          ((i === 5) ? ((Number(userResponse)>answerArray[i]) ? ' you guessed too high!' : ' you guessed to low!') : '') +
          ((attempts<numberOfAttempts) ? ', Try Again!' : ', You failed all attempts'));
        }
        attempts++;
      }
      if(incorrect && !(attempts < numberOfAttempts)){
        //color incorrect answer
        questionTextToHTML += '<li style=\'background: red;\'>';
        //after all failed attempts
        completeAnswer = true; //set to true this would be completed
      }
    }else{
      console.log('WTF');
    }

    
  }else{
    alert('You Didn\'t answer that question, but that is ok!');
    userResponse = 'Did not Answer';
    
    //special case for looped guessing
    if((i===5 || i===6) && attempts < numberOfAttempts){
      attempts++;
    }else{
      questionTextToHTML += '<li style=\'background: yellow;\'>';
      //if we get here these didn't answer or didn't answer on the final question
      completeAnswer = true;
    }
  }

  /*-- THIS PORTION IS FOR WRITING THE QUESTIONS INTO THE HTML --*/
  if(completeAnswer){
    if(i < 5){
      //This line of code takes the variable and converts them to HTML for a list item
      //This ternary operator changes the true false of the answer to a yes or no
      questionTextToHTML += questionArray[i] + ' ' + (answerArray[i] ? 'Yes' : 'No') + '</li>';
    }else if(i === 5){
      questionTextToHTML += questionArray[i] + ' ' + answerArray[i] + '</li>';
    }else if(i === 6){
      questionTextToHTML += questionArray[i] + ' ' + answerArray[i] + '</li>';
    }else{
      console.log('What a Terrible Failure!');
    }
    //console log answer to questions and responses
    console.log(questionArray[i] + ' ' + answerArray[i] + ' ' + userName + ' answered: ' + userResponse);
    //increment to next question
    i++;
    //reset attempts for next question (5 and 6)
    attempts = 0;
  }
}
console.log(questionTextToHTML);
document.getElementById('questions').innerHTML = questionTextToHTML;
