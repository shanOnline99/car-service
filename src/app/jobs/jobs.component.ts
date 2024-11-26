import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-jobs',
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  showForm: boolean = false;
  newJob = { car: '', description: '', mechanic: '', status: 'Pending', estimatedTime: '' };
  jobs: Array<{ car: string, description: string, mechanic: string, status: string, estimatedTime: string }> = [];
  cars: Array<{ car: string, regNo: string, owner: string, contacts: string }> = [];

  // Pagination properties
  paginatedJobs: Array<{ car: string, description: string, mechanic: string, status: string, estimatedTime: string }> = [];
  pageSize: number = 10;
  currentPage: number = 0;

  ngOnInit(): void {
    this.loadJobs();
    this.loadCars();
    this.updatePaginatedJobs();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addJob(): void {
    if (this.newJob.car && this.newJob.description && this.newJob.mechanic && this.newJob.estimatedTime) {
      this.jobs.push({ ...this.newJob });
      this.saveJobs();
      this.newJob = { car: '', description: '', mechanic: '', status: 'Pending', estimatedTime: '' };
      this.showForm = false;
      this.updatePaginatedJobs();
    }
  }

  editJob(index: number): void {
    const job = this.jobs[index];
    this.newJob = { ...job };
    this.jobs.splice(index, 1);
    this.showForm = true;
    this.updatePaginatedJobs();
  }

  deleteJob(index: number): void {
    this.jobs.splice(index, 1);
    this.saveJobs();
    this.updatePaginatedJobs();
  }

  saveJobs(): void {
    localStorage.setItem('jobs', JSON.stringify(this.jobs));
  }

  loadJobs(): void {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      this.jobs = JSON.parse(storedJobs);
      this.updatePaginatedJobs();
    }
  }

  loadCars(): void {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      this.cars = JSON.parse(storedCars);
    }
  }

  updatePaginatedJobs(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedJobs = this.jobs.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedJobs();
  }
}
