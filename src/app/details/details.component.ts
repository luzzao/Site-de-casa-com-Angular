import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">Sobre a casa</h2>
        <ul> 
          <li>Unidades disponíveis: {{ housingLocation?.availableUnits }}</li>
          <li>Tem wifi? {{ housingLocation?.wifi }}</li>
          <li>Tem lavanderia? {{ housingLocation?.laundry }}</li>
        </ul>
        </section>
        <section class="listing-apply">
          <h2 class="section-heading">More Aqui</h2>
          <form [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="first-name">Nome</label>
            <input id="first-name" type="text" formControlName="firstName">

            <label id="last-name">Sobrenome</label>
            <input id="last-name" type="text" formControlName="lastName">

            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email">
            <button type="submit" class="primary">Compre Já!</button><br><br>
          </form>
          <a style="text-decoration: none" routerLink="/">Ver mais opções de casas!</a>
        </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
