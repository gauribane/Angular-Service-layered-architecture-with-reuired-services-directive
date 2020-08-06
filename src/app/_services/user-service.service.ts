import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  private selectedTheme: BehaviorSubject<Object> = new BehaviorSubject<Object>(
    null
  );
  castUser = this.selectedTheme.asObservable();
  private notifyHighAlert: BehaviorSubject<Object> = new BehaviorSubject<any>(
    null
  );
  notifyToAll = this.notifyHighAlert.asObservable();
  

  constructor() {}

  setObservableData(userData) {
    this.selectedTheme.next(userData);
  }

  setTheme(themeData) {
    this.selectedTheme.next(themeData);
  }

  setObservableDataOnHighAlert(notification) {
    this.notifyHighAlert.next(notification);
  }

  notiFyToAllChildComponents(notification) {
    this.notifyHighAlert.next(notification);
  }
}
