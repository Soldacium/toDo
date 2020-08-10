import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  items;
  tags = Array(0);

  searchPhrase;
  searchTags = [];

  searchItems;


  currentItem;


  constructor(private localData: LocalDataService) { }

  ngOnInit() {
    this.items = this.localData.items;

    this.searchItems = this.items;
    this.tags = this.localData.allTags();

    

  }

  searchForPhrase(phrase){
    this.searchItems = Array(0)
    if(this.items !== [] && this.items !== undefined && this.items !== null){
      this.items.forEach((item)=> {
        if(item.title.toLowerCase().includes(phrase)){
          this.searchItems.push(item)
        }

        
      });
    }

    if(this.searchItems === []){
      //this.searchItems === this.items;
    }
    
  }



  searchForTag(tag){
    console.log(this.searchTags)
    const nah = this.searchTags.includes(tag);
    
    if (nah == false) {
      this.searchTags.push(tag);
    } else {

      this.searchTags.splice(this.searchTags.indexOf(tag), 1);
    }

    console.log(this.searchTags);
    if (this.searchTags.length == 0) {
      this.searchItems = this.items;
      console.log(this.items, this.searchItems);
    } else {
      this.searchItems = [];
      this.items.forEach((item) => {
        let isGood = 0;
        this.searchTags.forEach((searchTerm) =>{
          if(item.tags.includes(searchTerm)){
            isGood += 1;
          }
        })
        if(this.searchTags.length == isGood){
          this.searchItems.push(item)
        }
        /*
        const isGood = this.searchTags.some(r => item.tags.includes(r));
        console.log(isGood);
        if (isGood == true) {
          this.searchItems.push(item);
        }
        */

      });
      console.log(this.searchItems);
    }

  }


  expandItem(item){
    this.currentItem = item;
    this.localData.currentItem = item;

    console.log(this.currentItem)


  }

  deleteItem(){
    
    this.searchItems.splice(this.searchItems.indexOf(this.currentItem),1);
    this.localData.deleteitem(this.currentItem);
    this.localData.currentItem = undefined;
    this.currentItem = undefined;
    console.log('deleted')
    console.log(this.searchItems)

    
  }

  editToDo(){
    
  }



  closeItem(){
    this.localData.saveItem(this.currentItem)
    this.localData.currentItem = undefined;
    this.currentItem = undefined;
    console.log('yas', this.currentItem, this.localData.currentItem)
  }

  newItem(){
    this.localData.currentItem = undefined;

  }

  changeDone(doing){
    doing.done = !doing.done;
  }

  





}
