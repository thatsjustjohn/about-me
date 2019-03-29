'use strict';


//1 second delay to render HTML before executing javascript
setTimeout(function(){
  //your code here
  websiteGameFunctionality();
}, 1000);

function websiteGameFunctionality(){

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
  var correctQuestions = 0; //correct answer counter
  var totalNumOfQuestions = questionArray.length;
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
          questionTextToHTML += colorListHTML(1);
          correctQuestions++;
        }else{
          alert('No, that was incorrect');
          questionTextToHTML += colorListHTML(0);
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
            questionTextToHTML += colorListHTML(1);
            completeAnswer = true; //if they guess correct they would have finished!
            correctQuestions++;
          }else{
            alert('No, that was incorrect!' +
            ((i === 5) ? ((Number(userResponse)>answerArray[i]) ? ' you guessed too high!' : ' you guessed to low!') : '') +
            ((attempts<numberOfAttempts) ? ', Try Again!' : ', You failed all attempts'));
          }
          attempts++;
        }
        if(incorrect && !(attempts < numberOfAttempts)){
          //color incorrect answer
          questionTextToHTML += colorListHTML(0);
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
        questionTextToHTML += colorListHTML(2);
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
  console.log(correctQuestions + ':' + totalNumOfQuestions);
  console.log(questionTextToHTML);
  var resultColor = (correctQuestions/totalNumOfQuestions > .60) ? 'green' : 'red';
  document.getElementById('results').setAttribute('style', `color: ${resultColor};`);
  document.getElementById('results').innerText = `${userName} here are your results ${correctQuestions} : ${totalNumOfQuestions}`;
  document.getElementById('questions').innerHTML = questionTextToHTML;
}

//0 is wrong 1 is correct 2 is unanswered  This styles the list items accordingly
function colorListHTML(colorCode){
  if(colorCode === 0){
    return '<li style=\'background: red;\'>';
  }else if(colorCode === 1){
    return '<li style=\'background: green;\'>';
  }else{
    return '<li style=\'background: yellow;\'>';
  }

}
