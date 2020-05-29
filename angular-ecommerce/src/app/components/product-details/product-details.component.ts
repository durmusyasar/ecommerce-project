import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../common/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from '../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product
  constructor(private productService: ProductService,
              private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductsDetail()
    })
  }

  handleProductsDetail(){
    const theProductId: number = +this.route.snapshot.paramMap.get('id')
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data
      }
    )
  }

  addToCart(){
    const theCartItem = new CartItem(this.product)
    this.cartService.addToCart(theCartItem)
  }
}
