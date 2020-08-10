import { Injectable, EventEmitter, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  /****** */
  // SETUP
  /****** */
    // setting up keys used to save and get items from localStorage
    keys = {
      settings: 'sett',
      numOfNotes: 'NN',
      notes: 'NO',
      toDos: 'TD',
      items: 'IT'

    };

    localStorage = localStorage;
    currentItem;
    currentToDo;
    currentNote;

    // saving all notes in one array is simpler, cleaner and not that much less
    // efficient than saving each note as distinct item with id in local storage, with
    // list of all IDs as another
    items;
    tags = Array(0);

  // instantly get notes from localStorage, as to later operate on them
  constructor() {
    this.items = JSON.parse(localStorage.getItem(this.keys.items));

    if (this.items === null) {
      this.items = Array(0);
    }

    this.tags = this.allTags();

  }



  @Output() changedSettings = new EventEmitter<any>();


  /****** */
  // TAGS, BONUS FUNCTIONS
  /****** */
  allTags() {

    this.tags = Array(0);

    if (this.items !== [] && this.items !== undefined && this.items !== null) {

      this.items.forEach(item => {
        if (item.tags) { // check if this is note, only notes have tags
          item.tags.forEach(tag => {
            if (this.tags.includes(tag) === false) {
              this.tags.push(tag);
            }
          })
        }

      });
    }

    return this.tags;
  }

  /****** */
  // SETTINGS
  /****** */
  saveSettings(settings: object) {
    const settingsString = JSON.stringify(settings);

    localStorage.setItem(this.keys.settings, settingsString);
    console.log(settings);
    this.changedSettings.emit(settings);
  }

  getSettings() {
    return JSON.parse(localStorage.getItem(this.keys.settings));
  }



  /****** */
  // SAVING AND GETTING ALL ITEMS
  /****** */
  saveItem(item) {
    // make list of all items IDs, for later to check if this item already exists
    let IDs = [];
    this.items.forEach(searchitem => {
      IDs.push(searchitem.id)
    });
    if (this.items === null || IDs.includes(item.id) === false ) {
      this.items.push(item);

    } else {
      const pos = this.items.indexOf(item);
      this.items.splice(pos, 1, item);

    }

    const items = JSON.stringify(this.items);

    localStorage.setItem(this.keys.items, items);

  }



  deleteitem(item) {
    if (this.items.includes(item)) {
      const pos = this.items.indexOf(item);
      this.items.splice(pos, 1);
    }

    const items = JSON.stringify(this.items);

    localStorage.setItem(this.keys.items, items);
  }

  getitems() {
    return JSON.parse(localStorage.getItem(this.keys.settings));
  }

}
