import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {FaUserSecret} from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function MasterMain(props: { authReducer: any; updateDB: any; loading: any; setSelected: any; rows: any; columns: any; setLoginForm: any; loginForm: any; login: any; }) {

    const {
        authReducer,
        updateDB,
        loading,
        setSelected,
        rows,
        columns,
        setLoginForm,
        loginForm,
        login,
    } = props;

    return (
        <>

            {authReducer.isMaster ?
                <>
                    <h3 className='mainH3'> 점주 리스트 </h3>
                    <div className='MasterMainBtn'>
                        <button className='masterBtn' onClick={() => updateDB('ok')}>
                            입점승인
                        </button>
                        {' '}
                        <button className='masterBtn' onClick={() => updateDB('no')}>
                            입점반려
                        </button>
                    </div>
                    <div style={{height: 650, width: '100%', margin: 'auto'}}>
                        {loading ?
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
                :
                <>
                    <div className="aaa">
                        <div className="wrapper fadeInDown MasterLoginForm">
                            <div id="formContent">
                                <h2 className="active inactive tiger "> Master 로그인 </h2>
                                {/*<h2 className="inactive underlineHover tiger">Sign Up </h2>*/}

                                <div className="fadeIn first">
                                    {/*<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon"/>*/}
                                    <FaUserSecret style={{width: '50px', height: '50px', margin: '20px'}}/>
                                </div>

                                <input type="text" id="login" className="fadeIn second input1" name={'u_id'}
                                       placeholder="ID"
                                       onChange={e => setLoginForm({...loginForm, m_id: e.target.value})}
                                />
                                <input type="password" id="password" className="fadeIn third input1" name={'u_pw'}
                                       placeholder="PASSWORD"
                                       onChange={e => setLoginForm({...loginForm, m_pw: e.target.value})}
                                       onKeyPress={e => {
                                           if (e.key === 'Enter') login();
                                       }
                                       }
                                />
                                <br/>
                                <button className="fadeIn fourth loginBtn" onClick={login}>Log In</button>

                                <div id="formFooter">
                                    <a style={{color: '#92badd'}}>Master Login</a>
                                </div>

                            </div>
                        </div>
                    </div>

                </>
            }

        </>
    )
}