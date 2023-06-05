import { Component } from '@angular/core';
import { CheckListService } from '../services/check-list.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.sass'],
})
export class CheckListComponent {
  private frontEndCheckList$ = this.checkListService.frontEndCheckList$;
  private backEndCheckList$ = this.checkListService.backEndCheckList$;

  private percentageCompleted$ = combineLatest([
    this.frontEndCheckList$,
    this.backEndCheckList$,
  ]).pipe(
    map(([frontEndCheckList, backEndCheckList]) => {
      const totalCompletedFront = frontEndCheckList.reduce(
        (acc: number, curr: any) => {
          const { isCompleted } = curr;
          return isCompleted ? acc + 1 : acc;
        },
        0
      );
      const totalCompletedBack = backEndCheckList.reduce(
        (acc: number, curr: any) => {
          const { isCompleted } = curr;
          return isCompleted ? acc + 1 : acc;
        },
        0
      );
      const totalCompleted = totalCompletedFront + totalCompletedBack;
      const totalSteps = frontEndCheckList.length + backEndCheckList.length;
      return Math.round((totalCompleted / totalSteps) * 100);
    })
  );
  constructor(private checkListService: CheckListService) {}
  public updateFrontEndCheckList = (checkListItem: any) => {
    const updatedCheckListItem = {
      ...checkListItem,
      isCompleted: !checkListItem.isCompleted,
    };
    this.checkListService.updateFrontEndCheckList(updatedCheckListItem);
  };
  public updateBackEndCheckList = (checkListItem: any) => {
    const updatedCheckListItem = {
      ...checkListItem,
      isCompleted: !checkListItem.isCompleted,
    };
    this.checkListService.updateBackEndCheckList(updatedCheckListItem);
  };
  public vm$ = combineLatest([
    this.frontEndCheckList$,
    this.backEndCheckList$,
    this.percentageCompleted$,
  ]).pipe(
    map(([frontEndCheckList, backEndCheckList, percentageCompleted]) => {
      return {
        frontEndCheckList,
        backEndCheckList,
        percentageCompleted,
      };
    })
  );
}
