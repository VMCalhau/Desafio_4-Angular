import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { Moeda } from '../interfaces/moeda';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _apiKey = environment.API_KEY;
  private _apiUrl = environment.API_URL;
  

  constructor(private httpClient: HttpClient) { }

  getCurrencies(): Observable<Moeda[]> {
    return this.httpClient.get<any>(`${this._apiUrl}/${this._apiKey}/codes`).pipe(
      map(response => {
        return response.supported_codes.map((moeda: string[]) => ({
          codigo: moeda[0],
          nome: moeda[1]
        }));
      })
    );
  }

  getPairAmount(codOrigem: string, codDestino: string, valor: number): Observable<any> {
    return this.httpClient.get<any>(`${this._apiUrl}/${this._apiKey}/pair/${codOrigem}/${codDestino}/${valor}`).pipe(
      map(response => ({
        taxa: response.conversion_rate,
        resultado: response.conversion_result
      }))
    );
  }
}
