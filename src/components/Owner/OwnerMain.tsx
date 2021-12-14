import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FCM from "../../lib/FCM";
import {Bar} from "react-chartjs-2";
import styled from "styled-components";

const DivContainer = styled.div`
  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  clear: both;
  align-items: center;

`;
const DivHalfMenu = styled.div`
  display: inline-flex;
  margin: 10px;
  width: 90%;
  padding-left: 5%;
`;

const DivHalfMenu1 = styled.div`
  display: inline-flex;
  margin: 10px;
  width: 90%;
  padding-left: 5%;
  height: 80px;
  vertical-align: center;
  text-align: center;
`;
const DivChart = styled.div`
  display: block;
  margin: 10px;
  padding: 10px;
`;

const DivChart1 = styled.div`
  display: block;
  border: 1px solid #7EA0EA;
  width: 70%;
  margin: 15px auto;
  border-radius: 40px;
  padding: 25px;

`;
const DivChart2 = styled.div`
  display: block;
  width: 50%;
  border: 1px solid #7EA0EA;
  border-radius: 40px;
  padding: 15px;
  margin: 10px;
`;
const DivChart3 = styled.div`
  display: flex;
`;

const LineDiv = styled.div`
  display: inline-flex;
  padding: 10px;
  width: 20%;
  height: 60px;
  text-align: center;
  border: solid grey;
  margin-left: 10%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export default function OwnerMain(props: { loading: any; ownerPage: any; dayArr: any; dayIdx: any; daySumArr: any; option: any; subDIdx: any; desDIdx: any; monSumArr: any; monIdx: any; subIdx: any; monYear: any; desIdx: any; yearArr: any; yearIdx: any; yearSumArr: any; subYIdx: any; desYIdx: any; }) {
    const {
        loading,
        ownerPage,
        dayArr,
        dayIdx,
        daySumArr,
        option,
        subDIdx,
        desDIdx,
        monSumArr,
        monIdx,
        subIdx,
        monYear,
        desIdx,
        yearArr,
        yearIdx,
        yearSumArr,
        subYIdx,
        desYIdx
    } = props;
    return (
        <DivContainer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <DivHalfMenu1>
                <h1 style={{marginRight: '30px'}}>{ownerPage.o_name}</h1>
                {/*<FCM/>*/}
            </DivHalfMenu1>

            <DivHalfMenu>

                <LineDiv> 총 판매 금액 : {ownerPage.total} 원</LineDiv>
                <LineDiv>이번달 수익 : {ownerPage.monTotal} 원</LineDiv>
                <LineDiv>총 구매자 : {ownerPage.buyTotal} 명</LineDiv>
            </DivHalfMenu>
            <DivChart>
                <DivChart1>
                    <Bar style={{height: '100px'}}
                         data={{
                             labels: dayArr[dayIdx],
                             datasets: [{
                                 label: '일일 매출액',
                                 data: daySumArr[dayIdx],
                                 backgroundColor: [
                                     'rgba(153, 102, 255,0.2)',
                                     'rgba(202, 051, 204,0.2)',
                                     'rgba(201, 203, 207,0.2)',
                                     'rgba(255, 051, 102,0.2)',
                                     'rgba(255, 051, 000,0.2)',
                                     'rgba(255, 99, 132,0.2)',
                                     'rgba(255, 204, 000,0.2)',
                                     'rgba(255, 159, 64,0.2)',
                                     'rgba(255, 205, 86,0.2)',
                                     'rgba(75, 192, 192,0.2)',
                                     'rgba(000, 051, 255,0.2)',
                                     'rgba(54, 162, 235,0.2)',
                                 ],
                                 borderColor: [
                                     'rgb(153, 102, 255)',
                                     'rgb(202, 051, 204)',
                                     'rgb(201, 203, 207)',
                                     'rgb(255, 051, 102)',
                                     'rgb(255, 051, 000)',
                                     'rgb(255, 99, 132)',
                                     'rgb(255, 204, 000)',
                                     'rgb(255, 159, 64)',
                                     'rgb(255, 205, 86)',
                                     'rgb(75, 192, 192)',
                                     'rgb(000, 051, 255)',
                                     'rgb(54, 162, 235)',

                                 ],
                                 borderWidth: 1
                             }]
                         }}
                         options={option}

                    />
                    <div className='aa'>
                        <span onClick={subDIdx}>◀ </span>
                        {dayIdx <= dayArr.length ? 2019 + parseInt(String(dayIdx / 12)) : null} 년 {dayIdx - parseInt(String(dayIdx / 12)) * 12 + 1} 월
                        <span onClick={desDIdx}> ▶</span>
                    </div>
                </DivChart1>
                <DivChart3>
                    <DivChart2>
                        <Bar
                            data={{
                                labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                datasets: [{
                                    label: '월별 매출',
                                    data: monSumArr[monIdx],
                                    backgroundColor: [
                                        'rgb(75, 192, 192,0.2)',
                                        'rgba(000, 051, 255,0.2)',
                                        'rgb(54, 162, 235,0.2)',
                                        'rgb(153, 102, 255,0.2)',
                                        'rgba(102, 051, 204,0.2)',
                                        'rgb(201, 203, 207,0.2)',
                                        'rgba(255, 051, 102,0.2)',
                                        'rgba(255, 051, 000,0.2)',
                                        'rgb(255, 99, 132,0.2)',
                                        'rgba(255, 204, 000,0.2)',
                                        'rgb(255, 159, 64,0.2)',
                                        'rgb(255, 205, 86,0.2)',

                                    ],
                                    borderColor: [
                                        'rgb(75, 192, 192)',
                                        'rgba(000, 051, 255)',
                                        'rgb(54, 162, 235)',
                                        'rgb(153, 102, 255)',
                                        'rgba(102, 051, 204)',
                                        'rgb(201, 203, 207)',
                                        'rgba(255, 051, 102)',
                                        'rgba(255, 051, 000)',
                                        'rgb(255, 99, 132)',
                                        'rgba(255, 204, 000)',
                                        'rgb(255, 159, 64)',
                                        'rgb(255, 205, 86)',

                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            options={option}

                        />
                        <div className='aa'>
                            <span onClick={subIdx}>◀ </span>
                            {monYear}
                            <span onClick={desIdx}> ▶</span>
                        </div>
                    </DivChart2>
                    <DivChart2>
                        <Bar
                            data={{
                                labels: yearArr.slice(yearIdx - 3, yearIdx),
                                datasets: [{

                                    label: '연도별 매출액',
                                    data: yearSumArr.slice(yearIdx - 3, yearIdx),

                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 205, 86, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(255, 159, 64)',
                                        'rgb(255, 205, 86)'
                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            options={option}
                        />
                        <div className='aa'>
                            <span onClick={subYIdx}>◀</span>
                            <span onClick={desYIdx}>▶</span>
                        </div>
                    </DivChart2>
                </DivChart3>
            </DivChart>

        </DivContainer>
    )
}