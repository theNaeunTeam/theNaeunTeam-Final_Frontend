import React from 'react';
import {DataGrid} from "@mui/x-data-grid";

export default function TerminationCompletion(props: { loading: any; updateDB: any; setSelected: any; rows: any; columns: any; }) {

    const {
        loading,
        updateDB,
        setSelected,
        rows,
        columns,
    } = props;

    return (
        <>
            <h3 className='mainH3'>해지신청 완료 </h3>
            <div className='MasterMainBtn1'>
                <button className='masterBtn' onClick={() => updateDB('ok')}>
                    승인 취소
                </button>
            </div>
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