# flv格式转换mp4
ffmpeg -i input.flv -c copy output.mp4

# 截取视频片段
ffmpeg -ss [start] -t [duration] -accurate_seek -i [in].mp4 -codec copy [out].mp4
ffmpeg -ss 10 -t 15 -i test.mp4 -codec copy cut.mp4