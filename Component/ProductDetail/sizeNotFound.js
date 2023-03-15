import Layout from "../layout";
import React from 'react'
import Link from 'next/link'
import Image from "next/image";

const sizeNotFound = (props) => {
    const setShowSizeForm = props.setShowSizeForm
    const setShowSizeNotFound = props.setShowSizeNotFound
    const setShowWaittingSize = props.setShowWaittingSize
    return (
        <>
        <div className='modal-forme'>
            <div className="modal-overlay-forme"></div>
            <div className="modal-body-forme">
                <div className="modal-inner-form">
                    <h6>Size Recomendation</h6>
                    <h6 className="icon_sad">
                        <Image
                            src="/static/productDetail/Group 89.png"
                            width={250}
                            height={250}
                            alt=""
                        />
                    </h6>
                    <h6 style={{ marginTop: "0px", fontWeight: "bold", fontSize: "32px" }} id="sorry">Sorry!</h6>
                    <h6 style={{ paddingTop: "18px", fontSize: "21px", fontWeight:"400" }} >We cannot find your suitable size</h6>
                    <div className="inforse" onClick={() => {setShowSizeNotFound(false); setShowSizeForm(true)}}>Edit info</div>
                    <p className="continuese" onClick={() => {
                        setShowSizeNotFound(false);
                        setShowSizeForm(false);
                        setShowWaittingSize(false)
                    }}>Continue Shopping</p>
                </div>
            </div>
        </div>
    </>
    )
}

export default sizeNotFound