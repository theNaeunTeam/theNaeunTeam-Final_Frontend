import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function TerminationWaiting(props: { loading: any; updateDB: any; setSelected: any; rows: any; columns: any; }) {
    const {
        loading,
        updateDB,
        setSelected,
        rows,
        columns,
    } = props;
    return (
        <>
            <h3 className='mainH3'>해지승인대기</h3>
            <div className='MasterMainBtn'>
                <button className='masterBtn' onClick={() => updateDB('ok')}>
                    승인
                </button>

            </div>
            <div style={{height: 650, width: '100%', margin: 'auto'}}>
                {loading
                    ?
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={loading}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    :
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
    );
}