import { Component, afterNextRender, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { Conversao } from '../../../interfaces/conversao';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { Observable, lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, FormsModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {
  listaConversoes!: Conversao[];
  dataSource = new MatTableDataSource<Conversao>([]);
  colunasTabela: string[] = ['data', 'hora', 'valor', 'moedaOrigem', 'moedaDestino', 'resultado', 'taxa', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private storageService: StorageService, private changeDetector: ChangeDetectorRef, public dialog: MatDialog) {
    afterNextRender (() => {
      this._updateTable();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private _updateTable(): void {
    this.listaConversoes = this.storageService.getAll();
    this.dataSource.data = this.listaConversoes;
    this.changeDetector.detectChanges();
  }

  dataFormatada(data: Date): string {
    return new Date(data).toLocaleDateString();
  }

  horaFormatada(data: Date): string {
    return new Date(data).toLocaleTimeString().substring(0, 5);
  }

  private _openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(AlertDialogComponent);
    return dialogRef.afterClosed();
  }

  async excluir(id: number): Promise<void> {
      if (await lastValueFrom(this._openDialog())) {
        this.storageService.removeItem(id);
        this._updateTable();
      }
    }
}
