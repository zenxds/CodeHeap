# package

* [async-validator](https://github.com/yiminghe/async-validator/) 表单校验
* multer 文件上传
* nunjucks 模板引擎

## nodejs-license-file

```
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## registry

```
npm set registry https://registry.npm.taobao.org \ 
&& yarn config set registry https://registry.npm.taobao.org \ 
&& npm set disturl https://npm.taobao.org/dist \ 
&& npm set chromedriver_cdnurl http://cdn.npm.taobao.org/dist/chromedriver \ 
&& npm set operadriver_cdnurl http://cdn.npm.taobao.org/dist/operadriver \ 
&& npm set phantomjs_cdnurl http://cdn.npm.taobao.org/dist/phantomjs \ 
&& npm set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents \ 
&& npm set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass \ 
&& npm set electron_mirror http://cdn.npm.taobao.org/dist/electron/ 
```