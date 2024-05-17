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
import { lastValueFrom } from 'rxjs';

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

  private async _altoValor(): Promise<boolean> {
    let valorDolar: number = 0;

    if (this.moedaOrigem.codigo == 'USD') {
      valorDolar = this.valorConverter;
    }
    else if (this.moedaDestino.codigo == 'USD') {
      valorDolar = this.valorConvertido;
    }
    else {  // necessario fazer conversao para dolar
      valorDolar = (await lastValueFrom(this.currencyService.getPairAmount(this.moedaOrigem.codigo, 'USD', this.valorConverter))).resultado;
    }
    
    return valorDolar >= 500 ? true : false;
  }

  private async _salvarConversao(): Promise<void> {
    const conversao: Conversao = {
      id: this.storageService.getProximoId(),
      dataHora: new Date(),
      moedaOrigem: this.moedaOrigem,
      moedaDestino: this.moedaDestino,
      valorConverter: this.valorConverter,
      resultado: this.valorConvertido,
      taxa: this.taxaConversao,
      altoValor: await this._altoValor()
    };
    this.storageService.setItem(conversao);
  }

  getConversao(): void {
    this.valorConverter = this.inputValor;
    if (this._validarCampos()) {
      this.currencyService.getPairAmount(this.moedaOrigem.codigo, this.moedaDestino.codigo, this.valorConverter).subscribe(
        (response) => {
          this.valorConvertido = response.resultado;
          this.taxaConversao = response.taxa;
          this._salvarConversao();
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
