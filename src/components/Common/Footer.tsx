import React from "react";
import styled from "styled-components";

const DivFooter = styled.div`
  bottom: 0;
  width: 100%;
  height: 100px;
  text-align: center;
  position: absolute;
  font-family:'Cafe24Oneprettynight' ;
  fontSize:'x-large';
`;

const DivFooter2 = styled.div`
  bottom: 0;
  width: 100%;
  height: 100px;
  text-align: center;
  margin-bottom: -50px;
`;

export default function Footer() {

    return (
        <>
            <DivFooter>
                <hr/>
                <h3 style={{color: "black", fontSize: 'x-large'}}>탄다오더</h3>

                <DivFooter2>
                    <span style={{fontSize: 'larger'}}>사업자 정보 확인</span> &nbsp; &nbsp;
                    <span style={{fontSize: 'larger'}}>이용약관</span> &nbsp; &nbsp;
                    <a href={'/PrivacyPolicy'} style={{
                        color: "black", textDecoration: 'none', fontSize: 'larger'
                    }}>개인정보처리방침</a> &nbsp; &nbsp;
                    <span style={{fontSize: 'larger'}}>위치정보이용약관</span>
                </DivFooter2>
                <DivFooter2>
                    <span style={{fontSize: 'large'}}>(주)더나은는 통신판매중개자이며 통신판매의 당사자가 아닙니다.</span><br/>
                    <span style={{fontSize: 'large'}}>따라서 탄다오더는 상품거래정보 및 거래에 대한 책임을 지지 않습니다.</span>
                </DivFooter2>
            </DivFooter>
        </>
    )
}
