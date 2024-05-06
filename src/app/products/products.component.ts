import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public products : Array<Product>=[];
  public keyword : string="";
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;

  constructor(private productService : ProductService ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.currentPage,this.pageSize)
      .subscribe({
        next: (resp) => {
          /*let totalProducts1:number=parseInt(resp.headers.get('x-total-count')!);
          console.log(totalProducts1);

          this.products = resp.body as Product[];
          let totalProducts: number = 0;
          this.productService.getAllProducts().subscribe(
            result => {
              totalProducts = result.length;
              this.totalPages = Math.floor(totalProducts / this.pageSize);
              if (totalProducts % this.pageSize != 0) {
                this.totalPages = this.totalPages + 1;
              }
            });*/
          console.log(resp);
        },
        error: err => {
          console.log(err);
        }
      });
    //this.products$=this.productService.getProducts();
  }


  handleCheckProduct(product: Product){
    this.productService.checkProduct(product).subscribe({
      next :updatedProduct => {
        product.checked=!product.checked;
      }
    })
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sur?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        this.products=this.products.filter(p=>p.id!=product.id);
      }
    })
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next : value => {
        this.products=value;
      }
    })
  }

  handleGotoPage(page : number) {
    this.currentPage=page;
    this.getProducts();
  }
}
