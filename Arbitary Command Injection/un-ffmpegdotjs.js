var ffmpegdotjs = require("ffmpegdotjs");

ffmpegdotjs.trimvideo("package-lock.json",0,30,"n || touch success; #").then((file)=>{
console.log(file);
});