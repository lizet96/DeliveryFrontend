import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, CardModule],
  template: `
    <div class="login-container">
      <div class="login-wrapper">
        <p-card class="login-card">
          <div class="login-header">
            <h1 class="app-title">DeliveryApp</h1>
            <p class="app-subtitle">Sistema de Gestión de Entregas</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" class="login-form">
            <div class="field-group">
              <label for="username" class="field-label">
                <i class="pi pi-user"></i>
                Usuario
              </label>
              <input 
                pInputText 
                id="username" 
                [(ngModel)]="username" 
                name="username"
                class="custom-input"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
            
            <div class="field-group">
              <label for="password" class="field-label">
                <i class="pi pi-lock"></i>
                Contraseña
              </label>
              <input 
                pInputText 
                type="password" 
                id="password" 
                [(ngModel)]="password" 
                name="password"
                class="custom-input"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            
            <p-button 
              type="submit" 
              label="Iniciar Sesión" 
              [loading]="loading"
              styleClass="login-button"
            ></p-button>
          </form>
          
          <div class="demo-users" *ngIf="!loading">
            <div class="demo-header">
              <i class="pi pi-info-circle"></i>
              <span>Usuarios de prueba</span>
            </div>
            <div class="demo-user">
              <span class="user-role admin">Admin</span>
              <span class="user-credentials">admin / 123456</span>
            </div>
            <div class="demo-user">
              <span class="user-role delivery">Delivery</span>
              <span class="user-credentials">delivery1 / 123456</span>
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }
    
    .login-wrapper {
      width: 100%;
      max-width: 550px;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
      padding: 1.5rem 0;
      border-bottom: 2px solid #f1f3f4;
    }
    
    .app-title {
      color: #2c3e50;
      font-size: 2.8rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      letter-spacing: 1px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .app-subtitle {
      color: #6c757d;
      font-size: 1.2rem;
      margin: 0;
      font-weight: 400;
      letter-spacing: 0.5px;
    }
    
    .login-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      overflow: hidden;
    }
    
    .login-form {
      padding: 0 2rem 1rem 2rem;
    }
    
    .field-group {
      margin-bottom: 1.5rem;
    }
    
    .field-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
      color: #2c3e50;
      font-size: 0.95rem;
    }
    
    .field-label i {
      color: #667eea;
      font-size: 1rem;
    }
    
    .custom-input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid #e1e8ed;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fafbfc;
    }
    
    .custom-input:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-1px);
    }
    
    .custom-input::placeholder {
      color: #a0a9b8;
      font-style: italic;
    }
    
    ::ng-deep .login-button {
      width: 100%;
      height: 3.5rem;
      background: #7b68ee !important;
      border: none !important;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      margin-top: 0.5rem;
      color: white !important;
    }
    
    ::ng-deep .login-button .p-button-label {
      color: white !important;
    }
    
    ::ng-deep .login-button:hover {
      background: #6a5acd !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(123, 104, 238, 0.4);
    }
    
    ::ng-deep .login-button:active {
      transform: translateY(0);
      background: #5d4e9a !important;
    }
    
    ::ng-deep .login-button:focus {
      box-shadow: 0 0 0 3px rgba(123, 104, 238, 0.3) !important;
    }
    
    ::ng-deep .login-button .p-button-icon {
      display: none !important;
    }
    
    .demo-users {
      margin: 2rem;
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      border: 1px solid #dee2e6;
    }
    
    .demo-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-weight: 600;
      color: #495057;
      font-size: 0.95rem;
    }
    
    .demo-header i {
      color: #667eea;
    }
    
    .demo-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      transition: all 0.2s ease;
    }
    
    .demo-user:hover {
      transform: translateX(5px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .demo-user:last-child {
      margin-bottom: 0;
    }
    
    .user-role {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .user-role.admin {
      background: #e3f2fd;
      color: #1976d2;
      border: 1px solid #bbdefb;
    }
    
    .user-role.delivery {
      background: #e8f5e8;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
    }
    
    .user-credentials {
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      color: #6c757d;
      font-weight: 500;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .login-container {
        padding: 1rem;
      }
      
      .login-wrapper {
        max-width: 400px;
      }
      
      .app-title {
        font-size: 2.2rem;
      }
      
      .app-subtitle {
        font-size: 1rem;
      }
      
      .login-form {
        padding: 0 1.5rem 1rem 1.5rem;
      }
      
      .demo-users {
        margin: 1.5rem;
      }
      
      .demo-user {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
      }
    }
    
    /* Animaciones */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .login-wrapper {
      animation: fadeInUp 0.6s ease-out;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) return;
    
    this.loading = true;
    
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/delivery']);
        }
      },
      error: (error) => {
        this.loading = false;
        alert('Error de login: ' + error.error.message);
      }
    });
  }
}