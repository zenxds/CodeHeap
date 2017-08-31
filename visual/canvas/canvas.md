
当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。

```
// 填充三角形
ctx.beginPath();
ctx.moveTo(25,25);
ctx.lineTo(105,25);
ctx.lineTo(25,105);
ctx.fill();

// 描边三角形
// 如果没有添加闭合路径closePath()，则只绘制了两条线段，并不是一个完整的三角形。
ctx.beginPath();
ctx.moveTo(125,125);
ctx.lineTo(125,45);
ctx.lineTo(45,125);
ctx.closePath();
ctx.stroke();
```

```
fillStyle
strokeStyle

globalAlpha 

lineWidth = value
lineCap = type            // 设置线条末端样式
lineJoin = type           // 设定线条与线条间接合处的样式
miterLimit = value        // 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度
getLineDash()             // 返回一个包含当前虚线样式，长度为非负偶数的数组
setLineDash(segments)     // 设置当前虚线样式
lineDashOffset = value    // 设置虚线样式的起始偏移量

createLinearGradient(x1, y1, x2, y2)
createRadialGradient(x1, y1, r1, x2, y2, r2)
gradient.addColorStop(position, color)

ctx.shadowOffsetX
ctx.shadowOffsetY
ctx.shadowBlur
ctx.shadowColor

fillText(text, x, y [, maxWidth])
strokeText(text, x, y [, maxWidth])
font = value
textAlign = value
textBaseline = value
direction = value

save()
restore()

一个绘画状态包括：
* 当前应用的变形（即移动，旋转和缩放，见下）
* strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation 的值
* 当前的裁切路径（clipping path），会在下一节介绍

translate
rotate
scale
transform
setTransform
resetTransform

globalCompositeOperation

getImageData
createImageData
toDataURL
toBlob

// 点击区域
ctx.addHitRegion
```