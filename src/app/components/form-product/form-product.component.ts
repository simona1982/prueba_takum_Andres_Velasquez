import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataApiService } from 'src/app/services/data-api.service';
import { ProductViewModelInterface } from 'src/app/models/product-view-model-interface';
import { ProductInterface } from './../../models/product-interface';
import { Location } from '@angular/common';



@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {

  productForm: FormGroup;
  product: ProductViewModelInterface;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private dataService: DataApiService,
    private location: Location) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  saveProduct() {
    //Validar el formulario
    if (this.productForm.invalid) {
      return;
    }

    let product: ProductInterface = this.productForm.value;

    this.dataService.saveProduct(product)
    .subscribe(
        data => {
          console.log(data);
          this.activeModal.dismiss({ product: data });
          location.reload();
        },
        //error => this.onIsError()
      );
  }

  

}
