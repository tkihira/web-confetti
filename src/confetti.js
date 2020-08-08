const config = {
    confettiColors: ["rgb(232,65,39)", "rgb(245,204,74)", "rgb(237,136,58)", "#fff"],
    initialRadius: 0.3,
    initialSpeed: 0.13,
    gravity: 0.0025,
    confettiSize: 0.012,
    confettiAspectRatio: 1.618
};

const confettiList = [];
let availableCofetti = 0;

let canvas = null;
let ctx = null;

const setConfig = (setting) => {
    Object.assign(config, setting);
};

const tick = () => {
    if(!availableCofetti || !ctx) {
        confettiList.length = 0;
        return false;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < confettiList.length; i++) {
        const confetti = confettiList[i];
        if(!confetti) {
            continue;
        }
        confetti.x += confetti.vx / 10;
        confetti.y += confetti.vy / 10;
        confetti.z += confetti.vz / 10;
        confetti.vy += canvas.height * config.gravity;
        confetti.alpha += confetti.da;
        confetti.beta += confetti.db;
        confetti.theta += confetti.dt;
        confetti.duration -= 1;
        // console.log(confetti.z);

        const size = config.confettiSize * canvas.width * (1 + confetti.z / 500);
        const {x, y, alpha, beta, theta} = confetti;
        const nx = Math.sin(alpha) * Math.cos(beta);
        const ny = Math.sin(alpha) * Math.sin(beta);
        const nz = Math.cos(alpha);
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);

        const a = (cos + nx * nx * (1 - cos)) * size;
        const b = (nx * ny * (1 - cos) - nz * sin) * size * config.confettiAspectRatio;
        const c = (nx * ny * (1 - cos) - nz * sin) * size;
        const d = (cos + ny * ny * (1 - cos)) * size  * config.confettiAspectRatio;
    
        ctx.fillStyle = confetti.color;
        ctx.beginPath();
        ctx.moveTo(x + a + b, y + c + d);
        ctx.lineTo(x + a - b, y + c - d);
        ctx.lineTo(x - a - b, y - c - d);
        ctx.lineTo(x - a + b, y - c + d);
        ctx.fill();

        if(y >= canvas.height + config.confettiSize * canvas.width * 2) {
            confettiList[i] = null;
            availableCofetti--;
        } else {
            if(confetti.duration === 0) {
                const duration = (Math.random() * 25 + 15) | 0;
                const alpha = (Math.random() * 2 - 1) * Math.PI * 2;
                const beta = (Math.random() * 2 - 1) * Math.PI * 2;
                const theta = (Math.random() * 2 - 1) * Math.PI * 2;

                confetti.duration = duration;
                confetti.da = (alpha - confetti.alpha) / duration;
                confetti.db = (beta - confetti.beta) / duration;
                confetti.dt = (theta - confetti.theta) / duration;
            }
        }
    }
    if(!availableCofetti) {
        confettiList.length = 0;
        return false;
    }
};

const start = (_canvas, num = 300) => {
    const {confettiColors, initialRadius, initialSpeed} = config;

    if(canvas !== _canvas) {
        canvas = _canvas;
        ctx = canvas.getContext('2d');
    }

    const width = canvas.width;
    const height = canvas.height;

    for(let i = 0; i < num; i++) {
        const color = confettiColors[(Math.random() * confettiColors.length) | 0]
        const alpha = Math.random() * Math.PI * 2;
        const beta = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI * 2;

        const r = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const d = (1 - Math.random() * Math.random()) * width * initialRadius;
        const x = width / 2 + d * Math.cos(r);
        const y = height / 2 + d * Math.sin(r);
        const z = Math.random() * 30;
        const vx = d * Math.cos(r) * 0.2;
        const vy = -Math.abs(height * initialSpeed * Math.sin(v));
        const vz = Math.abs(30 * Math.cos(v));
        const da = Math.random() * 0.4 - 0.1;
        const db = Math.random() * 0.4 - 0.1;
        const dt = Math.random() * 0.4 - 0.1;
        const duration = 1;

        confettiList.push({color, alpha, beta, theta, x, y, z, vx, vy, vz, da, db ,dt ,duration});
        availableCofetti++;
    }
};

export {setConfig, tick, start};