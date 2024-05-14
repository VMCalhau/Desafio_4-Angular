import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../../services/currency.service';
import { Moeda } from '../../../interfaces/moeda';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-lista-moedas',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './lista-moedas.component.html',
  styleUrl: './lista-moedas.component.css'
})
export class ListaMoedasComponent implements OnInit {
  listaMoedas!: Moeda[];
  colunasTabela: string[] = ['codigo', 'nome'];

  constructor (private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((moedas) => (this.listaMoedas = moedas));
  }
}
