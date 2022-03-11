import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INewOrder } from 'src/app/models/INewOrder';
import { IOrderRows } from 'src/app/models/IOrderRows';
import { IOrders } from 'src/app/models/IOrders';
import { IProducts } from 'src/app/models/IProducts';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    payment: new FormControl('',[Validators.required]),
});
  
  checkoutCart: IProducts[] = [];
  orderRows: IOrderRows[] = [];
  amount: number = 0;
  orders: IOrders[] = [];

  constructor( private service: ProductsService) { }

  ngOnInit(): void {
    let checkoutCartLS:string = sessionStorage.getItem("checkoutCart") || "[]";
    this.checkoutCart = JSON.parse(checkoutCartLS); 
};
  saveNewUser(){
  let newUserCreated = new INewOrder(
    this.userForm.value.firstName,
    this.userForm.value.lastName,
    this.userForm.value.email, 
    this.userForm.value.address,
    this.userForm.value.city, 
    this.userForm.value.counrty, 
    this. userForm.value.payment);
  this.completeOrder(newUserCreated)
  this.userForm.reset()
};
  completeOrder(completeUserOrder: INewOrder){
  for (let i = 0; i < this.checkoutCart.length; i++) {
  if(!this.orderRows.some((movies) => movies.productId === this.checkoutCart[i].id)) 
{
  this.orderRows.push({
    id: 0,
    orderId: 0,
    product: null,
    productId: this.checkoutCart[i].id,
    amount: this.amount + 1,
});
}};
  if (this.checkoutCart.length >= 1) {
    let totalPrice: number = 0;
  for (let j = 0; j < this.checkoutCart.length; j++) {
    const product = this.checkoutCart[j];
    totalPrice += product.price;
};
  totalPrice = this.checkoutCart.reduce(
    (acc, curr) => acc + curr.price,
    0
);
  let newOrder = new IOrders(completeUserOrder,completeUserOrder.payment,totalPrice, this.orderRows )
  this.service.completeOrder(newOrder);

  this.service.orderRows$.subscribe((checkoutOrderrow)=>{
  this.orderRows = checkoutOrderrow;
});
  const orderCreate = {
    createdBy: this.userForm.get('firstName')?.value,
    paymentMethod: this.userForm.get('payment')?.value,
    id: 0,
    created: new Date(),
    companyId: 13,
    status: 0,
    orderRows: this.orderRows,
};
  this.service.amountInCart(0)
  this.checkoutCart = []
  sessionStorage.removeItem('checkoutCart')
};
  alert("Yaaay, You made the order! Happy Movie Night!");
};
  removeButton(i : number){
  this.checkoutCart.splice(i,1)
  sessionStorage.clear();
    };
  };
