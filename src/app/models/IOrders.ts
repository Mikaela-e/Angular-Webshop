import { INewOrder } from "./INewOrder";
import { IOrderRows } from "./IOrderRows";

export class IOrders{
    id: number = 0;
    companyId: number = 13;
    created: string = new Date().toISOString().split('.')[0]
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: IOrderRows[];
    constructor(completeUserOrder: INewOrder, paymentMethod: string, totalPrice: number, orderRows: IOrderRows[]){
        this.createdBy = completeUserOrder.firstName +" " + completeUserOrder.lastName;
        this.paymentMethod = paymentMethod;
        this.totalPrice = totalPrice;
        this.status = 0;
        this.orderRows = orderRows;
    }
    }
