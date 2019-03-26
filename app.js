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
var questionArray = ['Do I have a dog?', 'Was I in the Army?', 'Am I Married?', 'Am I from Seattle?', 'Do I like to cardio?'];
//Answers
var answerArray = [true, true, false, false, false]
//List of yes answers
var listOfYes = ['yes', 'y', 'yea', 'ya', 'yaw', 'yeehaw', 'correct', 'absolutely']

var userResponse;
//this variable holds HTML data to build list of questions
var questionTextToHTML = '';

//Loop for questions and reponses
for(var i = 0; i < questionArray.length; i++){
  userResponse = prompt(questionArray[i]);

  if(userResponse)
  {
    //This checks to see if the answer is in the yes list (everything is lowercase)
    //this will return a true or false(if its in the list its yes) and compares with
    //the answer
    if((listOfYes.indexOf(userResponse.toLowerCase()) >= 0) === answerArray[i]){
      alert('You, are right!');
      questionTextToHTML += '<li style=\'background: green;\'>';
    }else{
      alert('No, that was incorrect');
      questionTextToHTML += '<li style=\'background: red;\'>';
    }
    
  }else{
    alert('You Didn\'t answer that question, but that is ok!');
    userResponse = "Did not Answer"
    questionTextToHTML += '<li style=\'background: yellow;\'>';
  }
  //This line of code takes the variable and converts them to HTML for a list item
  //This ternary operator changes the true false of the answer to a yes or no
  questionTextToHTML += questionArray[i] + ' ' + (answerArray[i] ? 'Yes' : 'No') + '</li>';

  console.log(questionArray[i] + ' ' + answerArray[i] + ' ' + userName + ' answered: ' + userResponse);
}
console.log(questionTextToHTML);
document.getElementById('questions').innerHTML = questionTextToHTML;