import { Component, OnInit } from '@angular/core';
import { Moeda } from '../../../interfaces/moeda';
import { CurrencyService } from '../../../services/currency.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-conversao',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './conversao.component.html',
  styleUrl: './conversao.component.css'
})
export class ConversaoComponent implements OnInit {
  listaMoedas: Moeda[] = [];
  codigoOrigem!: string;
  codigoDestino!: string;
  valorConverter!: number;
  valorConvertido!: number;
  taxaConversao!: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this._getMoedas();
  }

  private _validarCampos(): boolean {
    if (this.codigoDestino && this.codigoOrigem && this.valorConverter) {
      return true;
    }
    return false;
  }

  getConversao(): void {
    if (this._validarCampos()) {
      this.currencyService.getPairAmount(this.codigoOrigem, this.codigoDestino, this.valorConverter).subscribe(
        (response) => {
          this.valorConvertido = response.resultado;
          this.taxaConversao = response.taxa;
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
