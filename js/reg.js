// 常用reg

const reg = {
  "中文": /[\u4e00-\u9fa5]/mg,

  "双字节字符": /[^\x00-\xff]/img,

  "整数": /^-?[1-9]\d*$/,

  "16进制色值": /^#[a-fA-F0-9]{6}$/,

  "图片": /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/,

  "压缩文件": /(.*)\.(rar|zip|7zip|tgz)$/,

  "ip": /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/,

  "邮编": /\d{6}/,

  "comment": /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg
}