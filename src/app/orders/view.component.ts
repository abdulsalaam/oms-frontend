import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order.service";
import {Router} from "@angular/router";
import {Order} from "../model/order.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './view.component.html',
  styleUrls: ['./order.component.css']
})
export class ViewOrderComponent implements OnInit {

  order: Order;
  viewForm: FormGroup;
  private orderStatus : string;
  
  private currentUser : any = {};
  constructor(private formBuilder: FormBuilder,private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    let orderId = localStorage.getItem("viewOrderId");
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currrent user in view order:',this.currentUser);    
    if(!orderId) {
      alert("Invalid action.")
      this.router.navigate(['orders']);
      return;
    }
    this.viewForm = this.formBuilder.group({
      _id: [],
      productId: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      tax: ['', Validators.required],
      total: ['', Validators.required],
      status: ['', Validators.required]
    });
    console.log('order id33:' ,orderId); 
    this.orderService.getOrderById(orderId)
      .subscribe( data => {
        console.log('edit order data:' ,data);
        let order : any = typeof data['data'] != undefined ? data['data'] : [];
        let formData = { _id:order._id, productId:order.productId, description: order.description, amount:order.amount, tax:order.tax, total:order.total, status:order.status }        
        this.viewForm.setValue(formData);
        this.orderStatus = order.status; 
      });
  }

  onSubmit() {
    console.log('make payment & update status:',this.viewForm.value);  
    this.orderService.updateOrder(this.viewForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['orders']);
        },
        error => {
          alert(error);
        });
  }
  
  onPayment() {
    console.log('make payment & update status:',this.viewForm.value);  
    let paymentOrderData = {};
    paymentOrderData['orderId'] = this.viewForm.value._id;
    paymentOrderData['userId'] = this.currentUser._id;
    paymentOrderData['amount'] = this.viewForm.value.amount;
    
    this.orderService.paymentOrder(paymentOrderData)
      .subscribe(
        data => {
            let PaymentRes : any = typeof data['payment'] != undefined ? data['payment'] : [];
            console.log('return payment status:',PaymentRes)
            this.orderService.updatePaymentStatus(PaymentRes)
              .subscribe(
                dataInner => {
                    console.log('inner response:',dataInner)
                    this.router.navigate(['orders']);
                },
                error => {
                  alert(error);
                });
          //this.router.navigate(['orders']);
        },
        error => {
          alert(error);
        });
  }

}
