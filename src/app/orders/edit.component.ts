import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order.service";
import {Router} from "@angular/router";
import {Order} from "../model/order.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: Order;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    let orderId = localStorage.getItem("editOrderId");
    
    if(!orderId) {
      alert("Invalid action.")
      this.router.navigate(['list']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      productId: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
    console.log('order id33:' ,orderId); 
    this.orderService.getOrderById(orderId)
      .subscribe( data => {
        console.log('edit order data:' ,data);
        let order : any = typeof data['data'] != undefined ? data['data'] : [];
        let formData = { _id:order._id, productId:order.productId, description: order.description, amount:order.amount }        
        this.editForm.setValue(formData);
      });
  }

  onSubmit() {
    this.orderService.updateOrder(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['orders']);
        },
        error => {
          alert(error);
        });
  }

}
