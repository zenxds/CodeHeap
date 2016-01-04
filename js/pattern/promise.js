var a = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(3000);
    }, 3000);
});

/**
 * promise2 = promise1.then(onFulfilled, onRejected)
 * then 参数是函数 or not
 * then的参数，理论上应该是一个promise函数，即是一个return Promise对象的函数
 * 如果不是函数，其必须被忽略
 *
 * then 方法必须返回一个 promise 对象
 * 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
 * 相当于做了个拷贝

 * onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值）, 也就是说在严格模式（strict）中，函数 this 的值为 undefined ；在非严格模式中其为全局对象。
 *
 * 在函数体里 return Promise, 同步值 or throw error
 */

// 以Promise作为返回值的函数，称为promise函数
// 正确的用法应该是这样的

function fun1() {
     return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve();
        },1000)
    })
}

// 如果不喜欢，还可以使用defer风格
// var defer = Promise.defer()
//



// Promise.all()会以一个 promises 数组为输入，并且返回一个新的 promise。这个新的 promise 会在数组中所有的 promises 都成功返回后才返回。他是异步版的 for 循环。

// Promise.resolve()来简化

// 少用then() 的第二个参数，而是总是使用 catch()

// 不要忘了最后的catch
// a().then(function() { retunr promiseA; }).then(function() { retunr promiseB; }).catch()