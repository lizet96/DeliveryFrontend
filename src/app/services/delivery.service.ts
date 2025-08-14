import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeliveryUser {
  id: string;
  username: string;
  status: 'working' | 'off';
}

export interface NewPackage {
  delivery_address: string;
  assigned_to?: string | null;
  phone?: string;  
  priority?: 'low' | 'medium' | 'high';  
  status?: string;
}

export interface Package {
  id: number;
  delivery_address: string;
  status: 'En transito' | 'Entregado' | 'Regresado';
  assigned_to?: string;
  phone?: string;  
  priority?: 'low' | 'medium' | 'high';  
  created_at?: string;
  assigned_user?: DeliveryUser;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getDeliveryUsers(): Observable<DeliveryUser[]> {
    return this.http.get<DeliveryUser[]>(`${this.apiUrl}/users/delivery`);
  }

  createPackage(packageData: NewPackage): Observable<Package> {
    return this.http.post<Package>(`${this.apiUrl}/packages`, packageData);
  }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/packages`);
  }

  getDeliveryPackages(userId: string): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/packages/delivery/${userId}`);
  }

  updatePackageStatus(packageId: number, status: string): Observable<Package> {
    return this.http.put<Package>(`${this.apiUrl}/packages/${packageId}/status`, { status });
  }
}