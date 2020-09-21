import {Component, OnInit} from '@angular/core';
import {TableConfig} from '../../../../../../galileo/src/lib/components/galileo-table/table.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  tableData = [
    {name: 'Nicola', surname: 'Lopatriello'},
    {name: 'Greta', surname: 'Sasso'},
    {name: 'Domenico', surname: 'Grieco'},
    {name: 'Georgy', surname: 'Alarcon'}
  ];
  tableConfig: TableConfig = {
    mode: 'clientSide',
    builtInPagination: true,
    columnsDef: [
      {field: 'name', headerName: 'Name', filterConfig: {type: 'gllTextColumnFilter', options: ['contains']}},
      {field: 'surname', headerName: 'Surname', filterConfig: {type: 'gllTextColumnFilter', options: ['contains']}}
    ],
    actions: {
      delete: {builtIn: true, show: true, disabled: () => false}
    }
  };
  markDown = `
\`gll-table\` component allow us to create a Table in just few lines of code.

It support:
1. Client side filters and pagination
2. Server side filters and pagination with Java Spring Framework (in this case \`tableFilter()\` emits a parsed string like \`name~:Ni,surname~:lop\` to append to httpRequest)

To configure a table with client side filters and pagination just:

\`\`\`markup
<gll-table [tableConfig]="tableConfig" [data]="tableData"></gll-table>
\`\`\`
where \`tableConfig\` is
\`\`\`typescript
  tableConfig\: TableConfig \= \{
    mode: 'clientSide',
    builtInPagination: true,
    columnsDef: [
    {name: 'Nicola', surname: 'Lopatriello'},
    {name: 'Greta', surname: 'Sasso'},
    {name: 'Domenico', surname: 'Grieco'},
    {name: 'Georgy', surname: 'Alarcon'}
  ]
  };
\`\`\`
  `;


  constructor() {
  }

  ngOnInit(): void {
  }

}
