import React from "react";
import err from '../../lib/images/403error.png';
import styled from "styled-components";
import '../../lib/styles/button.scss';
import {useHistory} from "react-router-dom";


export default function PageNotFound() {

    const history = useHistory();

    const Diverr = styled.div`
      display: block;
      justify-content: center;
      text-align: center;
    `;

    const Diverr2 = styled.div`
      margin-top: 90px;
    `;

    return (
        <>
            <Diverr2>
                <Diverr>
                    <img src={err}/>
                </Diverr>
                <Diverr>
                    <button className='MainBtn' style={{margin: '30px'}} onClick={() => {
                        history.push('/')
                    }}>메인으로 이동
                    </button>
                </Diverr>
            </Diverr2>
        </>
    )
}
