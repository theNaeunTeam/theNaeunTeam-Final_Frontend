import {carouselType} from "../../../lib/types";
import {Link} from "react-router-dom";
import React from "react";

interface itemType {
    data: carouselType;
    idx: number;
}


export default function Item({data, idx}: itemType) {
    return (
        <div>
            <Link to={data.link} style={{width: '100%'}}>
                <div style={{
                    backgroundImage: `url(${data.src})`,
                }}
                     className={'divBanner'}>
                    <h2>{data.header}</h2>
                    <p>{data.description}</p>
                    {/*<img src={data.src} alt={data.altText} height={'500px'} width={'100%'}/>*/}
                    {/*<Button variant="outlined" onClick={() => history.push(data.link)}>*/}
                    {/*    Check it out!*/}
                    {/*</Button>*/}
                </div>
            </Link>
        </div>
    )
}