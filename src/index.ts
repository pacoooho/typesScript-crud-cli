import inquirer from 'inquirer';
import moduleName from 'lowdb';
import { tasks } from './exempleData';

//import { TaskCollection } from './models/TaskCollection';
// const collection = new TaskCollection('paco', tasks);

import { JsonTaskCollection } from './models/jsonTaskCollection';
const collection = new JsonTaskCollection('paco', tasks);

let showCompleted: boolean = true;
// console.log(collection.getTaskItems(false).forEach(task => task.printDdetails()));


function displayTaskList() {
    console.log(`${collection.username}'s Tasks` + `(${collection.getTaskCounts().incomplete} task to do)`);
    collection.getTaskItems(showCompleted).forEach(task => task.printDdetails());

}
enum Commands {
    Add = "Add New Task",
    Complete = "Complete Task",
    Toggle = "Show/hide Completed",
    Purge = "Remove Completed Tasks",
    Quit = "Quit"
}

async function promptAdd(): Promise<void> {
    console.clear();
    const answers = await inquirer.prompt({
        type: 'input',
        name: 'add',
        message: 'Enter Task:'
    });
    if (answers["add"] != '') {
        collection.addTask(answers['add']);
    }

    promptUser();
}

async function promptComplete(): Promise<void> {
    console.clear();
    const answers = await inquirer.prompt({
        type: 'checkbox',
        name: 'complete',
        message: 'Mark Task Complete',
        choices: collection.getTaskItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    });
    let completedTasks = answers['complete'] as number[];
    collection.getTaskItems(true)
        .forEach(item => collection.markComplete(
            item.id,
            completedTasks.find(id => id === item.id) != undefined)
        );
      promptUser();  
}

async function promptUser() {
    console.clear();
    displayTaskList();

    const answer = await inquirer.prompt({
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
                if (collection.getTaskCounts().incomplete > 0){
                    promptComplete();
                }else {
                    promptUser()
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