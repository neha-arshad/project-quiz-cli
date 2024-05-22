#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
import chalkanimation from "chalk-animation";
const sleep = async (ms = 2000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const wellcome = chalkanimation.rainbow("\t✨✨ WELCOME TO THE QUIZ..\n");
await sleep();
wellcome.stop();
//console.log(chalk.italic.bold.blueBright("\t✨✨ WELCOME TO THE QUIZ..\n"));
console.log(chalk.bold.italic.magentaBright("Please answer the following questions..\n"));
console.log(chalk.bold.italic.blueBright("\tYou will be given 5 questions..\n"));
console.log(chalk.bold.italic.magentaBright("\tYou will be given 4 options..\n"));
const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let quizData = await fetchQuiz.json();
    return quizData.results;
};
let data = await fetchData(apiLink);
//console.log(data.result);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter your name"
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt([
            {
                name: "ans",
                type: "list",
                message: data[i].question,
                choices: answers.map((val) => val),
            },
        ]);
        if (ans.ans == data[i].correct_answer) {
            score++;
            console.log(chalk.italic.bold.bgMagentaBright("correct  ✅\n"));
        }
        else {
            console.log(chalk.italic.bold.bgBlueBright("incorrect  ❌\n"));
        }
    }
    console.log(`Dear ${chalk.italic.bold.blueBright(name.name)}, your correct answer is ${chalk.bold.red(score)}, out of ${chalk.bold.red("5")}`);
};
startQuiz();
