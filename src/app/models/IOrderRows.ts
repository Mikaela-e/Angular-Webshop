export class IOrderRows{
    id: number;
    productId: number;
    product:null;
    amount: number;
    orderId:number
    constructor(id: number, productId: number, product: null, amount: number, orderId: number){
        this.id = id;
        this.productId = productId;
        this.product = null;
        this.amount = amount;
        this.orderId = orderId;
    }
}