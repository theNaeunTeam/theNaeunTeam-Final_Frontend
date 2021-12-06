import React from 'react';
import {DataGrid} from "@mui/x-data-grid";

export default function MasterUserList(props: { setSelected: any; rows: any; columns: any; }) {

    const {
        setSelected,
        rows,
        columns,
    } = props;

    return (
        <>
            <h3 className='mainH3'> 회원 리스트 </h3>

            <div style={{height: 650, width: '100%', margin: 'auto'}}>
                {
                    <DataGrid
                        onStateChange={({selection}) => setSelected(selection)}
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        style={{
                            fontSize: 'large',
                            fontFamily: 'Chosunilbo_myungjo',
                            fontWeight: 'bold',
                            color: 'black'
                        }}
                    />
                }
            </div>
        </>
    )
}