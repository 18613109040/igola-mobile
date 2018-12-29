

// const config = require('../../config/env');
// const Promise = require('bluebird');
// const qiniu = require('qiniu');

// qiniu.conf.ACCESS_KEY = config.qiniu.app_key;
// qiniu.conf.SECRET_KEY = config.qiniu.app_secret;
// const client = new qiniu.rs.Client();

// // 对一般操作进行promise封装
// const uploadFile = Promise.promisify(qiniu.io.putFile);
// const moveFile = Promise.promisify(client.move, client);
// const copyFile = Promise.promisify(client.copy, client);
// const removeFile = Promise.promisify(client.remove, client);
// const statFile = Promise.promisify(client.stat, client);
// const fetchFile = Promise.promisify(client.fetch, client);
// const allList = Promise.promisify(qiniu.rsf.listPrefix);

// exports.uploadFile = uploadFile;
// exports.moveFile = moveFile;
// exports.copyFile = copyFile;
// exports.removeFile = removeFile;
// exports.statFile = statFile;
// exports.fetchFile = fetchFile;
// exports.allList = allList;

// // 获取上传凭证
// function getUptoken(bucketname) {
//   const putPolicy = new qiniu.rs.PutPolicy(bucketname);
//   return putPolicy.token();
// }
// // 不同空间可以相互操作,在这里只在一个空间下操作
// const bucket = config.qiniu.bucket;
// exports.bucket = bucket;
// // 将网络图片上传到七牛服务器
// exports.fetch = function (url, key) {
//   return this.fetchFile(url, bucket, key).then((result) => {
//     result.url = config.qiniu.domain + result.key;
//     return result;
//   });
// };

// // 上传文件
// exports.upload = function (path, key) {
//   const extra = new qiniu.io.PutExtra();
//   const uptoken = getUptoken(config.qiniu.bucket);
//   return this.uploadFile(uptoken, key, path, extra).then((result) => {
//     result.url = config.qiniu.domain + result.key;
//     return result;
//   });
// };

// // 将源空间的指定资源移动到目标空间，或在同一空间内对资源重命名。
// exports.move = function (keySrc, keyDest) {
//   let bucketSrc,
//     bucketDest;
//   bucketSrc = bucketDest = bucket;
//   return this.moveFile(bucketSrc, keySrc, bucketDest, keyDest).then(result => result);
// };
// // 复制文件
// exports.copy = function (keySrc, keyDest) {
//   let bucketSrc,
//     bucketDest;
//   bucketSrc = bucketDest = bucket;
//   return this.copyFile(bucketSrc, keySrc, bucketDest, keyDest).then(result => result);
// };

// exports.remove = function (key) {
//   return this.removeFile(bucket, key).then(result => result);
// };
// /*
// 列出所有资源,
// prefix 想要查询的资源前缀缺省值为空字符串,limit 限制条数缺省值为1000
// marker 上一次列举返回的位置标记，作为本次列举的起点信息。缺省值为空字符串
// delimiter 指定目录分隔符，列出所有公共前缀（模拟列出目录效果）。默认值为空字符串。
//  */
// exports.list = function (prefix, marker, limit, delimiter) {
//   delimiter = delimiter || '';
//   return this.allList(bucket, prefix, marker, limit, delimiter).then(result => result);
// };
// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功', status= 200 }) => {
  ctx.logger.info(msg, res);
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = status
};

