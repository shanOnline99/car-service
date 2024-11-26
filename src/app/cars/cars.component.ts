import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cars',
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule
  ],
  standalone: true,
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  showForm: boolean = false;
  newCar = { car: '', regNo: '', owner: '', contacts: '' };
  cars: Array<{ car: string, regNo: string, owner: string, contacts: string }> = [];
  
  pageSize: number = 10; 
  pageIndex: number = 0; 
  paginatedCars: Array<{ car: string, regNo: string, owner: string, contacts: string }> = [];

  ngOnInit(): void {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      this.cars = JSON.parse(storedCars);
      this.updatePagination(); 
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addCar(): void {
    if (this.newCar.car && this.newCar.regNo && this.newCar.owner && this.newCar.contacts) {
      this.cars.push({ ...this.newCar });
      this.saveCars();
      this.newCar = { car: '', regNo: '', owner: '', contacts: '' };
      this.showForm = false;
      this.updatePagination();
    }
  }

  editCar(index: number): void {
    const carToEdit = this.cars[index];
    this.newCar = { ...carToEdit };
    this.cars.splice(index, 1);
    this.showForm = true;
    this.updatePagination(); 
  }

  deleteCar(index: number): void {
    this.cars.splice(index, 1);
    this.saveCars();
    this.updatePagination(); 
  }

  saveCars(): void {
    localStorage.setItem('cars', JSON.stringify(this.cars));
  }

  updatePagination(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCars = this.cars.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination(); 
  }

  get totalCars(): number {
    return this.cars.length;
  }
}
