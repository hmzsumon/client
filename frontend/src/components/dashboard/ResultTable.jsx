import { default as React } from 'react';
import Table, { SelectColumnFilter, StatusPill } from '../../table/Table'; // new

function ResultTable({ tickets }) {
  // columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Ticket No:',
        accessor: 'ticketNumber',
      },
      {
        Header: 'Prise',
        accessor: 'price',
      },
      {
        Header: 'Next Draw',
        accessor: 'nextDrawTime',
      },
      {
        Header: 'Result',
        accessor: 'result',
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
      {
        Header: 'Prize',
        accessor: 'prize',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusPill,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
    ],
    []
  );

  const data = React.useMemo(() => tickets, [tickets]);

  return <Table columns={columns} data={data} />;
}

export default ResultTable;
