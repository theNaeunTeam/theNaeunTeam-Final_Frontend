import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function ApprovalCompletion(props: { loading: any; setSelected: any; rows: any; columns: any; }) {
    const {
        loading,
        setSelected,
        rows,
        columns,

    } = props;

    return (
        <>
            <h3 className='mainH3'>입점신청 승인완료 </h3>
            <div style={{height: 650, width: '100%', margin: 'auto'}}>
                {
                    loading
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
    )
}