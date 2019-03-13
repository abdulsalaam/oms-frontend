import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../service/order.service";
import {Order} from "../model/order.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./order.component.css']
})
export class ListOrderComponent implements OnInit {

  orders: Order[];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
      console.log('inside order list')
    this.orderService.getOrders()
      .subscribe( data => {
        this.orders = data;
      });
  }

  deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order._id)
      .subscribe( data => {
        this.orders = this.orders.filter(u => u !== order);
      })
  };

  editOrder(order: Order): void {
      console.log('usssss:',order);
     if(order) {
        console.log('order:',order);  
        localStorage.removeItem("editOrderId");
        localStorage.setItem("editOrderId", order._id.toString());
        this.router.navigate(['edit-order']);
     }
  };

  addOrder(): void {
    this.router.navigate(['add-order']);
  };
  
  viewOrder(order: Order): void {
      console.log('usssss:',order);
     if(order) {
        console.log('order:',order);  
        localStorage.setItem("viewOrderId", order._id.toString());
        this.router.navigate(['view-order']);
     }
  };
}
