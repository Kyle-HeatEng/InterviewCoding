import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  public backendSteps: string[] = [
    `Create a model of notes here is the interface for notes.

    export interface INotes {
      title: string;
      description: string;
      lastModified: Date;
      isCompleted: boolean;
    }`,
    `Create a router that hits the https//localhost:840/api/note which calls a controller that returns a list from 'notes' collection. The notes route will have a query paramater of search which will be used to search the database. Async/Awit over
    .then is our prefered style.

    A stronger answers will have a generic interface reflecting the enitity response with every enitity response have a boolean success property, a string | undefined message property and a generic data property. With all response following this interface.`,
    `Add this router to the routes and test that your routes hit using Postman.`,
  ];
  public frontendSteps: string[] = [
    `Create your notes module and notes routing module. Create a route called notes in the app routing module that will load the notes module on routing to "notes".`,
    `The notes router will have a route that renders the component that will render your search bar and notes list, a path of ' ' is acceptable.`,
    `import the HttpClientModule into the AppModule and create a notesService that create a fetch request to the server hitting the URL="http://localhost:840/api/note?search=searchVariable". Using a behabour subject to initalizes the fetching of the data from the server allows you to control the stream of the observable.

    example:

    private searchNotes$$ = new BehaviorSubject<string>('');
    public notesList$ = this.searchNotes$$.asObservable().pipe("YOU WILL NEED TO CREATE YOUR HTTP REQUEST ON EVERY UPDATE OF THE SEARCH STREAM AND MAP THE RETURNED OBSERVABLE TO A ARRAY")`,
    `Create a component for your noteList and inject your service into the constructor. Using the ReactiveFormModule which will need to be imported into either the notes-module or the app-module depending on your implementation inject the FormBuilder service and create a form group that will have a FormControl of search. This can then be binded to a form in the html part of your component.

    A simpler answer can create a button that on clicking will emit the change in the behabour subject causing the http request for the list of notes.

    A more advanced answer will subscribe using the async pipe line to the changes in the form which will trigger an emission in the behabour subject causing the notesList$ stream to update. This will create the illusion of instant access to the database for the user.
    `,
  ];

  public navigateToTest() {
    this.router.navigate(['test']);
  }
}
