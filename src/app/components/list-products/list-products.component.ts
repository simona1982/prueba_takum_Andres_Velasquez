import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormProductComponent } from '../form-product/form-product.component';
import { DataApiService } from 'src/app/services/data-api.service';
import { ProductViewModelInterface } from 'src/app/models/product-view-model-interface';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private dataService: DataApiService,
    private authService: AuthService ) { }

  private products: ProductViewModelInterface;
  public currentUser = '';

  ngOnInit() {
    this.loadProducts();
    this.currentUser = this.authService.getCurrentUser();
  }

  loadProducts(): void {
    this.dataService
      .getAllProducts()
      .subscribe((products: ProductViewModelInterface) => (
        this.products = products
      ));
  }

  clickAddProduct(){
    const modal = this.modalService.open(FormProductComponent);
    modal.result.then(
      this.handleModalProductFormClose.bind(this),
      this.handleModalProductFormClose.bind(this)
    )
  }

  handleModalProductFormClose(){
    //alert('se ha cerrado el modal');
  }

  onDeleteProduct(id: string): void{

    if (confirm('Estas seguro que desea eliminar el producto?')) {
      this.dataService.deleteProduct(id).subscribe(() => (
        location.reload()
      ));
      
    }
  }

  clickLogout(): void{
    this.authService.logoutUser()
    location.reload()
  }

}
