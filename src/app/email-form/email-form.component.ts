import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

class ContactFormPost {
  EmailAddress: string;
  Plan: string;
  Message: string;
}


@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})

@Injectable()
export class EmailFormComponent implements OnInit {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  emailRegex = new RegExp(`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`);
  isLoading = false;
  emailAddy = '';
  selectedPlan = '';
  message = '';

  ngOnInit(): void {
  }

  sendEmail() {
    this.isLoading = true;
    if (!this.emailRegex.test(this.emailAddy)) {
      this.toastr.error('Please enter a valid email address', 'Invalid Data');
      this.isLoading = false;
      return;
    }

    if (this.message.match(/^ *$/)) {
      this.toastr.error('Please enter a a brief description of your idea', 'Invalid Data');
      this.isLoading = false;
      return;
    }

    const contactPost: ContactFormPost = {
      EmailAddress: this.emailAddy,
      Plan: this.selectedPlan,
      Message: this.message
    };

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    this.httpClient.post<any>(
      '/api/eltee/Contact',
      contactPost,
      {headers}
    ).subscribe({
      next: data => {
        this.emailAddy = '';
        this.selectedPlan = '';
        this.message = '';
        this.toastr.success('I\'ll get back to you in less than 24 hours.', 'Thanks for reaching out!');
        this.isLoading = false;
      },
      error: error => {
        this.toastr.error('Something went wrong.', 'Uh oh...');
        console.error('There was an error!', error);
        this.isLoading = false;
      }
    });
  }
}
