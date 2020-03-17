"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const exempleData_1 = require("./exempleData");
//import { TaskCollection } from './models/TaskCollection';
// const collection = new TaskCollection('paco', tasks);
const jsonTaskCollection_1 = require("./models/jsonTaskCollection");
const collection = new jsonTaskCollection_1.JsonTaskCollection('paco', exempleData_1.tasks);
let showCompleted = true;
// console.log(collection.getTaskItems(false).forEach(task => task.printDdetails()));
function displayTaskList() {
    console.log(`${collection.username}'s Tasks` + `(${collection.getTaskCounts().incomplete} task to do)`);
    collection.getTaskItems(showCompleted).forEach(task => task.printDdetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "Show/hide Completed";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
async function promptAdd() {
    console.clear();
    const answers = await inquirer_1.default.prompt({
        type: 'input',
        name: 'add',
        message: 'Enter Task:'
    });
    if (answers["add"] != '') {
        collection.addTask(answers['add']);
    }
    promptUser();
}
async function promptComplete() {
    console.clear();
    const answers = await inquirer_1.default.prompt({
        type: 'checkbox',
        name: 'complete',
        message: 'Mark Task Complete',
        choices: collection.getTaskItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    });
    let completedTasks = answers['complete'];
    collection.getTaskItems(true)
        .forEach(item => collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
    promptUser();
}
async function promptUser() {
    console.clear();
    displayTaskList();
    const answer = await inquirer_1.default.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose Option',
        choices: Object.values(Commands)
    });
    // console.log(answer);
    switch (answer["command"]) {
        case Commands.Toggle:
            showCompleted = !showCompleted;
            promptUser();
            break;
        case Commands.Add:
            promptAdd();
            break;
        case Commands.Complete:
            if (collection.getTaskCounts().incomplete > 0) {
                promptComplete();
            }
            else {
                promptUser();
            }
            break;
        case Commands.Purge:
            collection.removeComplete();
            promptUser();
            break;
    }
}
promptUser();
//
