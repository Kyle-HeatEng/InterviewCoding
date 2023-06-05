import { Injectable } from '@angular/core';
import { Subject, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckListService {
  public initalBackEndSteps: any[] = [
    {
      step: 1,
      info: [
        'Create a model of notes here is the interface for notes. With a title string type, a description string type, lastModified with date type and isCompleted with boolean type.',
      ],
      isCompleted: false,
      isFront: false,
    },
    {
      step: 2,
      info: [
        "Create a router that hits the https//localhost:840/api/note which calls a controller that returns a list from 'notes' collection. The notes route will have a query paramater of search which will be used to search the database. Async/Awit over .then is our prefered style. ",
        'A stronger answers will have a generic interface reflecting the enitity response with every enitity response have a boolean success property, a string | undefined message property and a generic data property. With all response following this interface.',
      ],
      isCompleted: false,
      isFront: false,
    },
    {
      step: 3,
      info: [
        'Add this router to the routes and test that your routes hit using Postman.',
      ],
      isCompleted: false,
      isFront: false,
    },
  ];
  public initalFrontEndSteps: any[] = [
    {
      step: 1,
      info: [
        'Create your notes module and notes routing module. Create a route called notes in the app routing module that will load the notes module on routing to "notes".',
      ],
      isCompleted: false,
      isFront: true,
    },
    {
      step: 2,
      info: [
        'The notes router will have a route that renders the component that will render your search bar and notes list, a path of "" is acceptable.',
      ],
      isCompleted: false,
      isFront: true,
    },
    {
      step: 3,
      info: [
        'import the HttpClientModule into the AppModule and create a notesService that create a fetch request to the server hitting the URL=`http://localhost:840/api/note?search=${search}`. Using a behabour subject to initalizes the fetching of the data from the server allows you to control the stream of the observable.',
        'example:',
        'private searchNotes$$ = new BehaviorSubject<string>("");',
        'public notesList$ = this.searchNotes$$.asObservable().pipe("YOU WILL NEED TO CREATE YOUR HTTP REQUEST ON EVERY UPDATE OF THE SEARCH STREAM AND MAP THE RETURNED OBSERVABLE TO A ARRAY")',
      ],
      isCompleted: false,
      isFront: true,
    },
    {
      step: 4,
      info: [
        'Create a component for your noteList and inject your service into the constructor. Using the ReactiveFormModule which will need to be imported into either the notes-module or the app-module depending on your implementation inject the FormBuilder service and create a form group that will have a FormControl of search. This can then be binded to a form in the html part of your component.',
        'A simpler answer can create a button that on clicking will emit the change in the behabour subject causing the http request for the list of notes.',
        'A more advanced answer will subscribe using the async pipe line to the changes in the form which will trigger an emission in the behabour subject causing the notesList$ stream to update. This will create the illusion of instant access to the database for the user.',
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
