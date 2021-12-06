import React from "react";
import fullStar from "../../../lib/images/star1.png";
import emptyStar from "../../../lib/images/star2.png";
import styled from "styled-components";

const DivTitle = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;

export default function ShopView(props: { favorites: any; favorOff: any; favorInsert: any; aboutStore: any; setModal: any; initialSelect: any; }) {

    const {
        favorites,
        favorOff,
        favorInsert,
        aboutStore,
        setModal,
        initialSelect,

    } = props;

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
                <h2 style={{fontSize: 'xxx-large', color: 'black'}}>{aboutStore.o_name}</h2>
                <h3 style={{color: 'gray', fontSize: 'x-large'}}>{aboutStore.o_time1} ~ {aboutStore.o_time2}</h3>
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