import { Inject, Injectable, afterNextRender } from '@angular/core';
import { Conversao } from '../interfaces/conversao';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage!: Storage;
  private listaConversoes: Conversao[];

  constructor(@Inject(DOCUMENT) private document: Document) { 
    afterNextRender (() => {
      this.storage = localStorage;
    });
    this.listaConversoes = [];
  }

  getProximoId(): number {
    this.getAll();
    if (this.listaConversoes.length === 0) {
      return 0;
    }
    return Math.max(...this.listaConversoes.map(obj => obj.id)) + 1;
  }

  existeChave(chave: string) {
    return this.storage.getItem(chave) !== null;
  }
  
  setItem(conversao: Conversao): void {
    this.getAll();
    this.listaConversoes.push(conversao);
    this.storage.setItem("conversoes", JSON.stringify(this.listaConversoes));
  }

  removeItem(id: number): void {
    this.listaConversoes = this.listaConversoes.filter((c) => c.id !== id);
    this.storage.setItem("conversoes", JSON.stringify(this.listaConversoes));
  }

  getAll(): Conversao[] {
    if (this.existeChave("conversoes")) {
      this.listaConversoes = JSON.parse(this.storage.getItem("conversoes")!);
    }
    return this.listaConversoes;
  }
}
