import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrderRows } from '../models/IOrderRows';
import { IOrders } from '../models/IOrders';
import { IProducts } from '../models/IProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
///Products
  private product = new Subject<IProducts[]>();
  public products$ = this.product.asObservable();
///Orders
  private orders = new Subject<IOrders[]>();
  public orders$ = this.orders.asObservable();
//Amount in the Cart
  private amountItems = new Subject<number>();
  public amountItems$ = this.amountItems.asObservable();
///OrderRows
  private orderRows = new Subject<IOrderRows[]>();
  public orderRows$ = this.orderRows.asObservable();

  constructor(private http: HttpClient) { }
/// Get the products API
  getTheProducts(){
    this.http.get<IProducts[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products').subscribe((dataFrom: IProducts[])=> {
    this.product.next(dataFrom);
});
};
  completeOrder(orderMake: IOrders){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('', 'aplication/json')
    return this.http.post("https://medieinstitutet-wie-products.azurewebsites.net/api/orders", orderMake, {headers: httpHeaders}).subscribe((dataForTheOrder)=>{
});
};
///Get orders API to Admin
  getCheckoutOrder(){
    this.http.get<IOrders[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=13").subscribe((dataForOrders: IOrders[])=>{
    this.orders.next(dataForOrders)
});
};
  amountInCart(amount: number){
    this.amountItems.next(amount)
};
///Delete order API from Admin
  adminRemoveOrder(id:number){
    this.http.delete("https://medieinstitutet-wie-products.azurewebsites.net/api/orders/" + id + '?companyId=13').subscribe(()=>{
    this.getCheckoutOrder()
});
}};