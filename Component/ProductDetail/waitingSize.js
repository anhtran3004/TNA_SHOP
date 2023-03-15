import React from 'react'
import Layout from '../layout'
import Image from 'next/image'

const waitingSize = () => {
    return (
        <>
            <div className='modal-forme'>
                    <div className="modal-overlay-forme"></div>
                    <div className="modal-body-forme">
                        <div className="modal-inner-form">
                            {/*<div className="xe"><i className="fa-solid fa-xmark "></i></div>*/}
                            <div className='loading'>
                                <div className='e160s'>
                                    <Image
                                        src="/static/mobile/Ellipse 160.png"
                                        width="200"
                                        height="200"
                                        alt=""
                                    />
                                </div>
                                <div className='ques'>
                                    <Image
                                        src="/static/productDetail/akar-icons_chat-question.png"
                                        width="24"
                                        height="24"
                                        alt=""
                                    />
                                </div>
                                <div className='ao'>
                                    <Image
                                        src="/static/productDetail/icon-park_clothes-crew-neck.png"
                                        width="70"
                                        height="67"
                                        alt=""
                                    />
                                </div>
                                <div className='quan'>
                                    <Image
                                        src="/static/productDetail/Group.png"
                                        width="55"
                                        height="64"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className='message_waiting'>
                                <Image
                                    src="/static/productDetail/tr.png"
                                    width="299"
                                    height="36"
                                    alt=""
                                />

                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default waitingSize