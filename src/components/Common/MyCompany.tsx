import React, {useEffect, useState} from "react";
import '../../lib/styles/mycompany.scss'

export default function MyCompany() {

    const [idx, setIdx] = useState(0);
    const [image, setImage] = useState('');
    const list = [
        'https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EB%82%B4%EC%9C%84%EC%B9%98.jpeg',
        'https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EB%A9%94%EC%9D%B8.jpeg',
        'https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/shopview.jpeg',
        'https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/cart.jpeg'
    ];

    useEffect(() => {
        init()
    }, [idx]);
    const init = () => {
        setImage(list[idx]);
    }

    const prebtn = () => {
        if (idx != 0) {
            setIdx(idx - 1);
        }
    }
    const next = () => {
        if (idx != list.length - 1) {
            setIdx(idx + 1);
        }
    }
    return (
        <>
            <section className='appstore'>
                <div className='c-container'>
                    <div className='btn-area'>
                        {/*나와 가까운 우리 동네 마감할인*/}
                        <div className='top-img'>
                            <img
                                src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211206_100813676.png'/>
                        </div>
                        <div className='phone'>
                            <img className='phone-img'
                                 src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EB%A9%80%ED%8B%B0%ED%99%94%EB%A9%B4.png'/>
                        </div>
                        <div className='c-left'>
                            {/*탄다 오더 앱으로 이용하기*/}
                            <img className='left-img'
                                 src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EC%95%B1%EC%9C%BC%EB%A1%9C.png'/>
                        </div>
                        {/*구글앱, 애플앱*/}
                        <div className='c-right'>

                            <a className='down-btn'
                               href='https://apps.apple.com/kr/app/%ED%83%84%EB%8B%A4%EC%98%A4%EB%84%88/id1597607300'>
                                <img className='c-badge'
                                     src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EC%95%A0%ED%94%8C%EC%95%B1.png'/></a>
                            <a className='down-btn'
                               href='https://play.google.com/store/apps/details?id=com.thenaeunteam.tandaowner'>
                                <img className='c-badge'
                                     src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EA%B5%AC%EA%B8%80%EC%95%B1.png'/></a>
                        </div>
                    </div>
                </div>
            </section>
            <section className='appstore1'>
                <div className='com'>
                    <div className='com-screen'>
                        <img src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EB%A7%A5.png'/>
                    </div>
                    <div className='com-side'>
                        <h1 style={{fontSize: '50px'}}>탄다오더는?</h1>
                        <p style={{fontSize: '37px'}}> 최근 온실가스 주범으로 주목받고 있는 음식물 폐기량을 줄이기 위해 기획되었어요! <br/>
                            오늘 팔지 못하면 버려질 음식을 마감세일을 통해 구매해보시고 함께 지구를 구해요! <br/>
                            우리 주변의 많은 가게와 소비자를 탄다오더가 연결해드리고 있습니다.
                        </p>
                    </div>
                </div>
            </section>
            <section className='appstore2'>
                <div className='c-container1'>
                    <div>
                        <h1 style={{fontSize: '35px'}}>지구를 지키는 소비</h1>
                        <img
                            src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%ED%83%84%EB%8B%A4-removebg-preview.png'/>
                    </div>
                    <div className='tanda-row'>
                        <div className='row3'>
                            <img
                                src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%ED%95%A0%EC%9D%B8.png'/>
                            <div className='row3-div'>
                                <h3>POINT1</h3>
                                <h4>
                                    합리적인 가격으로<br/> 좋은 음식을 !
                                </h4>
                            </div>
                        </div>
                        <div className='row3'>
                            <img
                                src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EB%B0%9C%EA%B2%AC.png'/>
                            <div className='row3-div'>
                                <h3>POINT2</h3>
                                <h4>
                                    우리동네 숨은 맛집 발견 !
                                </h4>
                            </div>
                        </div>
                        <div className='row3'>
                            <img
                                src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%ED%99%98%EA%B2%BD.png'/>
                            <div className='row3-div'>
                                <h3>POINT3</h3>
                                <h4>
                                    나의 소비가 잉여 음식을<br/>줄여 환경 보호룰 !
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='appstore'>
                <div>
                    <div className='use'>
                        탄다오더 사용 방법
                    </div>
                    <div className='phone-screen'>
                        <div className='left-all'>
                            <img onClick={() => prebtn()}
                                 src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EC%99%BC%ED%99%94%EC%82%B4%ED%91%9C.png'/>
                        </div>
                        <div className='right-all'>
                            <img onClick={next}
                                 src='https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/%EC%98%A4%ED%99%94%EC%82%B4%ED%91%9C.png'/>
                        </div>
                        <div className='device'>
                            <div className='screen-list'>
                                <div className='screen-img'>
                                    <img style={{width: "330px", height: "650px"}} src={image}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}