type Customers = {
  email: string;
  name: string;
};
type CustomerList = {
  name: ID;
  value: Customers;
};
type TrackingItemsList = {
  customer_id: ID;
  customer: Customers;
  items: Item[];
};
type Item = {
  item_id: ID;
  name: string;
  price: number;
  quantity: number;
};
type OrderResponse = {
  value: Order;
};
type CustomerResponse = {
  name: ID;
  value: Customers;
};
type Order = {
  Address: string;
  City: string;
  Lat: number;
  Lng: number;
  carrier: string;
  createdAt: string;
  shippingCost: number;
  trackingId: string;
  trackingItems: TrackingItemsList;
};
