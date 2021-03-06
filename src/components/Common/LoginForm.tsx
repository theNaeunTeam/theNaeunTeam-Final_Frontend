import React from 'react';
import styles from "../../lib/styles/LoginForm.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {CgUserlane} from "react-icons/cg";
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import {dispatchType} from "../../lib/types";
import {RouteComponentProps} from "react-router-dom";

export default function LoginForm(props: {
    handleForm: (e: React.FormEvent<HTMLFormElement>) => void;
    showLoginModal: boolean;
    dispatch: (d: dispatchType) => void;
    loginForm: { radio: string, u_id: string, u_pw: string };
    login: () => void;
    history: RouteComponentProps["history"];
    handleClickOpen: () => void;
    handleClose: () => void;
    findPw: string;
    setFindPw: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    findId: () => void;
    open: boolean;
}) {
    const {
        handleForm,
        showLoginModal,
        dispatch,
        loginForm,
        login,
        history,
        handleClickOpen,
        handleClose,
        findPw,
        setFindPw,
        loading,
        findId,
        open
    } = props;

    return (
        <div className={styles.fadeInDown + " " + styles.wrapper}>
            <div id={styles.formContent}>
                <form onChange={e => handleForm(e)} onSubmit={e => e.preventDefault()}
                      style={{display: 'inline-block'}}>
                    <div className={styles.fadeIn + " " + styles.first}>
                        {showLoginModal &&
                            <span className={styles.loginFormHeader}>
                                <CancelIcon style={{cursor: 'pointer'}} onClick={() => dispatch({type: false})}/>
                                </span>
                        }
                        <h1>???????????? ?????????</h1>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">?????? ????????? ????????? ?????????</FormLabel>
                            <RadioGroup row aria-label="type" name="radio" defaultValue={'individual'}>
                                <FormControlLabel
                                    value="individual"
                                    control={<Radio/>} label="????????????"/>
                                <FormControlLabel
                                    value="company" control={<Radio/>} label="????????????"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <br/>

                    <div className={styles.fadeIn + " " + styles.first} style={{fontSize: '20px'}}>
                        {loginForm.radio === 'individual' ? <CgUserlane style={{width: '50px', height: '50px'}}/>
                            : <AddBusinessTwoToneIcon style={{width: '50px', height: '50px'}}/>}
                    </div>

                    <br/>
                    <div className={styles.fadeIn + " " + styles.second}>
                        <Box
                            sx={{
                                '& > :not(style)': {m: 1, width: '25ch'},
                            }}
                        >
                            <TextField id="outlined-basic"
                                       label={loginForm.radio === 'individual' ? '?????????' : '???????????????'}
                                       variant="filled" name={'u_id'}
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <AccountCircle/>
                                               </InputAdornment>
                                           ),
                                       }}
                            />

                            <TextField id="outlined-basic" type='password' label="????????????" variant="filled"
                                       name={'u_pw'}
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <VpnKeyIcon/>
                                               </InputAdornment>
                                           ),
                                       }}
                                // onKeyPress={e => {
                                //     if (e.key === 'Enter') login();
                                // }}
                            />
                        </Box>
                    </div>
                    <br/>
                    <button className={styles.fadeIn + " " + styles.fourth + " " + styles.loginBtn}
                            onClick={login}
                    >?????????
                    </button>
                </form>
                <br/><br/>
                {
                    loginForm.radio === 'individual'
                        ?
                        <div id={styles.formFooter}>
                            <Button variant="outlined"
                                    onClick={() => {
                                        dispatch({type: false});
                                        history.push('/user/register');
                                    }}>
                                ????????????
                            </Button> {' '}
                            <Button variant="outlined" onClick={handleClickOpen}>
                                ???????????? ??????
                            </Button>
                        </div>
                        :
                        <div id={styles.formFooter}>
                            <Button variant="outlined" onClick={() => {
                                dispatch({type: false});
                                history.push('/owner/register')
                            }}>
                                ????????????
                            </Button>
                        </div>
                }

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>???????????? ??????</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ID??? ??????????????? ????????? ????????? ????????? ???????????? ?????? ????????? ???????????????
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="id"
                            label="?????????"
                            fullWidth
                            variant="standard"
                            value={findPw}
                            onChange={e => setFindPw(e.target.value)}
                        />
                        <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={loading}
                        >
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>??????</Button>
                        <Button onClick={findId}>??????</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}