import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estatico',
  templateUrl: './estatico.component.html',
  styleUrls: ['./estatico.component.css']
})
export class EstaticoComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    const PARTICLE_COUNT = 4000;

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const w = canvas.width = 300;
    const h = canvas.height = 300;

    const r = n => Math.random();
    const PI = Math.PI;
    const TAU = PI * 2;

    const lerp = (start, end, amt) => {
      return (1 - amt) * start + amt * end
    };

    const angle = (cx, cy, ex, ey) => {
      return Math.atan2(ey - cy, ex - cx);
    };

    const particlePrototype = () => ({
      x: r('') * w,
      y: r('') * h,
      r: 1.5 + (r('') * w * 0.001),
      angle: r('') * TAU,
      speed: r('') * 1.5,
      normalSpeed: r('') * 1
    });

    const particles = (new Array(PARTICLE_COUNT))
      .fill({})
      .map(particlePrototype);

    const update = () => {
      particles.forEach(particle => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        particle.speed = lerp(particle.speed, particle.normalSpeed, 0.1);

        if (particle.x > w) {
          particle.x -= w;
        }
        if (particle.x < 0) {
          particle.x += w;
        }
        if (particle.y > h) {
          particle.y -= h;
        }
        if (particle.y < 0) {
          particle.y += h;
        }
      });
    };


    const render = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      particles.forEach(particle => {
        ctx.moveTo(particle.x, particle.y);
        ctx.rect(particle.x, particle.y, particle.r, particle.r);
      });
      ctx.fill();
      ctx.closePath();

    };

    const loop = () => {

      update();
      render();
      window.requestAnimationFrame(loop);

    };

    loop();

    window.addEventListener('mousemove', e => {

      const mouseX = e.layerX;
      const mouseY = e.layerY;

      particles.forEach(particle => {

        const a = mouseX - particle.x;
        const b = mouseY - particle.y;

        const distance = Math.sqrt(a * a + b * b);

        if (distance < 70 && distance > 0) {
          particle.angle = angle(mouseX, mouseY, particle.x, particle.y)
          const force = (70 - distance) * 0.1;
          particle.speed = lerp(particle.speed, force, 0.2);
        }

      })
    });
  }

}
