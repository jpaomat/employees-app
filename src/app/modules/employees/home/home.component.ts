import { Component, OnInit } from '@angular/core';
import { ProductFormModalService } from 'src/app/core/services/productFormModal/product-form-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private productFormService: ProductFormModalService
  ) {
  }

  ngOnInit(): void {
    this.showForm(true);
  }

  public showForm(state: boolean) {
    this.productFormService.showModal({
      activateModal: state,
      activateInput: true
    });
  }

}
