import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  note;
  curTags;

  

  constructor(
    private LocalData: LocalDataService,
    private fb: FormBuilder) {

    }

  ngOnInit() {
    if(this.LocalData.currentItem !== undefined && this.LocalData.currentItem.desc){
      const item = this.LocalData.currentItem;
      this.note = this.fb.group({
        title: [item.title, Validators.required],
        desc: [item.desc, Validators.required],
        tags: [item.tags, Validators.required],
        id:  item.id,
        time: ''
  
      });
    }else{
      this.note = this.fb.group({
        title: ['', Validators.required],
        desc: ['', Validators.required],
        tags: [[], Validators.required],
        id:  uuidv4(),
        time: ''
  
      });

    }

    
  }

  addTag(){
    
    const tagInput: HTMLInputElement = document.querySelector(".addTag");
    if(tagInput.value !== ''){
      this.note.value.tags.push(tagInput.value)
      console.log(this.note.value.tags)
      tagInput.style.width = '80px'
      tagInput.value = '';      
    }


  }

  deleteTag(tag){
    //const pos = this.note.tags.indexOf(tag)
    this.note.value.tags.splice(this.note.value.tags.indexOf(tag),1)
  }

  save(){
    //this.LocalData.currentNote;

    if(this.note.value.title !== '' && this.note.value.desc !== ''){
      this.note.value.time = this.getDay()
      this.LocalData.saveItem(this.note.value);
      console.log(this.note.value)
      this.LocalData.currentNote = undefined;
      
    }
    


  }

  getDay(){
    const now = new Date();
    const month = (now.getMonth() + 1 < 10)?`0${now.getMonth() +1}`:`${now.getMonth() + 1}`;
    const nowStr  = (now.getDate()) + "-" + month + "-" + now.getFullYear();
    const timeVal = (now.getTime()-1596377000000); 
        console.log(now.getTime())
        // since this was made in 2020,and you can't go back in time to use something that doesnt exist, AND
        // because every byte counts, this note will be caounting time from 2020 instead of 1970

    return {date: nowStr, dateVal: timeVal}
  }

}
