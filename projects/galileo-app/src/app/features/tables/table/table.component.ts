import {Component, OnInit} from '@angular/core';
import {TableConfig} from '../../../../../../galileo/src/lib/components/galileo-table/table.component';
import {of} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  tableData = [
    {name: 'Nicola', surname: 'Lopatriello', isAdmin: true, isEnabled: true, age: 30},
    {name: 'Greta', surname: 'Sasso', isAdmin: false, isEnabled: false, age: 27},
    {name: 'Domenico', surname: 'Grieco', isAdmin: false, isEnabled: false, age: 33},
    {name: 'Georgy', surname: 'Alarcon', isAdmin: true, isEnabled: false, age: 20}
  ];
  tableConfig: TableConfig = {
    mode: 'clientSide',
    builtInPagination: true,
    columnsDef: [
      {
        field: 'name',
        headerName: of('Name'),
        filterConfig: {type: 'gllTextColumnFilter', options: ['contains']},
        popoverHelp: {showGotItButton: true, message: 'This is a short message about Name field.'}
      },
      {field: 'surname', headerName: 'Surname', filterConfig: {type: 'gllTextColumnFilter', options: ['contains']}},
      {
        field: 'age',
        headerName: 'Age',
        filterConfig: {type: 'gllNumberColumnFilter', options: ['equals', 'greaterThanOrEqual', 'lessThanOrEqual']}
      },
      {
        field: 'isAdmin',
        headerName: 'Admin',
        gllTableRenderer: 'gllTableBooleanRenderer',
        trueFaIcon: {color: 'green', icon: 'user-shield'},
        falseFaIcon: {color: 'red', icon: 'user'},
        popoverHelp: {showGotItButton: true, message: 'This is a short message about Admin field.'}
      },
      {field: 'isEnabled', headerName: 'Enabled', gllTableRenderer: 'gllTableBooleanRenderer'}
    ],
    actions: {
      delete: {builtIn: true, show: true, disabled: () => false, showDeleteConfirmInput: true}
    },
    extraActions: [
      {hide: false, label: 'Extra action', eventKey: 'extraAction1', iconColorProp: {color: 'black', icon: 'arrow-alt-circle-right'}}
    ]
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
