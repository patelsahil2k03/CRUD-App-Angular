import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent {

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(private tutorialService: TutorialService) { }

  saveTutorial(): void {
    this.errorMessage = '';
    const title = this.tutorial.title?.trim() ?? '';
    const description = this.tutorial.description?.trim() ?? '';

    if (!title || !description) {
      this.errorMessage = 'Title and description are required.';
      return;
    }

    const data = {
      title,
      description
    };

    this.isSubmitting = true;
    this.tutorialService.create(data)
      .subscribe({
        next: () => {
          this.submitted = true;
          this.isSubmitting = false;
        },
        error: () => {
          this.errorMessage = 'Unable to save tutorial. Please try again.';
          this.isSubmitting = false;
        }
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.isSubmitting = false;
    this.errorMessage = '';
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }

}
