h1. Nginx HLS

This is mostly a rough & ready guide for a RPi display.. Probably not what you're looking for.

Make magic
```
git clone https://github.com/charlier/nginx-hls.git
cd nginx-hls
docker build -t nginx-hls .
docker run -d -p 80:80 -v $(pwd)/hls:/hls nginx-hls
```

Start up an in-memory display X11 server, with Chrome... Point at whatever

```
xvfb-run --listen-tcp --server-num 44 --auth-file /tmp/xvfb.auth -s -ac -screen 0 1920x1080x24 -nocursor google-chrome --window-size=1920,1080 --kiosk --window-position=0,0 http://localhost:8080/
```

FFMPEG him & plop the output in a SAN where this guy lives

```
ffmpeg -f x11grab -s hd1080 -an -draw_mouse 0 -i :44 -vf scale=1280x720 -c:v libx264 -preset ultrafast -b:v 6000k -maxrate 6600k -bufsize 8000k -g 30 -sc_threshold 0 -hls_time 6 -pix_fmt yuv420p -crf 20 -f hls -hls_list_size 15 -hls_flags independent_segments+delete_segments playlist.m3u8
```

