#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";

//DYNAMIC
 let correctCount : number = 0;
 let incorrectCount: number = 0;

 // Array of questions
 const questions  = [
     {
         message: "When did Pakistan come into being?",
         choices: ["1947", "1965", "1782", "2004"],
         correctAnswer: "1947"
     },
     {
        message: "Which language is TypeScript compiled to?",
        choices: ["C#", "React.js", "JavaScript", "HTML"],
        correctAnswer: "JavaScript"
    },
    {
        message: "Which language is used to styling?",
        choices: ["C#", "CSS", "JavaScript", "HTML"],
        correctAnswer: "CSS"
    },
    
];

// for Loop through each question
for (const question of questions) {
    const userAnswer = await inquirer.prompt([
			{
        name: "question", // Dynamically generate name for each question
        type: "list",
        message: question.message,
        choices: question.choices
			}
]);

    // Check if user's answer is correct
    if (userAnswer[`question`] === question.correctAnswer) {
        console.log(chalk.italic.bgBlueBright(`correct✅\n`));
        correctCount++;
    } 
		else {
         console.log(chalk.italic.bgBlue(`incorrect❌\n`));
        incorrectCount++;
    }
}

console.log(
  chalk.bold.bgMagentaBright(`Your Correct ✅ Answers: ${correctCount}...\n`)
);
console.log(chalk.bold.red(` Your Incorrect ❌ Answers: ${incorrectCount}...\n`));

if(incorrectCount<correctCount){
    console.log(
      chalk.italic.blueBright("congratulations🎉🥳 .. you pass the quiz")
    );
}
else{
    
    console.log(chalk.red("Oppss😥..you don't qualified quiz"));
}