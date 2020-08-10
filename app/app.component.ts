import { Component, OnInit } from '@angular/core';
import { LocalDataService } from './services/local-data.service';

/* tslint:disable */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'toDo';

  bgType = 'canvas';
  canvas;
  ctx;
  array = [];
  colorArray = [];
  bgColorArray = [];
  svg = [];


  mouse = {
      x: window.innerWidth/1.1,
      y: window.innerHeight/1.1
    };

  constructor(public localData: LocalDataService) {

  }

  ngOnInit() {
    this.essentials(this.localData.getSettings())

    this.localData.changedSettings
    .subscribe((settings) => {
      console.log(settings)
      this.essentials(settings);
    })

    this.animate();
  }



  essentials(settings) {

    /* quick stuff */
    
    
    
    /*
    /* CANVAS
    */
    //setting up new canvas
    const canvasParent = document.querySelector('.canvas');
    if(document.getElementById('canvas')){
      canvasParent.removeChild(document.getElementById('canvas'));
    }

    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'canvas';
    canvasParent.appendChild(newCanvas);

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    


    //setting up colors
    if(settings){

      this.bgType = settings.type;

      const canvasSettings = settings.canvas; 
      this.colorArray = []
      for(let i = 0; i < 5; i++){
        this.colorArray.push(canvasSettings[`color${i + 1}`])
      }
    }else{
      this.colorArray = [        
        '#2affb8',
        '#ff2a83',
        '#cd2aff',
        '#2ae6ff',
        '#d8ff2a'] 
    }
    

    

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.backgroundColor = 'rgba(255,255,255,1)';
    

    // for moving background
    this.array = [];
    
    for (let i = 0; i < 900; i++) {
      const radius = (Math.random() * 18) + 3;
      const color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)] 

      this.array.push( new Particle(
        this.canvas.width / 1.1,
        this.canvas.height / 1.1,
        radius,
        color,
        this.ctx,
        this.mouse))

    }

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });


    /*
    /* Normal BG
    */

    const staticBG: HTMLDivElement = document.querySelector('.staticBG');
    if( settings  ){
      this.bgColorArray = [];
      for(let i = 0; i < 3; i++){
        this.bgColorArray.push(settings.bg[`color${i + 1}`])
      }
      staticBG.style.background = `linear-gradient(${this.bgColorArray[0]},${this.bgColorArray[1]},${this.bgColorArray[2]})`
      staticBG.style.backgroundImage = 'transparent'
      console.log(staticBG.style.background)
    }
    if(settings.svg !== null){
      if(settings.svg === "/assets/BGs/mountain.svg" || settings.svg === "assets/BGs/mountain.svg"){
        staticBG.style.backgroundSize = 'cover'
      }
      staticBG.style.backgroundImage = `url(${settings.svg})`
    }

    

  }


  animate() {
    requestAnimationFrame(() => {this.animate(); });
    this.ctx.fillStyle = 'rgba(255,255,255,0.85)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // tslint:disable-next-line: prefer-for-of


    this.array.forEach(particle => {
      particle.update();
    });
  }
}



export function Particle(x, y, radius,color, ctx, mouse) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.radius = radius;
  this.color = color;

  // spawn in random location on circle
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.003 + Math.random()*0.02;





  // random distance
  function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  this.distance = randomIntFromRange(50,600);

  // to smooth the animation
  this.lastMouse = {x: this.x, y: this.y};


  this.draw = lastPoint => {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.moveTo(lastPoint.x,lastPoint.y);
    ctx.lineTo(this.x,this.y);
    ctx.stroke();
    ctx.closePath()
  };


  this.update = () => {
    // storing last used point
    const lastPoint = {x: this.x, y:this.y}



    // adding to original position, thats why there's this.x and x, move'em over tiem
    this.radians += this.velocity; // this actually changes position

    //drag effect

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;


    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;

    this.draw(lastPoint);
  };



}