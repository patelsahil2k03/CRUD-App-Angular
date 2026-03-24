import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';
  errorMessage = '';
  isSaving = false;
  isDeleting = false;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: string): void {
    this.errorMessage = '';
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTutorial = data;
        },
        error: () => {
          this.errorMessage = 'Unable to load tutorial details.';
        }
      });
  }

  updatePublished(status: boolean): void {
    if (!this.currentTutorial.id) {
      return;
    }
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';
    this.errorMessage = '';
    this.isSaving = true;

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          this.currentTutorial.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
          this.isSaving = false;
        },
        error: () => {
          this.errorMessage = 'Unable to update status right now.';
          this.isSaving = false;
        }
      });
  }

  updateTutorial(): void {
    if (!this.currentTutorial.id) {
      return;
    }
    const title = this.currentTutorial.title?.trim() ?? '';
    const description = this.currentTutorial.description?.trim() ?? '';
    if (!title || !description) {
      this.errorMessage = 'Title and description are required.';
      return;
    }

    this.message = '';
    this.errorMessage = '';
    this.isSaving = true;

    this.tutorialService.update(this.currentTutorial.id, { ...this.currentTutorial, title, description })
      .subscribe({
        next: (res) => {
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
          this.isSaving = false;
        },
        error: () => {
          this.errorMessage = 'Unable to update tutorial.';
          this.isSaving = false;
        }
      });
  }

  deleteTutorial(): void {
    if (!this.currentTutorial.id) {
      return;
    }
    this.errorMessage = '';
    this.isDeleting = true;
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: () => {
          this.router.navigate(['/tutorials']);
        },
        error: () => {
          this.errorMessage = 'Unable to delete tutorial.';
          this.isDeleting = false;
        }
      });
  }

}
