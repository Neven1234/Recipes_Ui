import { Component, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../RecipesComponent/edit-dialog/edit-dialog.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { PLAN } from 'src/app/Models/plan';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { Planner } from 'src/app/Models/Planner';
import { RecipesService } from 'src/app/Service/recipes.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent {
public calendarOptions: CalendarOptions
@ViewChild('calendar') calendarComponent: FullCalendarComponent;
 constructor(private editDialog:MatDialog,private route:ActivatedRoute,private userService:UserService,private recipeService:RecipesService){}
  calendarEvents :PLAN={
    title:'',
    date:'',
    color:''
  }
  userId:string=this.userService.GetUserIdFormSorage()
  recipeNames:string[]=[]
  eventss:PLAN[]=[]
  Kos:PLAN[]=[
  {title: 'Rice And Milk', date: '2023-10-18', color: '#0000FF'},
  {title: 'Beef Burger', date: '2023-10-19', color: '#0000FF'},
]
  dateTemp:Date
 Planes:Planner[]=[
 ]
 ngOnInit(){
 
  console.log('hello')
  
  this.eventss=this.GetEvents()
      
  console.log(this.eventss)
  this.calendarOptions={
    contentHeight: 200,
    plugins:  [dayGridPlugin, interactionPlugin],
   
   
  }
  }
  


  openDialog(data:string){
    this.editDialog.open(AddPlanComponent,{
      width:'50%',
      height:'180px',
      data,
    })
  }
  //helper function
  GetEvents():PLAN[]{
    var temp:Planner[]=[]
    var error:PLAN[]=[]
    this.userService.GetPlanes(this.userId).subscribe({
      next:(res)=>{
        res.forEach(element => {
          error.push(this.GetEventData(element)) 
        });
        this.calendarOptions={
          
          initialView: 'dayGridMonth',
          weekends: true,
          selectable:true,
          events:error,
          dateClick:(info)=>{
            const dateStr = info.dateStr;
            this.openDialog(dateStr)
          } 
        }
        return error
      }
    })
    return error
   }
  

   GetEventData(planes:Planner):PLAN{
    var list:PLAN[]=[]
    var temp:PLAN={
      title:'',
      date:'',
      color:''
    }
      this.recipeService.getRecipe(planes.recipeId).subscribe({
        next:(reponse)=>{
          temp.title=reponse.name
          this.dateTemp=new Date(planes.date)
            var y= this.dateTemp.getFullYear()
            var m= '-'+(this.dateTemp.getMonth()+1)
            var d= '-' +this.dateTemp.getDate()
            var wholeDAte=y+m+d;
            temp.date= wholeDAte.toString()
            temp.color='#0000FF'
            return temp
        }
      })
    return temp
   }
   
}
