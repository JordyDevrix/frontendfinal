import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { AuthRequest } from '../auth/auth-request.model';
import { OrderedProduct } from '../models/productorder.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.scss'
})
export class OrderComponent implements OnInit {
  orders: Order[] = []; // Define a property to hold the list of orders
  public products_in_order: Order[];

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrder().subscribe(
      (orders: Order[]) => {
        this.orders = orders; // Assign fetched orders to the property
        console.log('Orders:', this.orders);
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}

  
