//说明文档 为知 内链 scp 绘图组件文档说明 
// https://note.wiz.cn/web?dc=31672447-2dc0-4a7e-bce5-1d7f12a78a8b&kb=349e19ed-8019-4c52-8af6-648281b7eb58&cmd=km%2C
//canvas 绘图
//引入net文件
var net = require("./draw-canvas-net.js");
var drawCanvas = {
    getShareImg: function (drawConfig) {
        var _this = this;
        return new Promise((reslove1, reject1) => {
            // 创建dom节点
            let ele = $("<div></div>");
            ele.append("<canvas class='dramImg_canvas_js' style='dispaly:none'></canvas>");
            ele.find(".dramImg_canvas_js")[0].width = drawConfig.canvasWidth;
            ele.find(".dramImg_canvas_js")[0].height = drawConfig.canvasHeight;
            var $drawCtx = ele.find(".dramImg_canvas_js")[0].getContext('2d');
            //绘制图背景颜色
            $drawCtx.fillStyle = drawConfig.cavasFillStyle;
            //填充背景
            $drawCtx.fillRect(0, 0, drawConfig.canvasWidth, drawConfig.canvasHeight);
            //新增promise
            var allImgDefer = [];
            //循环list对象 图片添加跨域，二维码用qrcode.js绘制
            drawConfig.drawList.forEach(function (item, index) {
                //本地图片和图片链接
                if (item.type == "remoteImg") {
                    //新增图片节点
                    var img = new Image();
                    //添加跨域
                    img.crossOrigin = "*";
                    //新建图片 promise
                    var imgPromise = new Promise(function (resolve, reject) {
                        //1.当图片onload的时候  给数组新增img字段，放置跨域图片 2.resolve
                        img.onload = function () {
                            item.img = img;
                            resolve();
                        }
                    });
                    //加入到promise数组中
                    allImgDefer.push(imgPromise);
                    //给新建的图片节点添加src图片 放在这个位置是为了触发 onload时间
                    $(img).attr("src", item.content);
                } else if (item.type == "qrcode") {
                    //需要绘制qrcode
                    _this._drawQrcode(ele, item.content, item.swidth, item.sheight);
                    //初始化绘制次数
                    var qrCount = 0;
                    //新建图片节点防止绘制回来的qrcode图片
                    var qrcodeImg = new Image();
                    //新建二维码图片promise 
                    var imgPromise1 = new Promise(function (resolve1, reject) {
                        //1.当图片onload 给数组新增img字段，放置跨域图片 2.resolve
                        qrcodeImg.onload = function () {
                            item.img = qrcodeImg;
                            //得到 利用qrcode插件绘制好的 二维码图片 将 dom销毁
                            ele.find(".qrcode_dramCanvas_js").remove();
                            resolve1();
                        }
                    });
                    //给新建的图片节点添加src图片  但是利用的是qrcode插件 不知道何时会有图片画出，避免此问题，添加setInterval 轮询
                    var qrcodeInterval = setInterval(function () {
                        qrCount++;
                        if (ele.find(".qrcode_dramCanvas_js img")[0] && ele.find(".qrcode_dramCanvas_js img")[0].src) {
                            //添加src图片
                            $(qrcodeImg).attr("src", ele.find(".qrcode_dramCanvas_js img")[0].src);
                            //清楚setInterval 轮询
                            clearInterval(qrcodeInterval);
                        } else {
                            //当循环次数大于10次时，说明qrcode还未绘制出来 重新绘制
                            if (qrCount > 10) {
                                //移除绘制节点 避免qrcode  出错
                                ele.find(".qrcode_dramCanvas_js").remove();
                                //重新利用qrcode插件绘制
                                _this._drawQrcode(ele, item.content, item.swidth, item.sheight);
                                //初始化绘制次数
                                qrCount = 0;
                            }
                        }
                    }, 100);
                    //放到promise数组中
                    allImgDefer.push(imgPromise1);
                }
            });
            //onload完成后，开始绘制图片
            Promise.all(allImgDefer).then(() => {
                drawConfig.drawList.forEach(function (item, index) {
                    if (item.type == "remoteImg") {
                        var sx = item.sx || 0;
                        var sy = item.sy || 0;
                        var swidth = item.swidth || item.img.width;
                        var sheight = item.sheight || item.img.height;
                        var x = item.x || 0;
                        var y = item.y || 0;
                        var width = item.width || item.img.width;
                        var height = item.height || item.img.height;
                        //绘制图片
                        $drawCtx.drawImage(item.img, sx, sy, swidth, sheight, x, y, width, height);
                    } else if (item.type == "font") {
                        var stringList = _this._getTextSiteInfo(item.content, item.inFontSize, item.inLineHeight, item.drawWidth, item.drawHeight, item.v, item.offX, item.offY);
                        $drawCtx.textBaseline = item.textBaseline;
                        $drawCtx.fillStyle = item.fillStyle;
                        $drawCtx.font = item.font;
                        $drawCtx.textAlign = item.textAlign || "center";
                        var x = item.x;
                        var y = item.y;
                        //绘制字体
                        stringList.forEach(function (item1, index) {
                            $drawCtx.fillText(item1.str, x, item1.y + y);
                        });
                    } else if (item.type == "qrcode") {
                        var sx = item.sx || 0;
                        var sy = item.sy || 0;
                        var swidth = item.swidth || item.img.width;
                        var sheight = item.sheight || item.img.height;
                        var x = item.x || 0;
                        var y = item.y || 0;
                        var width = item.width || item.img.width;
                        var height = item.height || item.img.height;
                        // 绘制二维码
                        $drawCtx.drawImage(item.img, sx, sy, swidth, sheight, x, y, width, height);
                    }
                })
                $drawCtx.save();
                var shareImgUrl = ele.find('.dramImg_canvas_js')[0].toDataURL("image/jpeg", drawConfig.quality||0.8);
                // 销毁dom结构
                ele = "";
                //如果需要上传到oss，图片出来后，上传到oss服务器
                if (drawConfig.isUploadOss) {
                    var imgPromise2 = new Promise(function (resolve2, reject) {
                        net.uploadImage("xxx.jpg", shareImgUrl.split(",")[1], 1).then(res => {
                            if (res.status) {
                                resolve2(res.data.url);
                            }
                        });
                    });
                    reslove1({ shareImgUrl: shareImgUrl, promise: imgPromise2 });
                } else {
                    reslove1(shareImgUrl);
                }
            });
        });
    },
    _getTextSiteInfo: function (orgainStr, inFontSize, inLineHeight, drawWidth, drawHeight, v, offX, offY) {
        //orgainStr: 输入字符串
        //inFontSize: 字体大小
        //inLineHeight: 行高
        //drawWidth:实现绘图区域宽
        //drawHeight:实现绘图区域高
        //v:配置位置（top、center、bottom）
        //offX:初始位置X
        //offY:初始位置XY
        v = v || "center";
        offX = offX || 0;
        offY = offY || 0;
        var tempStr = 0;
        //计数标志
        var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        //汉字 判断
        var pushArr = [];
        //最后输出数组
        var lineCout = Math.floor(drawWidth / inFontSize * 2);
        //一共多少英文字母
        var lineNum = Math.floor(drawHeight / inLineHeight);
        //一共多少行
        var newlineArr = orgainStr.split("\n");
        //“\n”分隔拆开整个字符串
        outEach:
        for (i = 0; i < newlineArr.length; i++) {
            var firstLineIndex = [];
            firstLineIndex.push(0);
            tempStr = 0; //重置
            var strArr = newlineArr[i].split("");
            for (var index = 0; index < strArr.length; index++) {
                //计算出每行第一个的索引
                if (reg.test(strArr[index])) {
                    tempStr = tempStr + 2;
                    if (tempStr > lineCout) {
                        firstLineIndex.push(index);
                        tempStr = 2;
                        //计数重置
                    }
                } else {
                    tempStr++;
                    if (tempStr > lineCout) {
                        firstLineIndex.push(index);
                        tempStr = 1;
                        //计数重置
                    }
                }
            }
            for (var count = 0; count < firstLineIndex.length; count++) {
                var temStr = [];
                //暂存截出来的字符
                temStr = strArr.slice(firstLineIndex[count], firstLineIndex[count + 1]);
                temStr = temStr.join("");
                if (lineNum > 0) {
                    lineNum--;
                    pushArr.push({ str: temStr });
                } else {
                    break outEach;
                }
            }
        }
        var textBoxTop = 0;
        var textBoxPaddingTop = (inLineHeight - inFontSize) / 2;
        var textBoxHeight = pushArr.length * inLineHeight;
        //字符串总的高度
        if (v == "top") {
            textBoxTop = 0;
        } else if (v == "center") {
            textBoxTop = (drawHeight - textBoxHeight) / 2;
        } else if (v == "bottom") {
            textBoxTop = drawHeight - textBoxHeight;
        }
        for (var i = 0; i < pushArr.length; i++) {
            pushArr[i].y = textBoxTop + textBoxPaddingTop + inLineHeight * i;
        }
        return pushArr;
    },
    //绘制二维码（使用qrcode.js生成）
    _drawQrcode: function (ele, text, width, height, CorrectLevel) {
        //在body中添加二维码
        ele.append("<div class='qrcode_dramCanvas_js' style='dispaly:none'></div>");
        //绘制
        var qrcode = new QRCode(ele.find(".qrcode_dramCanvas_js")[0], {
            text: text,
            width: width,
            height: height,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    }
}
module.exports = drawCanvas;