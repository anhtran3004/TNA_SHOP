import React from 'react'
import Image from 'next/image';
const sizeNotFound = (props) => {
    const setShowSizeNotFound = props.setShowSizeNotFound;
    const setShowSizeForm = props.setShowSizeForm;
    const setRepending = props.setRepending;
    const repending = props.repending;
    const setShowWaittingSize = props.setShowWaittingSize;
    return (
        <>
            <div className='modal-forme'>
                <div className="modal-overlay-forme"></div>
                <div className="modal-body-forme">
                    <div className="modal-inner-form">
                        <h6>Size Recomendation</h6>
                        <h6 className="icon_sad">
                            {/* <i className="fa-solid fa-face-sad-tear" style={{fontSize:"30px", marginBottom: "30px"}}>
                            </i> */}
                            <Image
                                src="/static/productDetail/Group 89.png"
                                width={187.2}
                                height={186.6}
                                alt=""
                            />
                        </h6>
                        <h6 style={{ marginTop: "0px", fontWeight: "bold", fontSize: "32px" }}>Sorry!</h6>
                        <h6 style={{ paddingTop: "18px", fontSize: "21px" , fontWeight:"400"}}>We cannot find your suitable size</h6>
                        {/* <div className="infor" onClick={() => setShowSizeNotFound(false)}>Edit info</div> */}
                        <p className="continuet" onClick={() => {
                            setShowSizeNotFound(false);
                            setShowSizeForm(true);
                            setShowWaittingSize(false);
                            repending == false ?
                                setRepending(true)
                                : setRepending(false);
                        }}>Edit Infor</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default sizeNotFound