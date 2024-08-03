

declare interface IUserData { 
    name: string;
    email: string;
    password: string;
    profile?: string;
    isVerified:boolean;
    verifyToken?:string;
}

declare interface IMenuData { 
    title:string;
    description:string;
    category:string;
    image?:string;
    price:number;
    stock?:number;
    discountPercentage?:number;
    rating?:number;
}

declare interface ICategoryData{
    title:string;
    value:string;
}

declare interface IRestaurantData{
    name: string;
    email: string;
    password: string;
    address: string;
    menu?: string[];
    image?: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}


declare interface IOrderItemData {
  menu: string;
  quantity: number;
}

declare interface IOrderData {
  orderedBy: string;
  items: IOrderItemData[];
  totalPrice: number;
  status?: 'Pending' | 'Completed' | 'Cancelled';
  orderDate?: Date;
  deliveryAddress: string;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Cash' | 'PayPal';
}


interface ICartItem {
  menu: string;
  quantity: number;
}

declare interface ICartData {
  userId?: string; // ObjectId reference to the User model (optional)
  menuId?: string; // ObjectId reference to the Menu model (optional)
  quantity?: number; // Quantity of the item to be added/updated
  items?: ICartItem[]; // Array of cart items
  totalPrice?: number; // Total price of the items in the cart (optional, calculated on server)
}
