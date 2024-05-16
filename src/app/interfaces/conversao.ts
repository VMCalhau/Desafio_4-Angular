import { Moeda } from "./moeda";

export interface Conversao {
    id: number;
    dataHora: Date;
    moedaOrigem: Moeda;
    moedaDestino: Moeda;
    valorConverter: number;
    resultado: number;
    taxa: number;
}
