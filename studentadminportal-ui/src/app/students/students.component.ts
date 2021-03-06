import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../Models/UI-Models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerContent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName','lastName','dateOfBirth','email','mobile','gender','edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) MatSort!: MatSort;
  filterString = '';


  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
    //Fetch Students
    this.studentService.getStudents()
    .subscribe(
        (successReponse) => {
          this.students = successReponse;
          this.dataSource = new MatTableDataSource<Student>(this.students)
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;

          }

          if(this.MatSort){
            this.dataSource.sort = this.MatSort;
          }

        },
    (errorResponse) =>{
      console.log(errorResponse);
    }
    );
  }
 filterStudents(){
   this.dataSource.filter =this.filterString.trim().toLowerCase();
 }
}
