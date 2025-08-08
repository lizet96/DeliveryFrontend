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
  selector: 'app-delivery-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TableModule, TagModule],
  templateUrl: './delivery-dashboard.html',
  styleUrl: './delivery-dashboard.css'
})
export class DeliveryDashboardComponent implements OnInit, AfterViewInit {
  map: any;
  packages: any[] = [];
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Datos de ejemplo con más información
    this.packages = [
      { 
        id: 'PKG001', 
        customer: 'María González',
        address: 'Calle 123 #45-67, Bogotá', 
        status: 'pending', 
        priority: 'high',
        assignedTime: '08:30',
        estimatedTime: '10:00',
        phone: '+57 300 123 4567'
      },
      { 
        id: 'PKG002', 
        customer: 'Carlos Rodríguez',
        address: 'Carrera 45 #12-34, Medellín', 
        status: 'in_transit', 
        priority: 'medium',
        assignedTime: '09:15',
        estimatedTime: '11:30',
        phone: '+57 301 234 5678'
      },
      { 
        id: 'PKG003', 
        customer: 'Ana Martínez',
        address: 'Avenida 68 #23-45, Cali', 
        status: 'delivered', 
        priority: 'low',
        assignedTime: '07:45',
        estimatedTime: '09:30',
        phone: '+57 302 345 6789'
      },
      { 
        id: 'PKG004', 
        customer: 'Luis Pérez',
        address: 'Calle 85 #34-56, Barranquilla', 
        status: 'pending', 
        priority: 'high',
        assignedTime: '10:00',
        estimatedTime: '12:00',
        phone: '+57 303 456 7890'
      },
      { 
        id: 'PKG005', 
        customer: 'Sofia López',
        address: 'Carrera 15 #67-89, Cartagena', 
        status: 'in_transit', 
        priority: 'medium',
        assignedTime: '08:00',
        estimatedTime: '10:30',
        phone: '+57 304 567 8901'
      }
    ];
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    // Inicializar el mapa centrado en Colombia
    this.map = L.map('deliveryMap').setView([4.7110, -74.0721], 6);

    // Agregar capa de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Agregar marcadores para las entregas
    const deliveryLocations = [
      { lat: 4.7110, lng: -74.0721, city: 'Bogotá', packages: 2 },
      { lat: 6.2442, lng: -75.5812, city: 'Medellín', packages: 1 },
      { lat: 3.4516, lng: -76.5320, city: 'Cali', packages: 1 },
      { lat: 10.9685, lng: -74.7813, city: 'Barranquilla', packages: 1 },
      { lat: 10.3910, lng: -75.4794, city: 'Cartagena', packages: 1 }
    ];

    deliveryLocations.forEach(location => {
      const icon = L.divIcon({
        html: `<div class="custom-marker delivery-marker">
                 <i class="pi pi-map-marker"></i>
                 <span class="marker-count">${location.packages}</span>
               </div>`,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });

      L.marker([location.lat, location.lng], { icon })
        .bindPopup(`<b>${location.city}</b><br>${location.packages} entrega(s) asignada(s)`)
        .addTo(this.map);
    });
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'pending': return 'warning';
      case 'in_transit': return 'info';
      case 'delivered': return 'success';
      case 'failed': return 'danger';
      default: return 'secondary';
    }
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

  editPackageStatus(packageItem: any) {
    // Lógica para editar el estatus del paquete
    console.log('Editar estatus del paquete:', packageItem);
    // Aquí puedes agregar la lógica para abrir un modal de edición de estatus
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
