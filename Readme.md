# Web Confetti

## Features

- Easy to use
- Focusing on mobile devices
- Fast and small

## Demo
https://tkihira.github.io/web-confetti/index.html

## Install

If you're planning to use this directly in the browser, you may use `dist/web_confetti_min.js`
```
<script src='web_confetti_min.js'></script>
```
[jsdelivr.net](https://www.jsdelivr.com/) will help you use CDN: https://cdn.jsdelivr.net/npm/web-confetti@1.0.3/dist/web_confetti_min.js

You may find how to use in `dist/index.html`

If you're using something like WebPack, you can install through npm
```
npm install web-confetti --save
```

## API

### start(Canvas element, particleCount = 100)

This function initializes internal status with the canvas

### tick()

You need to call `tick` by yourself. If you don't understand the meaning, just simply put these codes somewhere in your script tag.
```
(function rAF () {
    Confetti.tick();
    requestAnimationFrame(rAF);
})();
```

### setConfig(option)

You can set config with this function.
```
{
    confettiColors: ["#e84127", "#f5cc4a", "#ed883a", "#ffffff"],
    initialRadius: 0.3,
    initialSpeed: 0.13,
    gravity: 0.0025,
    confettiSize: 0.012,
    confettiAspectRatio: 1.618
}
```
`initialRadius`, `initialSpeed`, `gravity`, and `confettiSize`'s numbers are the ratio compared to canvas size.

## Contact

Ask [@tkihira](https://twitter.com/tkihira) in Twitter with English or Japanese.

## License

MIT License
