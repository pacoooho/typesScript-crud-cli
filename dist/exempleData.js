"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskItem_1 = require("./models/TaskItem");
exports.tasks = [
    new TaskItem_1.TaskItem(1, 'Task 1'),
    new TaskItem_1.TaskItem(2, 'Task 2'),
    new TaskItem_1.TaskItem(3, 'Task 3'),
    new TaskItem_1.TaskItem(4, 'Task 4', true)
];
