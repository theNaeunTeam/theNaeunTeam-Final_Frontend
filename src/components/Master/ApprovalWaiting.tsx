import React from "react";
import {DataGrid} from "@mui/x-data-grid";

export default function ApprovalWaiting(props: { updateDB: any; setSelected: any; rows: any; columns: any; }) {
    const {
        updateDB,
        setSelected,
        rows,
        columns,

    } = props;

    return (
        <>
            <h3 className='mainH3'>입점신청 승인대기 </h3>
            <div className='MasterMainBtn'>
                <button className='masterBtn' onClick={() => updateDB('ok')}>
                    승인
                </button>
                {' '}
                <button className='masterBtn' onClick={() => updateDB('no')}>
                    반려
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