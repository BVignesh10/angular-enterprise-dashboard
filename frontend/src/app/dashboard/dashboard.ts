import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface ItemData {
  id?: number;
  name: string;
  category: string;
  status: string;
  amount: number;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  activeTab: string = 'overview';
  isDarkMode: boolean = false;
  
  // Overview Data
  totalUsers = 1240;
  totalRevenue = 45200;
  activeProjects = 18;
  systemGrowth = 24.5;

  // Profile Settings Data
  profile = {
    name: 'Vignesh Badugu',
    email: 'baduguvignesh@gmail.com',
    role: 'System Administrator',
    bio: 'Full-Stack Developer managing enterprise dashboard applications.'
  };

  // Settings Configuration
  settings = {
    notifications: true,
    emailAlerts: true,
    autoBackup: false,
    apiPort: 8080
  };

  // User Management List
  usersList: UserData[] = [
    { id: 101, name: 'Vignesh Badugu', email: 'vignesh@admin.com', role: 'Admin', status: 'Active' },
    { id: 102, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Developer', status: 'Active' },
    { id: 103, name: 'Priya Verma', email: 'priya@example.com', role: 'Manager', status: 'Inactive' }
  ];

  // Data Management List
  items: ItemData[] = [
    { id: 1, name: 'Project Alpha', category: 'Development', status: 'Active', amount: 1500 },
    { id: 2, name: 'Marketing Campaign', category: 'Marketing', status: 'Pending', amount: 800 },
    { id: 3, name: 'Database Migration', category: 'Database', status: 'Completed', amount: 2300 }
  ];

  newItem: ItemData = { name: '', category: '', status: 'Active', amount: 0 };
  isEditing = false;
  editId: number | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchItemsFromBackend();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  addItem() {
    if (!this.newItem.name || !this.newItem.category) return;
    
    if (this.isEditing && this.editId !== null) {
      const index = this.items.findIndex(i => i.id === this.editId);
      if (index !== -1) {
        this.items[index] = { ...this.newItem, id: this.editId };
      }
      this.isEditing = false;
      this.editId = null;
    } else {
      const newId = this.items.length ? Math.max(...this.items.map(i => i.id || 0)) + 1 : 1;
      this.items.push({ ...this.newItem, id: newId });
    }
    
    this.resetForm();
  }

  editItem(item: ItemData) {
    this.newItem = { ...item };
    this.isEditing = true;
    this.editId = item.id || null;
  }

  deleteItem(id: number | undefined) {
    if (!id) return;
    this.items = this.items.filter(item => item.id !== id);
  }

  resetForm() {
    this.newItem = { name: '', category: '', status: 'Active', amount: 0 };
    this.isEditing = false;
    this.editId = null;
  }

  fetchItemsFromBackend() {
    this.http.get<ItemData[]>('http://localhost:8080/api/items').subscribe({
      next: (data) => { if (data && data.length) this.items = data; },
      error: () => console.log('Backend offline, using local data state.')
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}