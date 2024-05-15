import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../../../services/currency.service';
import { Moeda } from '../../../interfaces/moeda';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-moedas',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './lista-moedas.component.html',
  styleUrl: './lista-moedas.component.css'
})
export class ListaMoedasComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Moeda>([]);
  colunasTabela: string[] = ['codigo', 'nome'];
  valorFiltro!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((moedas) => (this.dataSource.data = moedas));
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onChangeFilter(): void {
    this.dataSource.filter = this.valorFiltro;
  }
}
