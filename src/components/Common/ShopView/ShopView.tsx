import React, {ReactElement, useState} from "react";
import fullStar from "../../../lib/images/star1.png";
import emptyStar from "../../../lib/images/star2.png";
import styled from "styled-components";
import {Paper} from "@mui/material";
import {aboutStoreType} from "../../../lib/types";
import MQTT from "../../../lib/MQTT";

const DivTitle = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;

export default function ShopView(props: {
    favorites: boolean;
    favorOff: () => void;
    favorInsert: () => void;
    aboutStore: aboutStoreType;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    initialSelect: React.MutableRefObject<null>;
    topic: string;
    // children?: ReactElement<any, any> |,
}) {

    const {
        favorites,
        favorOff,
        favorInsert,
        aboutStore,
        setModal,
        initialSelect,

    } = props;

    const [contact, setContact] = useState(true);

    return (
        <>
            <DivTitle>
                {
                    favorites
                        //    즐겨찾기 해제
                        ? <span style={{marginLeft: "auto"}}><img style={{width: "40px"}} src={fullStar}
                                                                  onClick={favorOff}/></span>
                        //    즐겨찾기 추가
                        : <span style={{marginLeft: "auto"}}><img style={{width: "40px"}} src={emptyStar}
                                                                  onClick={favorInsert}/></span>
                }
                {/*{contact ? <span onClick={() => setContact(!contact)}>*/}
                {/*    연락하기*/}
                {/*    </span> :*/}
                {/*    <MQTT topic={props.topic} visible={()=>setContact(!contact)}/>*/}
                {/*}*/}
                <Paper style={{textAlign: 'center', paddingLeft: '100px', paddingRight: '100px'}}>
                    <img src={aboutStore.o_image} style={{width: '400px'}}/><br/>
                    <h2 style={{fontSize: 'xxx-large', color: 'black'}}>{aboutStore.o_name}</h2>
                    <h3 style={{color: 'gray', fontSize: 'x-large'}}>{aboutStore.o_time1} ~ {aboutStore.o_time2}</h3>
                </Paper>
            </DivTitle>
            <hr/>
            <div className={"nav"}>
                <a className={"a"} href="javascript:void(0);" onClick={() => setModal(true)}
                   ref={initialSelect}
                >상품 정보</a>
                <a className={"a"} href="javascript:void(0);" onClick={() => {
                    setModal(false)
                }}>매장 정보</a>
            </div>

        </>
    )
}


