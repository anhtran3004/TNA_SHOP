import Layout from "../layout";
import React from 'react'
import Link from 'next/link'
import Image from "next/image";

const waiting = () => {
    return (
        <>
            <div className='modal-form-QR'>
                <div className="modal-overlay-form-QR"></div>
                <div className="modal-body-form-QR">
                    <div className="modal-inner-form">
                        {/* <Link href="/pages/productDetail">
                            <div className="xx"><i className="fa-solid fa-xmark"></i></div>
                        </Link> */}
                        
                            {/* <i className="fa-solid fa-spinner load"></i> */}
                            <div className="load">
                                <div className="e160">
                                <Image
                                        src="/static/mobile/Ellipse 160.png"
                                        width="200"
                                        height="200"
                                        alt=""
                                    />
                                </div>
                                <div className="phone">
                                <Image
                                    src="/static/productDetail/PHONE.png"
                                    height={110}
                                    width={100}
                                    alt=""

                                />
                                </div>
                            </div>
                        
                        <div className="message">
                            <p style={{margin: "0"}}>Follow instructions on your mobile phone to get</p>
                            <p>your perfect fit</p>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default waiting