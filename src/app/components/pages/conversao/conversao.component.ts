import { Component, OnInit } from '@angular/core';
import { Moeda } from '../../../interfaces/moeda';
import { CurrencyService } from '../../../services/currency.service';
import { StorageService } from '../../../services/storage.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Conversao } from '../../../interfaces/conversao';

@Component({
  selector: 'app-conversao',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './conversao.component.html',
  styleUrl: './conversao.component.css'
})
export class ConversaoComponent implements OnInit {
  listaMoedas: Moeda[] = [];
  moedaOrigem!: Moeda;
  moedaDestino!: Moeda;
  inputValor!: number;
  valorConverter!: number;
  valorConvertido!: number;
  taxaConversao!: number;

  constructor(private currencyService: CurrencyService, private storageService: StorageService) {}

  ngOnInit(): void {
    this._getMoedas();
  }

  private _validarCampos(): boolean {
    if (this.moedaDestino && this.moedaOrigem && this.valorConverter) {
      return true;
    }
    return false;
  }

  getConversao(): void {
    this.valorConverter = this.inputValor;
    if (this._validarCampos()) {
      let conversao: Conversao;
      this.currencyService.getPairAmount(this.moedaOrigem.codigo, this.moedaDestino.codigo, this.valorConverter).subscribe(
        (response) => {
          this.valorConvertido = response.resultado;
          this.taxaConversao = response.taxa;

          // cria objeto de Conversao para salvar dados no storage
          conversao = {
            id: this.storageService.getProximoId(),
            dataHora: new Date(),
            moedaOrigem: this.moedaOrigem,
            moedaDestino: this.moedaDestino,
            valorConverter: this.valorConverter,
            resultado: this.valorConvertido,
            taxa: this.taxaConversao
          };
          this.storageService.setItem(conversao);
        }
      );
    }
    else {
      console.log("Preencha todos os campos");
    }
  }

  private _getMoedas(): void {
    this.currencyService.getCurrencies().subscribe((moedas) => (this.listaMoedas = moedas));
  }
}
