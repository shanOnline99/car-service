import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  jobs: Array<{ car: string, description: string, mechanic: string, status: string, estimatedTime: string }> = [];
  cars: Array<{ car: string, regNo: string, owner: string, contacts: string }> = [];
  
  ngOnInit(): void {
    this.createChart();
    this.loadJobs();
    this.loadCars()
    console.log('Jobs saved:', this.totalJobs);
  }

  createChart() {
    // Existing Sales Line Chart
    const salesCtx = document.getElementById('salesGraph') as HTMLCanvasElement;
    new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Serviced Cars',
            data: [10, 20, 15, 30, 25, 35, 45, 50, 40, 40, 38, 60],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Serviced Cars',
            },
          },
        },
      },
    });
  
    //Income and Profit Bar Chart
    const incomeProfitCtx = document.getElementById('incomeProfitGraph') as HTMLCanvasElement;
    new Chart(incomeProfitCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Income',
            data: [5000, 7000, 6000, 8000, 7500, 9500, 11000, 10000, 9000, 8700, 9400, 12000],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Profit',
            data: [2000, 3000, 2500, 3500, 3000, 4000, 4500, 4000, 3800, 3700, 4000, 5000],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Amount (LKR)',
            },
          },
        },
      },
    });
  }
  

  loadJobs(): void {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      this.jobs = JSON.parse(storedJobs);  
    }
  }

  get totalJobs(): number {
    return this.jobs.length;
  }

  get completedJobs(): number {
    return this.jobs.filter(job => job.status === 'Completed').length;
  }

  get inProgressJobs(): number {
    return this.jobs.filter(job => job.status === 'In Progress').length;
  }

  loadCars(): void {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      this.cars = JSON.parse(storedCars);
    }
    console.log(this.cars)
  }

  get totalCars(): number {
    return this.cars.length;
  }


}
