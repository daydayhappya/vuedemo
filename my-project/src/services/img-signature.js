// var $ = require("jquery");
const netBase = require("./net-base.js");
const netUrl = "/apiBusiness/CommonBusiness/GetPrivateImageUrlInfos";
const _ = require("_");

let awaitList = [];
let imgStore = []; //{imgUrl:"",signature:""}
const _getImgSignatureByNet = _.throttle(function () {
  var urlList = awaitList.map(item=>item.url);
  netBase.post(netUrl,{urlStrings:urlList}).then(result => {
    if (result.status) {
      result.data.forEach(function (imgInfo) {
        _addImgSignature(imgInfo.url, imgInfo.param)
        _resloveAwaitImg(imgInfo.url)
        // 删除等待列表
        //todo,promise.reslove 然后删除
      });
    } else {
      //报错 todo
    }
  });
}, 500);

function _addAwaitImg(url, resolve, reject) {
  awaitList.push({
    url,
    resolve,
    reject
  });
}
// reslove&&delete
function _resloveAwaitImg(url) {
  var findIndex = awaitList.findIndex(item => item.url == url);
  var catcheImg = imgStore.find(item=>item.imgUrl==url);
  if (findIndex > -1&&catcheImg) {
    awaitList[findIndex].resolve(catcheImg)
    awaitList.splice(findIndex, 1);
  }
}
//获取图片签名
function getImgSignature(url) {
  var cache = imgStore.find(item => {
    return item.imgUrl == url;
  });
  if (cache) {
    return Promise.resolve(cache);
  }
  var promise = new Promise((resolve, reject) => {
    _addAwaitImg(url, resolve, reject);
  });
  _getImgSignatureByNet();
  return promise;
}
export default getImgSignature;
//添加图天签名
export function addImgSignature(imgUrl, signature) {
  _addImgSignature(imgUrl, signature);
}

function _addImgSignature(imgUrl, signature) {
  var catcheIndex = imgStore.findIndex(item => {
    return item.imgUrl == imgUrl
  });
  if (catcheIndex > -1) {
    imgStore.splice(catcheIndex, 1);
  }
  imgStore.push({
    imgUrl: imgUrl,
    signature: signature
  })


}