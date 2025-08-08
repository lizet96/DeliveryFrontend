import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

// Declarar Leaflet para TypeScript cuando se usa CDN
declare var L: any;

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TableModule, TagModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  map: any;
  packages: any[] = [];
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Datos de ejemplo de paquetes individuales
    this.packages = [
      { 
        id: 'PKG001', 
        deliveryPerson: 'Carlos Rodríguez',
        deliveryId: 'DEL001',
        customerName: 'Ana García',
        address: 'Calle 123 #45-67, Bogotá',
        status: 'pending',
        priority: 'high',
        assignedTime: '08:30 AM',
        estimatedDelivery: '10:00 AM',
        phone: '+57 300 111 2222'
      },
      { 
        id: 'PKG002', 
        deliveryPerson: 'Carlos Rodríguez',
        deliveryId: 'DEL001',
        customerName: 'Pedro López',
        address: 'Carrera 45 #12-34, Bogotá',
        status: 'in_transit',
        priority: 'medium',
        assignedTime: '09:00 AM',
        estimatedDelivery: '11:30 AM',
        phone: '+57 301 222 3333'
      },
      { 
        id: 'PKG003', 
        deliveryPerson: 'Carlos Rodríguez',
        deliveryId: 'DEL001',
        customerName: 'Laura Martín',
        address: 'Avenida 68 #23-45, Bogotá',
        status: 'delivered',
        priority: 'low',
        assignedTime: '07:45 AM',
        estimatedDelivery: '09:15 AM',
        phone: '+57 302 333 4444'
      },
      { 
        id: 'PKG004', 
        deliveryPerson: 'María González',
        deliveryId: 'DEL002',
        customerName: 'Roberto Silva',
        address: 'Calle 85 #34-56, Bogotá',
        status: 'pending',
        priority: 'high',
        assignedTime: '08:45 AM',
        estimatedDelivery: '10:15 AM',
        phone: '+57 303 444 5555'
      },
      { 
        id: 'PKG005', 
        deliveryPerson: 'María González',
        deliveryId: 'DEL002',
        customerName: 'Carmen Ruiz',
        address: 'Carrera 15 #67-89, Bogotá',
        status: 'in_transit',
        priority: 'medium',
        assignedTime: '09:15 AM',
        estimatedDelivery: '11:00 AM',
        phone: '+57 304 555 6666'
      },
      { 
        id: 'PKG006', 
        deliveryPerson: 'Juan Pérez',
        deliveryId: 'DEL003',
        customerName: 'Diego Morales',
        address: 'Calle 50 #78-90, Bogotá',
        status: 'delivered',
        priority: 'low',
        assignedTime: '07:30 AM',
        estimatedDelivery: '09:00 AM',
        phone: '+57 305 666 7777'
      },
      { 
        id: 'PKG007', 
        deliveryPerson: 'Ana Martínez',
        deliveryId: 'DEL004',
        customerName: 'Sofia Herrera',
        address: 'Avenida 30 #12-34, Bogotá',
        status: 'pending',
        priority: 'high',
        assignedTime: '08:00 AM',
        estimatedDelivery: '09:30 AM',
        phone: '+57 306 777 8888'
      },
      { 
        id: 'PKG008', 
        deliveryPerson: 'Ana Martínez',
        deliveryId: 'DEL004',
        customerName: 'Miguel Torres',
        address: 'Calle 72 #45-67, Bogotá',
        status: 'failed',
        priority: 'medium',
        assignedTime: '10:00 AM',
        estimatedDelivery: '11:30 AM',
        phone: '+57 307 888 9999'
      },
      { 
        id: 'PKG009', 
        deliveryPerson: 'Luis Torres',
        deliveryId: 'DEL005',
        customerName: 'Elena Vargas',
        address: 'Carrera 80 #56-78, Bogotá',
        status: 'in_transit',
        priority: 'high',
        assignedTime: '09:30 AM',
        estimatedDelivery: '11:00 AM',
        phone: '+57 308 999 0000'
      },
      { 
        id: 'PKG010', 
        deliveryPerson: 'Luis Torres',
        deliveryId: 'DEL005',
        customerName: 'Fernando Castro',
        address: 'Avenida 19 #89-01, Bogotá',
        status: 'delivered',
        priority: 'low',
        assignedTime: '08:15 AM',
        estimatedDelivery: '09:45 AM',
        phone: '+57 309 000 1111'
      }
    ];
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    // Inicializar mapa centrado en una ubicación por defecto
    this.map = L.map('map').setView([4.6097, -74.0817], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const deliveryPoints = [
      { lat: 4.6097, lng: -74.0817, title: 'Centro de Distribución Principal' },
      { lat: 4.6351, lng: -74.0703, title: 'Punto de Entrega Norte' },
      { lat: 4.5981, lng: -74.0758, title: 'Punto de Entrega Sur' },
      { lat: 4.6244, lng: -74.0647, title: 'Punto de Entrega Este' }
    ];

    deliveryPoints.forEach(point => {
      L.marker([point.lat, point.lng])
        .addTo(this.map)
        .bindPopup(point.title);
    });
  }

  getStatusLabel(status: string) {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in_transit': return 'En Tránsito';
      case 'delivered': return 'Entregado';
      case 'failed': return 'Fallido';
      default: return status;
    }
  }

  getStatusIcon(status: string) {
    switch (status) {
      case 'pending': return 'pi-clock';
      case 'in_transit': return 'pi-truck';
      case 'delivered': return 'pi-check-circle';
      case 'failed': return 'pi-times-circle';
      default: return 'pi-circle';
    }
  }

  getPriorityLabel(priority: string) {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return priority;
    }
  }

  getPriorityIcon(priority: string) {
    switch (priority) {
      case 'high': return 'pi-exclamation-triangle';
      case 'medium': return 'pi-minus';
      case 'low': return 'pi-arrow-down';
      default: return 'pi-circle';
    }
  }

  createNewShipment() {
    // Lógica para crear nuevo envío
    console.log('Crear nuevo envío');
    // lógica para abrir un modal 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
