import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editProduct:Product={
    id: '',
    name: '',
    type: '',
    color: '',
    price: 0
  };

  constructor(private productService: ProductsService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=params.get('id');
        if(id){
          this.productService.getProduct(id)
          .subscribe({
            next:(response)=>{
              this.editProduct=response;
            },
            error:(res)=>{
              console.log(res);
            }
          })
        }
      }
    });
  }
  updateProduct(){
    this.productService.updateProduct(this.editProduct.id,this.editProduct)
    .subscribe({
      next:(response)=>{
        this.router.navigate(['products']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
