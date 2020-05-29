import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/components/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from '../common/cart-item';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list-grid.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[]
  currentCategoryId: number
  previousCategoryId: number = 1;
  searchMode: boolean

  thePageNumber: number = 1
  thePageSize: number = 10
  theTotalElements: 0

  previousKeyword: string = null

  constructor( private productService: ProductService,
               private route: ActivatedRoute, private cartService: CartService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword')
    if(this.searchMode) this.handleSearchProducts()
    else this.handleListProducts();
  }

  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1
    }
    this.previousKeyword = theKeyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(
      this.processResults())
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')
    } else {
      this.currentCategoryId = 1
    }
    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1
    }
    this.previousCategoryId = this.currentCategoryId
    this.productService.getProductListPaginate(this.thePageNumber -1, this.thePageSize, this.currentCategoryId).subscribe(
      this.processResults()
    )
  }
  
  processResults() {
    return data => {
      this.products = data._embedded.products
      this.thePageNumber = data.page.number + 1
      this.thePageSize = data.page.size
      this.theTotalElements = data.page.totalElements
    }
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize
    this.thePageNumber = 1
    this.listProducts()
  }

  addToCart(theProduct: Product){
    const theCartItem = new CartItem(theProduct)
    this.cartService.addToCart(theCartItem)
  }
}
