# Web Confetti

## Features

- Easy to use
- Focusing on mobile devices
- Fast and small

## Demo
https://tkihira.github.io/web-confetti/index.html

## Install

```
npm install web-confetti --save
```

or, if you're planning to use this directly in the browser, you may use `dist/web_confetti_min.js`
```
<script src='web_confetti_min.js'></script>
```
[jsdelivr.net](https://www.jsdelivr.com/) will help you use CDN: https://cdn.jsdelivr.net/npm/web-confetti@2.0.0/dist/web_confetti_min.js

## API

### Constructor(setting = null)

```
const confetti = new Confetti();
```

`setting` is optional. `setting` will be passed to `Confetti.prototype.setSetting`.

### Confetti.prototype.start(Canvas element, particleCount = 300)

Create new particles in the `element` canvas.

### Confetti.prototype.tick()

Update one frame in the canvas which you set in `start` function. The canvas will be erased every time you call `tick`.

This function will return `false` if there's no confetti (or if errors, such as not calling `start`). Otherwise, return `true`.

You need to call `tick` by yourself, usually in `requestAnimationFrame` function like below.

```
(function rAF () {
    confetti.tick();
    requestAnimationFrame(rAF);
})();
```

### Confetti.prototype.setSetting(setting)

You can overwrite settings with this function. Below are the default settings.

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

For example, if you want to change the confetti's aspect ratio to 1, call this function like below:

```
confetti.setSetting({confettiAspectRatio: 1});
```

`initialRadius`, `initialSpeed`, `gravity`, and `confettiSize`'s numbers are the ratio compared to canvas size.

## Contact

Ask [@tkihira](https://twitter.com/tkihira) in Twitter with English or Japanese.

## License

MIT License
