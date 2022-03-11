export class INewOrder {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    payment: string;

    constructor(firstName: string, lastName: string, email: string, address: string, city: string, country: string, payment: string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.city = city;
    this.country = country;
    this.payment = payment;
    }
}