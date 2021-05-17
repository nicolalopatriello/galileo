import {Component, OnInit} from '@angular/core';
import {TableConfig} from '../../../../../../galileo/src/lib/components/galileo-table/table.component';
import {from, of} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  tableData = [
    {
      date: 1605871315000,
      name: 'Nicola',
      surname: 'Lopatriello',
      isAdmin: true,
      isEnabled: true,
      age: 30,
      description: 'this is a description'
    },
    {
      date: 1606871315000,
      name: 'Greta',
      surname: 'Sasso',
      isAdmin: false,
      isEnabled: false,
      age: 27,
      description: 'this is a long description with some lorem ipsum and lorem'
    },
    {
      date: 1606871315000,
      name: 'Domenico',
      surname: 'Grieco',
      isAdmin: false,
      isEnabled: false,
      age: 33,
      description: 'r since the 1500s, when an unknown printer took a galley of type and scrambled it'
    },
    {
      date: 1605871315000,
      name: 'Georgy',
      surname: 'Alarcon',
      isAdmin: true,
      isEnabled: false,
      age: 20,
      description: '2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum'
    }
  ];
  tableConfig: TableConfig = {
    mode: 'clientSide',
    maxHeight: '60vh',
    builtInPagination: true,
    isRowHighLighted: {
      textColor: 'red',
      backgroundColor: 'yellow',
      condition: (t) => this.isHighLighted(t)
    },
    columnsDef: [
      {
        field: 'date',
        headerName: of('Date'),
        gllTableRenderer: 'gllTableDateTimeRenderer',
        filterConfig: {
          type: 'gllDateColumnFilter',
          options: ['equals', 'greaterThanOrEqual', 'lessThanOrEqual', 'inRange']
        },
        sorting: {
          enabled: true,
          default: 'asc'
        },
      },
      {
        field: 'name',
        headerName: of('Name'),
        filterConfig: {type: 'gllTextColumnFilter', options: ['contains']},
        helpMessage: {type: 'tooltip', message: 'This is a short message about Name field.'},
        sorting: {
          enabled: true,
          default: 'asc'
        },
      },
      {
        field: 'surname',
        headerName: 'Surname',
        filterConfig: {type: 'gllTextColumnFilter', options: ['contains']},

      },
      {
        field: 'age',
        headerName: 'Age',
        filterConfig: {type: 'gllNumberColumnFilter', options: ['equals', 'greaterThanOrEqual', 'lessThanOrEqual']},
      },
      {
        field: 'description',
        headerName: 'Description',
      },
      {
        field: 'isAdmin',
        headerName: 'Admin',
        gllTableRenderer: 'gllTableBooleanRenderer',
        trueFaIcon: {color: 'green', icon: 'shield'},
        falseFaIcon: {color: 'red', icon: 'user'},
        helpMessage: {type: 'tooltip', message: 'This is a short message about Admin field.'},
      },
      {
        field: 'isEnabled',
        headerName: 'Enabled',
        gllTableRenderer: 'gllTableBooleanRenderer',
      }
    ],
    actions: {
      delete: {builtIn: true, show: true, disabled: () => false, showDeleteConfirmInput: true}
    },
    extraActions: [
      {
        hide: from(this.hasFakePermissions.then(res => !res)),
        label: 'Test to hide',
        eventKey: 'extraAction1',
        disabled: (t) => !(t.age > 20),
        iconColorProp: {color: 'black', icon: 'arrow-alt-circle-right'}
      }
    ]
  };

  get hasFakePermissions(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  tableConfigServerSide: TableConfig = {
    maxHeight: '70vh',
    hideActionsMenu: of(true),
    mode: 'serverSide',
    tableFilterParser: 'spring',
    builtInPagination: true,
    navigableRowBehavior: {
      enabled: of(true)
    },
    columnsDef: [
      {
        field: 'date',
        headerName: of('Date'),
        gllTableRenderer: 'gllTableDateTimeRenderer',
        filterConfig: {
          type: 'gllDateColumnFilter',
          options: ['equals', 'greaterThanOrEqual', 'lessThanOrEqual', 'inRange']
        },
        sorting: {
          enabled: true,
          default: 'desc'
        },
      },
      {
        field: 'name',
        headerName: of('Name'),
        filterConfig: {type: 'gllTextColumnFilter', options: ['contains']},
        helpMessage: {type: 'tooltip', message: 'This is a short message about name field.'},
        sorting: {
          enabled: true,
          default: 'asc'
        },
      },
      {
        field: 'surname',
        headerName: 'Surname',
        filterConfig: {type: 'gllTextColumnFilter', options: ['contains']},
      },
      {
        field: 'age',
        headerName: 'Age',
        filterConfig: {type: 'gllNumberColumnFilter', options: ['equals', 'greaterThanOrEqual', 'lessThanOrEqual']},
      },
      {
        field: 'description',
        headerName: 'Description',
      },
      {
        field: 'isAdmin',
        headerName: 'Admin',
        gllTableRenderer: 'gllTableBooleanRenderer',
        trueFaIcon: {color: 'green', icon: 'user-shield', tooltip: of('byObservable')},
        falseFaIcon: {color: 'red', icon: 'user', tooltip: 'Simple text'},
        helpMessage: {type: 'tooltip', message: 'This is a short message about Admin field.'},
        filterConfig: {
          type: 'gllSelectMenuColumnFilter', options: ['equals'], selectMenuOptions: ['true', 'false']
        }
      },
      {field: 'isEnabled', headerName: 'Enabled', gllTableRenderer: 'gllTableBooleanRenderer'}
    ],
    actions: {
      delete: {builtIn: true, show: true, disabled: () => false, showDeleteConfirmInput: true}
    },
    extraActions: [
      {label: 'extraAction', disabled: (f) => false, eventKey: 'extraAction', iconColorProp: {color: 'black', icon: 'user'}}
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
  public currentServerSideFilter: any;
  isDataLoading = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  onTableServerSideFilter($event: any) {
    this.currentServerSideFilter = $event;
  }

  onExtraAction($event: { eventKey: string; data: any }) {
    console.log($event);
  }

  private isHighLighted(t) {
    return t.age > 20;
  }

  onExtraActionFromServer($event: { eventKey: string; data: any }) {
    console.log($event);
  }

  testLoadingData() {
    this.isDataLoading = true;
    setTimeout(_ => this.isDataLoading = false, 50000);
  }

  onTableSort($event: any) {
    console.log(JSON.stringify($event))
  }
}
