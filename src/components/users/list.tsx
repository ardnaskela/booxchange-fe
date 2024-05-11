import React from 'react';
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    EmailField,
    DateField,
} from '@refinedev/mui';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

export const UserList = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            /* {
                field: 'id',
                headerName: 'Id',
                type: 'number',
                minWidth: 50,
            }, */
            {
                field: 'username',
                flex: 1,
                headerName: 'Username',
                minWidth: 200,
            },
            {
                field: 'email',
                flex: 1,
                headerName: 'Email',
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
            },
            {
                field: 'provider',
                flex: 1,
                headerName: 'Provider',
                minWidth: 200,
            },
            {
                field: 'confirmed',
                headerName: 'Confirmed',
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: 'blocked',
                headerName: 'Blocked',
                minWidth: 100,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: 'createdAt',
                flex: 1,
                headerName: 'Created At',
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: 'updatedAt',
                flex: 1,
                headerName: 'Updated At',
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: 'center',
                headerAlign: 'center',
                minWidth: 80,
            },
        ],
        []
    );

    return (
        <>
            <div>Hello world!</div>
            <List>
                <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
        </>
    );
};
