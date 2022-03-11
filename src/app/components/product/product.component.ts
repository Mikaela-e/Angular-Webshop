import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/models/IProducts';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: IProducts[] = [];
  productIds: number = 0;
  checkoutCart: IProducts[] = [];
  
  constructor(private route: ActivatedRoute, private service: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p)=>{
    this.productIds = +p['id'];
});
    this.service.products$.subscribe((dataFromService: IProducts[])=>{
    this.products = dataFromService;
});
    this.service.getTheProducts();
    let checkoutCartLS:string = sessionStorage.getItem("checkoutCart") || "[]";
    this.checkoutCart = JSON.parse(checkoutCartLS);
};
  addToCheckout(moveTocart: IProducts){
    this.checkoutCart.push(moveTocart);
    console.log(this.checkoutCart);
    this.saveToLS();
};
  saveToLS(){
    sessionStorage.setItem("checkoutCart", JSON.stringify(this.checkoutCart));
  }
};
