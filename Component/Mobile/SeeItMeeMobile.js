import React from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux';

const SeeItMeeMobile = (props) => {
    const setShowSizeForm = props.setShowSizeForm;
    const setShowSeeItMe = props.setShowSeeItMe
    const imgurl = props.imgurl;
    const setRepending = props.setRepending;
    const repending = props.repending;
    const showImageError = props.showImageError;
    const setShowSizeFound = props.setShowSizeFound;
    const blob = useSelector((state) => state.blob.value);
    return (
        <>
            <div className='modal-form'>
                <div className="modal-overlay-form"></div>
                <div className="modal-body-form">
                    <div className="modal-inner-form">
                        <h6>Size Recomendation</h6>
                        <div className="bundle_text">
                            <p className="see_me" >See it on me</p>
                            <p className="my_size"  onClick={() => {
                                setShowSizeFound(true);
                                setShowSeeItMe(false);
                            }}>My size</p>
                        </div>
                        {showImageError ? <>
                            <h6 className="icon_sad" style={{marginTop:"0"}}>
                                <Image
                                    src="/static/productDetail/imgError.png"
                                    width={240}
                                    height={135}
                                    alt=""
                                />
                                </h6>
                                <h6 style={{ marginTop: "0px" , fontSize: "21px" }} id="sorry">Sorry, please apicture again</h6>
                                <h6 style={{ paddingTop: "5px", fontSize: "21px", marginBottom:"200px" }} >with a straight face!</h6>
                        </>: <>
                        <div className="imgCheck">
                            <Image
                                src={blob}
                                width="300"
                                height="410"
                                alt="" />
                        </div>
                        </>}
                        
                        <p className="continue" onClick={() => {
                            setShowSizeFound(false);
                            setShowSeeItMe(false);
                            setShowSizeForm(true);
                            // setShowSizeForm(false);
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

export default SeeItMeeMobile