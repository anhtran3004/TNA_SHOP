import Layout from "../layout";
import React from 'react'
import Image from 'next/image'
import { useSelector} from 'react-redux';

const SeeItMe = (props) => {
    const setShowSizeForm = props.setShowSizeForm;
    const createObjectURL = props.createObjectURL;
    const setShowSeeItMe = props.setShowSeeItMe;
    const setShowSizeFound = props.setShowSizeFound;
    const showWaitingSeeItMe = props.showWaitingSeeItMe;
    const showImageError = props.showImageError;
    const blob = useSelector((state) => state.blob.value);
    return (
        <>
            <div className='modal-forme'>
                    <div className="modal-overlay-forme"></div>
                    <div className="modal-body-forme">
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
                                <h6 style={{ paddingTop: "5px", fontSize: "21px", marginBottom:"114px" }} >with a straight face!</h6>
                            </>: <>
                            <div className="imgCheck">
                                {showWaitingSeeItMe ? (
                                    <div style={{margin:"190px 0"}}>waitting....</div>
                                ) : <>
                                    <Image
                                    src={blob}
                                    width="300"
                                    height="410"
                                    alt="" />
                                </>}
                                
                            </div>
                            </>}
                            
                            <div className="infors" onClick={() => {
                                setShowSeeItMe(false);
                                setShowSizeFound(false);
                            }}>Edit info
                            </div>
                            <p className="continue" onClick={() => {
                                setShowSeeItMe(false);
                                setShowSizeFound(false);
                                setShowSizeForm(false);
                            }}>Continue Shopping</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default SeeItMe