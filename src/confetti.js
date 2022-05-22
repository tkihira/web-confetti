import defaultSettings from "./defaultSettings";

class Confetti {
    constructor(setting = null) {
        this.confettiList = [];
        this.availableCofetti = 0;
        this.canvas = null;
        this.ctx = null;

        this.setting = { ...defaultSettings };
        if (setting) {
            this.setSetting(setting);
        }
    }

    setSetting(setting) {
        Object.assign(this.setting, setting);
    }

    start(canvas, particleCount = 300) {
        const { confettiColors, initialRadius, initialSpeed } = this.setting;

        if (this.canvas !== canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
        }

        const width = this.canvas.width;
        const height = this.canvas.height;

        for (let i = 0; i < particleCount; i++) {
            const color = confettiColors[Math.trunc(Math.random() * confettiColors.length)];
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

            this.confettiList.push({ color, alpha, beta, theta, x, y, z, vx, vy, vz, da, db, dt, duration });
            this.availableCofetti++;
        }
    }

    tick() {
        if (!this.availableCofetti || !this.ctx) {
            return false;
        }
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.confettiList.length; i++) {
            const confetti = this.confettiList[i];
            if (!confetti) {
                continue;
            }
            confetti.x += confetti.vx / 10;
            confetti.y += confetti.vy / 10;
            confetti.z += confetti.vz / 10;
            confetti.vy += this.canvas.height * this.setting.gravity;
            confetti.alpha += confetti.da;
            confetti.beta += confetti.db;
            confetti.theta += confetti.dt;
            confetti.duration -= 1;
            // console.log(confetti.z);

            const size = this.setting.confettiSize * this.canvas.width * (1 + confetti.z / 500);
            const { x, y, alpha, beta, theta } = confetti;
            const nx = Math.sin(alpha) * Math.cos(beta);
            const ny = Math.sin(alpha) * Math.sin(beta);
            const nz = Math.cos(alpha);
            const sin = Math.sin(theta);
            const cos = Math.cos(theta);

            const a = (cos + nx * nx * (1 - cos)) * size;
            const b = (nx * ny * (1 - cos) - nz * sin) * size * this.setting.confettiAspectRatio;
            const c = (nx * ny * (1 - cos) - nz * sin) * size;
            const d = (cos + ny * ny * (1 - cos)) * size * this.setting.confettiAspectRatio;

            ctx.fillStyle = confetti.color;
            ctx.beginPath();
            ctx.moveTo(x + a + b, y + c + d);
            ctx.lineTo(x + a - b, y + c - d);
            ctx.lineTo(x - a - b, y - c - d);
            ctx.lineTo(x - a + b, y - c + d);
            ctx.fill();

            if (y >= this.canvas.height + this.setting.confettiSize * this.canvas.width * 2) {
                this.confettiList[i] = null;
                this.availableCofetti--;
            } else {
                if (confetti.duration === 0) {
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
        if (!this.availableCofetti) {
            this.confettiList.length = 0;
            return false;
        }
        return true;
    }
}

export default Confetti;