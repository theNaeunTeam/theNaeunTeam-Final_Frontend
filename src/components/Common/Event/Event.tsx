import React from 'react';
import good1 from '../../../lib/images/1.jpg';
import good2 from '../../../lib/images/2.jpg';
import good3 from '../../../lib/images/3.jpg';
import good4 from '../../../lib/images/4.jpg';
import good5 from '../../../lib/images/5.jpg';
import '../../../lib/styles/event.scss';
import good0 from '../../../lib/images/굿즈 출시.png';

export default function Event() {
    return (
        <>
            <div className='goods0'>
                <img src={good0}/><br/>
            </div>
            <div className='event'>
                <img src={good1}/><br/>
                <img src={good2}/><br/>
                <img src={good3}/><br/>
                <img src={good4}/><br/>
                <img src={good5}/><br/>
            </div>
        </>
    );
}

