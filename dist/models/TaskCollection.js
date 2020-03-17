"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskItem_1 = require("./TaskItem");
class TaskCollection {
    constructor(username, taskItems = []) {
        this.username = username;
        this.taskItems = taskItems;
        this.nextId = 1;
        this.taskMap = new Map();
        taskItems.forEach(item => {
            this.taskMap.set(item.id, item);
        });
    }
    addTask(task) {
        while (this.getTaskById(this.nextId)) {
            this.nextId++;
        }
        const newTask = this.taskMap.set(this.nextId, new TaskItem_1.TaskItem(this.nextId, task));
        return this.nextId;
    }
    getTaskItems(includeComplete) {
        return [...this.taskMap.values()]
            .filter(task => includeComplete || !task.complete);
    }
    getTaskById(id) {
        return this.taskMap.get(id);
    }
    markComplete(id, complete) {
        const taskItem = this.getTaskById(id);
        if (taskItem) {
            taskItem.complete = complete;
        }
    }
    removeComplete() {
        this.taskMap.forEach(item => {
            if (item.complete) {
                this.taskMap.delete(item.id);
            }
        });
    }
    getTaskCounts() {
        return {
            total: this.taskMap.size,
            incomplete: this.getTaskItems(false).length
        };
    }
}
exports.TaskCollection = TaskCollection;
