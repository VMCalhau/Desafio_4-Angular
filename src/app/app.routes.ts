import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ListaMoedasComponent } from './components/pages/lista-moedas/lista-moedas.component';
import { ConversaoComponent } from './components/pages/conversao/conversao.component';
import { HistoricoComponent } from './components/pages/historico/historico.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'lista', component: ListaMoedasComponent},
    {path: 'converter', component: ConversaoComponent},
    {path: 'historico', component: HistoricoComponent}
];
