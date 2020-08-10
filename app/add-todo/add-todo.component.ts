import { Component, OnInit, Input } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  

  date = true;

  currentToDo = {
    title: '',
    toDo: [],
    time: null,
    when: '',
    id:  uuidv4(),
  };
  constructor(private localData: LocalDataService) {
    
  }

  ngOnInit() {
    if(this.localData.currentItem !== undefined && this.localData.currentItem.toDo){
      
      this.currentToDo = this.localData.currentItem;
    }
    
  }



  completeDoing(doing){
    doing.done = !doing.done;
  }

  save(){
    this.currentToDo.time = this.getDay()
    const when: HTMLInputElement = document.querySelector('#when');
    //const to: HTMLInputElement = document.querySelector('#to');

    if(when.value !== ''  && this.date){ //&& to.value !== ''
      this.currentToDo.when= when.value;
      //this.currentToDo.to = from.value;
    }

    this.localData.saveItem(this.currentToDo)
    console.log(this.currentToDo)
  }

  addDoing(){
    
    const doingInput: HTMLInputElement = document.querySelector("#doing-add");
    if(doingInput.value !== ''){

      this.currentToDo.toDo.push(
        {desc: doingInput.value,
        done: false})
      //console.log(this.note.value.tags)
      doingInput.value = '';
    }

    console.log(this.currentToDo)


  }

  check(doing){
    // essentialty, search for deed and change to true, if false, and to false, if true, quick swap
    this.currentToDo.toDo[this.currentToDo.toDo.indexOf(doing)].done = !this.currentToDo.toDo[this.currentToDo.toDo.indexOf(doing)].done;
    console.log(this.currentToDo)
    
  }

  delete(doing){
    this.currentToDo.toDo.splice(this.currentToDo.toDo.indexOf(doing),1);
  }

  updateTitle(title){
    this.currentToDo.title = title;
  }

  getDay(){
    const now = new Date();
    const month = (now.getMonth() + 1 < 10)?`0${now.getMonth() +1}`:`${now.getMonth() + 1}`;
    const nowStr  = (now.getDate()) + "-" + month+ "-" + now.getFullYear();
    const timeVal = (now.getTime()-1596377000000); 
        console.log(now.getTime())
        // since this was made in 2020,and you can't go back in time to use something that doesnt exist, AND
        // because every byte counts, this note will be caounting time from 2020 instead of 1970

    return {date: nowStr, dateVal: timeVal}
  }



}
