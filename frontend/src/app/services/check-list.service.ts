import { Injectable } from '@angular/core';
import { Subject, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckListService {
  public initalBackEndSteps: any[] = [
    {
      step: 1,
      info: ['Access the notes collection already created in the db'],
      isCompleted: false,
      isFront: false,
    },
    {
      step: 2,
      info: ['Create an api url to fetch data from db with a search param'],
      isCompleted: false,
      isFront: false,
    },
    {
      step: 3,
      info: ['You will use postman to test it'],
      isCompleted: false,
      isFront: false,
    },
  ];
  public initalFrontEndSteps: any[] = [
    {
      step: 1,
      info: ['Create a list page with a search feature.'],
      isCompleted: false,
      isFront: true,
    },
    {
      step: 2,
      info: [
        'Using search onBlur, observables or any advanced technique is a plus',
      ],
      isCompleted: false,
      isFront: true,
    },
  ];

  constructor() {}

  private changeInCheckListFront$$ = new Subject<{
    step: Number;
    info: string[];
    isCompleted: boolean;
  }>();
  public updateFrontEndCheckList = (checkListItem: any) => {
    this.changeInCheckListFront$$.next(checkListItem);
  };

  public frontEndCheckList$ = this.changeInCheckListFront$$.asObservable().pipe(
    map((checkList) => {
      const currentStorage = localStorage.getItem('FrontEndCheckList');
      const parsedCurrentStorage = JSON.parse(currentStorage!);
      if (!currentStorage || !parsedCurrentStorage) {
        const newLocalStorage = this.initalFrontEndSteps.map((step) => {
          if (step.step === checkList.step) {
            return checkList;
          }
          return step;
        });
        localStorage.setItem(
          'FrontEndCheckList',
          JSON.stringify(newLocalStorage)
        );
        return newLocalStorage;
      }
      const updateLocalStorage = parsedCurrentStorage.map((step: any) => {
        if (step.step === checkList.step) {
          return checkList;
        }
        return step;
      });
      localStorage.setItem(
        'FrontEndCheckList',
        JSON.stringify(updateLocalStorage)
      );
      return updateLocalStorage;
    }),
    startWith(
      localStorage.getItem('FrontEndCheckList')
        ? JSON.parse(localStorage.getItem('FrontEndCheckList')!)
        : this.initalFrontEndSteps
    )
  );

  private changeInCheckListBack$$ = new Subject<{
    step: Number;
    info: string[];
    isCompleted: boolean;
  }>();
  public updateBackEndCheckList = (checkListItem: any) => {
    this.changeInCheckListBack$$.next(checkListItem);
  };
  public backEndCheckList$ = this.changeInCheckListBack$$.asObservable().pipe(
    map((checkList) => {
      const currentStorage = localStorage.getItem('BackEndCheckList');
      const parsedCurrentStorage = JSON.parse(currentStorage!);
      if (!currentStorage || !parsedCurrentStorage) {
        const newLocalStorage = this.initalBackEndSteps.map((step) => {
          if (step.step === checkList.step) {
            return checkList;
          }
          return step;
        });
        localStorage.setItem(
          'BackEndCheckList',
          JSON.stringify(newLocalStorage)
        );
        return newLocalStorage;
      }
      const updateLocalStorage = parsedCurrentStorage.map((step: any) => {
        if (step.step === checkList.step) {
          return checkList;
        }
        return step;
      });
      localStorage.setItem(
        'BackEndCheckList',
        JSON.stringify(updateLocalStorage)
      );
      return updateLocalStorage;
    }),
    startWith(
      localStorage.getItem('BackEndCheckList')
        ? JSON.parse(localStorage.getItem('BackEndCheckList')!)
        : this.initalBackEndSteps
    )
  );
}
