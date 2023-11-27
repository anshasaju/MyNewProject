import { Injectable } from '@angular/core';
import { UserData } from './userData.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {
  private userDatas: UserData[] = [];
  private userDatasObjecct = new BehaviorSubject<UserData[]>([]);

  constructor() { }

  getUserDatas(): Observable<UserData[]>{
    return this.userDatasObjecct.asObservable();
  }

  addUserData(userData: UserData): void{
    this.userDatas.push(userData);
    this.userDatasObjecct.next([...this.userDatas]);
  }

  updateUserData(userData: UserData): void{
    const index = this.userDatas.findIndex(x => x.Id == userData.Id);
    if(index !== -1){
      this.userDatas[index] = userData;
      this.userDatasObjecct.next([...this.userDatas]);
    }
  }

  deleteUserData(Id: number): void{
    this.userDatas = this.userDatas.filter((x) => x.Id !== Id );
    this.userDatasObjecct.next([...this.userDatas]);
  }
}
