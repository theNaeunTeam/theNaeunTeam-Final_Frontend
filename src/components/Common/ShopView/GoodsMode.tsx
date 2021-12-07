import {Button} from "@mui/material";
import ShopViewTableBuilder from "./ShopViewTableBuilder";
import React from "react";
import styled from "styled-components";
import {categoryType, shopViewType} from "../../../lib/types";

const DivButton = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  padding: 0;
  display: flex;
  list-style: none;
  justify-content: space-around;
`;

export default function GoodsMode(props: {
    color: { case1: boolean, case2: boolean, case3: boolean, case4: boolean, case5: boolean, case6: boolean, case7: boolean };
    categoryChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
    category: categoryType;
    rows: shopViewType[];
    saveGoods: (e: React.FormEvent<HTMLFormElement>, max: number) => void;
}) {
    const {
        color,
        categoryChange,
        category,
        rows,
        saveGoods,
    } = props;

    return (
        <>
            <DivButton className='gbtn1'>
                <Button name='case1' style={color.case1 ? {
                    background: 'orangered',
                    color: 'white',
                    borderColor: 'white'
                } : undefined}
                        variant="outlined"
                        onClick={(e) => categoryChange(e)}>전체 {' '}
                    {category.drink + category.fresh + category.gagong + category.freeze + category.cooked + category.other}
                </Button>
                <Button name='case2' style={color.case2 ? {
                    background: 'orangered',
                    color: 'white',
                    borderColor: 'white'
                } : undefined}
                        variant="outlined"
                        onClick={categoryChange}>마실것 {category.drink}</Button>
                <Button name='case3' style={color.case3 ? {
                    background: 'orangered',
                    color: 'white',
                    borderColor: 'white'
                } : undefined}
                        variant="outlined"
                        onClick={categoryChange}>신선식품 {category.fresh}</Button>
                <Button name='case4' style={color.case4 ? {
                    background: 'orangered',
                    color: 'white',
                    borderColor: 'white'
                } : undefined}
                        variant="outlined"
                        onClick={categoryChange}>가공식품 {category.gagong}</Button>
                <Button name='case5' style={color.case5 ? {
                    background: 'orangered',
                    color: 'white',
                    borderColor: 'white'
                } : undefined}
                        variant="outlined"
                        onClick={categoryChange}>냉동식품 {category.freeze}</Button>
                <Button name='case6' style={color.case6 ? {
                    background: 'orangered',
                    color: 'white',
                    borderColor: 'white'
                } : undefined}
                        variant="outlined"
                        onClick={categoryChange}>조리/반조리 {category.cooked}</Button>
                <Button name='case7' style={color.case7 ? {
                    background: 'orangered',
                    color: 'white',
                    borderColor: 'white'
                } : undefined}
                        variant="outlined"
                        onClick={categoryChange}>식품외 기타 {category.other}</Button>
            </DivButton>

            <div className={'ShopViewDivContainerContainer'}>
                {rows.length === 0 ? <div style={{textAlign: 'center', margin: '100px'}}><h1>상품 준비 중 입니다</h1></div>
                    : rows.map((data: shopViewType, idx: number) => <ShopViewTableBuilder data={data} idx={idx}
                                                                                          key={idx}
                                                                                          saveGoods={saveGoods}/>)}
            </div>
        </>
    )
}