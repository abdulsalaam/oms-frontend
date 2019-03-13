import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Order} from "../model/order.model";
import { environment } from '../../environments/environment'

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:8080/order-portal/orders';
  baseUrl: string = environment.baseUrl;
  basePaymentUrl: string = environment.basePaymentUrl;
  apiAuthPin: string = environment.apiAuthPin;

  getOrders() {
    return this.http.get<Order[]>(this.baseUrl + '/orders');
  }

  getOrderById(id: string) {
    return this.http.get<Order>(this.baseUrl + '/orders/' + id);
  }

  createOrder(order: Order) {
    return this.http.post(this.baseUrl+ '/orders/', order);
  }

  updateOrder(order: Order) {
    return this.http.put(this.baseUrl + '/orders/' + order._id, order);
  }

  deleteOrder(id: string) {
    return this.http.delete(this.baseUrl + '/orders/' + id);
  }
  
   paymentOrder(order: any) {
    let headers = new HttpHeaders().set('pin', this.apiAuthPin); // create header object           
    return this.http.post(this.basePaymentUrl + '/payment', order, { headers: headers });
  }
  
  updatePaymentStatus(data: any) {
    return this.http.put(this.baseUrl + '/orders/payment/' + data.orderId, data);
  }
}
