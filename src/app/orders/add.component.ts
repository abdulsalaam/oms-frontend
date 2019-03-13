import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../service/order.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private orderService: OrderService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      productId: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

  }

  onSubmit() {
    this.orderService.createOrder(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['orders']);
      });
  }

}
