import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: Tutorial[] = [];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  isLoading = false;
  isDeletingAll = false;
  errorMessage = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Unable to load tutorials. Check backend server and try again.';
          this.tutorials = [];
          this.isLoading = false;
        }
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.isDeletingAll = true;
    this.errorMessage = '';
    this.tutorialService.deleteAll()
      .subscribe({
        next: () => {
          this.refreshList();
          this.isDeletingAll = false;
        },
        error: () => {
          this.errorMessage = 'Unable to remove tutorials right now.';
          this.isDeletingAll = false;
        }
      });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;
    this.errorMessage = '';

    this.tutorialService.findByTitle(this.title.trim())
      .subscribe({
        next: (data) => {
          this.tutorials = data;
        },
        error: () => {
          this.errorMessage = 'Search failed. Please retry.';
          this.tutorials = [];
        }
      });
  }

}
