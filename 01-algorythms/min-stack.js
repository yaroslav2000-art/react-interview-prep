class MinStack {
  constructor() {
    this.arr = [];
    this.minStack = [];
    //this.minValue = { index: -1, value: Infinity };
  }

  push(value) {
    this.arr.push(value);
    if (
      this.minStack.length === 0 ||
      value <= this.minStack[this.minStack.length - 1] //<= instead of < for tracking duplicates: f.e. push(5), push(5)
    ) {
      this.minStack.push(value);
    }
    // this.minValue =
    //   value < this.minValue.value
    //     ? {
    //         ...this.minValue,
    //         index: this.minValue.index < 0 ? 0 : this.arr.length - 1,
    //         value: value,
    //       }
    //     : this.minValue;
  }

  pop() {
    if (
      this.arr[this.arr.length - 1] === this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.pop();
    }
    this.arr.pop();
  }

  top() {
    return this.arr[this.arr.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

MinStack.prototype.push = function (value) {};

MinStack.prototype.pop = function () {};

MinStack.prototype.top = function () {};

MinStack.prototype.getMin = function () {};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(value)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
