"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskItem {
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
    }
    printDdetails() {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }
}
exports.TaskItem = TaskItem;
