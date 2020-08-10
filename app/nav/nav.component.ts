import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  openOptions = false;
  openNav: boolean = false;

  // for canvas
  public canvasColors: any = {
    color1: '#2affb8',
    color2: '#ff2a83',
    color3: '#cd2aff',
    color4: '#2ae6ff',
    color5: '#d8ff2a'
  };


  public bgColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: '#e920e9',
  };

  chosenBG = 'canvas'

  public svg = null;

  public svgs = [
    "assets/BGs/stingrays.svg",
    "assets/BGs/dots.svg",
    "assets/BGs/mountain.svg",
    "assets/BGs/field.svg",
    "assets/BGs/waves.svg"
  ]

  constructor( private localData: LocalDataService) { }

  ngOnInit() {
    if(this.localData.getSettings() !== null){
      const settings = this.localData.getSettings()
      this.canvasColors = settings.canvas;
      this.bgColors = settings.bg;
      this.chosenBG = settings.type;
      this.svg = settings.svg;
      console.log(this.localData.getSettings())
    }

  }

  getUrl(string){
    return `url('${string}')`;
  }


  changeOptions(){
    this.openOptions = !this.openOptions;
  }

  selectBgType(type: string){
    this.chosenBG = type;
    this.saveSettings();
  }

  saveSettings(){
    const options = {
      canvas: this.canvasColors,
      bg: this.bgColors,
      svg: this.svg,
      type: this.chosenBG,
    }

    this.localData.saveSettings(options)
  }

  changeNav(){
    this.openNav = !this.openNav;
    console.log('yass')
  }

  svgChange(svg: string){
    if(this.svg === svg){
      this.svg = null;
      
    }else{
      this.svg = svg;
    }

    this.saveSettings();
  }

}
