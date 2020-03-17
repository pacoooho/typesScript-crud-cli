export class TaskItem {
    public constructor (
        public id: number,
        public task: string,
        public complete: boolean =false
    ){

    }
    printDdetails ():void {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }


}