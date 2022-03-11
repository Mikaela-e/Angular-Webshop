import { Component, OnInit } from '@angular/core';
import { IOrders } from 'src/app/models/IOrders';
import { IProducts } from 'src/app/models/IProducts';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  orders: IOrders[] = [];
  products: IProducts[] =[]
  constructor(private service: ProductsService ) {}

  ngOnInit(): void {
    this.service.orders$.subscribe((data) =>{
      this.orders = data;
    });
    this.service.getCheckoutOrder();
  }
  deleteTheOrders(id: number){
  this.service.adminRemoveOrder(id);
}
};
