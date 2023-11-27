import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../userData.model';
import { UserDataServiceService } from '../user-data-service.service';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  userItems: UserData[] = [];
  SelectedUsers: UserData = {} as UserData;
  isAdding = false;
  newPersonName: any;
  newPersonAge: any;
  categoryName: any;
  displayDialog = false;

  constructor(private userDataService: UserDataServiceService ) {}

  ngOnInit(): void {
    this.userDataService.getUserDatas().subscribe((data) => {
      this.userItems = data;
    })
  }

  addNewPerson(){
    this.isAdding = !this.isAdding
    this.displayDialog = true;
    this.SelectedUsers = {} as UserData;
  }

  EditSelectedUser(item: UserData){
    this.SelectedUsers = item;
    this.displayDialog = true;
    this.isAdding = false;
    
  }

  addItem(SelectedUsers: UserData): void{
    debugger

    // if(this.crudForm.valid){
      const newItem: UserData = {
        Id: Date.now(),
        // Name: name,
        // Age: age,
        // Category: category
        Name: SelectedUsers.Name,
        Age: SelectedUsers.Age,
        Category: SelectedUsers.Category
      };

      this.userDataService.addUserData(newItem);
      this.isAdding = false;
      this.SelectedUsers = {} as UserData;
      this.displayDialog = false;

    //   this.items.push(newItem);

    //   this.crudForm.reset();
    // }
  }


  updatePerson(person: UserData): void {
    this.userDataService.updateUserData(person);
    this.SelectedUsers = {} as UserData;
    this.displayDialog = false;
  }

  deletePerson(id: number): void {
    this.userDataService.deleteUserData(id);
  }
}
