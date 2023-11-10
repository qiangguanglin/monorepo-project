class TaskPro {
  _taskList: Function[]; // 任务列表
  _isRunning: boolean; // 判断是否正在运行，正在运行后续的run函数则直接退出
  _currentIndex: number; // 取出第几个任务
  _next: () => Promise<void>; // 执行下一个任务
  constructor() {
    this._taskList = [];
    this._isRunning = false;
    this._currentIndex = 0;
    this._next = async () => {
      this._currentIndex++;
      await this._runTask();
    };
  }
  addTask(task: Function) {
    this._taskList.push(task);
  }
  run() {
    if (this._isRunning || !this._taskList.length) {
      return;
    }
    this._isRunning = true;
    this._runTask();
  }
  async _runTask() {
    if (this._currentIndex >= this._taskList.length) {
      this._reset();
      return;
    }
    const i = this._currentIndex;
    const task = this._taskList[this._currentIndex];
    await task(this._next);
    const j = this._currentIndex;
    if (i === j) {
      // 判断是否手动调用next函数，没有调用的话，则执行前后的任务index是一致的，则需要函数内部调用一次next
      await this._next();
    }
  }
  _reset() {
    this._taskList = [];
    this._isRunning = false;
    this._currentIndex = 0;
  }
}

const T = new TaskPro();

T.addTask(async (next: () => Promise<void>) => {
  console.log(1, "start");
  await next();
  console.log(1, "end");
});

T.addTask(() => {
  console.log(2);
});

T.addTask(() => {
  console.log(3);
});

T.run(); // 1 start, 2, 3, 1 end
