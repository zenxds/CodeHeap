## 静态检查

* eslint

## 单元测试

* jsmine
* mocha
* ava
* jest

## 断言

* assert
* chai
* expect.js
* should

## 覆盖率测试

* istanbul
* karma-coverage

## 浏览器环境测试

* PhantomJS/Casperjs
* Selenium/webdriver/nightwatch
* karma

## 其他

* rewire/rewire-webpack
* supertest
* sinonjs

## 持续集成

* cise(in alibaba)
* travis-ci
* gitlab-ci


## 关于代码

* 软件的质量不是测试出来的，而是设计和维护出来的

* 测试需要测试的代码，那种一眼看上去就没有问题的代码可以不测

* 编写纯函数：该函数所有的输入都是显示的（无隐含输入）

比如

```
function isSmallScreen() {
    return screen.width < 500
}
```
依赖了screen.width，这样如果在小屏上出现什么问题，就需要开一个真实的浏览器测试

* 函数要有输入输出

方便测试函数是否正确工作