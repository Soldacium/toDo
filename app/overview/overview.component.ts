import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  days = [];
  today;
  thisYear;
  thisMonth;
  
  activeDay = -1;
  missingDays = {
    before: [],
    after: []
  }


  monthName;
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

  todayEvents = [];
  currentEvent= 0;

  constructor(private localData: LocalDataService) { }

  ngOnInit() {

    this.today = new Date();
    this.thisYear =  this.today.getFullYear();
    this.thisMonth =  this.today.getMonth();
    this.monthName = this.monthNames[this.thisMonth]

    this.days = this.getDaysInMonth(this.thisMonth,this.thisYear);
    this.todayEvents = this.getDayEvents(this.formatDate(this.today))
    this.getMissingDays();

    console.log(this.todayEvents == [])
  }


  getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      // for formatting issues, input in ToDo is yyyy-mm-dd while just by getMonth and getDate you can get format yyyy-m-d
      
      
      // each day in month have this
      const dayData = {
        date: new Date(date),
        events: this.getDayEvents(this.formatDate(date))
      }

      // push day into array
      days.push(dayData);
      date.setDate(date.getDate() + 1);
    }
    this.days = days;

    return days;
  }

  formatDate(date){
    const month = (date.getMonth() + 1 < 10)?`0${date.getMonth() +1}`:`${date.getMonth() + 1}`;
    const day = (date.getDate()  < 10)?`0${date.getDate() }`:`${date.getDate()}`;

    return `${date.getFullYear()}-${month}-${day}`

  }

  getDayEvents(date){
    const events = [];
    this.localData.items.forEach(item => {
      if(item.when && item.when == date){
        events.push(item);
        console.log(events)
      }
    });

    return events;

  }

  nextToDo(){
    if(this.currentEvent < this.todayEvents.length){
      this.currentEvent += 1;
    }
  }

  prevToDo(){
    if(this.currentEvent > 0){
      this.currentEvent -= 1;
    }
  }

  nextMonth(){
    this.thisMonth +=1
    if(this.thisMonth == 12){
      this.thisMonth = 0;
      this.thisYear +=1
    }
    this.getDaysInMonth(this.thisMonth, this.thisYear)
    this.getMissingDays()
    this.activeDay = -1
    this.monthName = this.monthNames[this.thisMonth]
  }

  previousMonth(){
    this.thisMonth -=1
    if(this.thisMonth == -1){
      this.thisMonth = 11;
      this.thisYear -=1
    }
    this.getDaysInMonth(this.thisMonth, this.thisYear)
    this.getMissingDays()
    this.activeDay = -1
    this.monthName = this.monthNames[this.thisMonth]
    
  }

  getMissingDays(){

    this.missingDays.before = [];this.missingDays.after = [];
    const first = new Date(this.thisYear,this.thisMonth,1).getDay();
    const last = new Date(this.thisYear,this.thisMonth + 1,0).getDay() // new Date(this.thisYear,this.thisMonth).getDate()
    console.log(first, last)

    for(let i = 1; i < first; i++){
      this.missingDays.before.push(i)
    }
    for(let i = last; i< 7; i++){
      this.missingDays.after.push(i + 1)
    }
  }

}
