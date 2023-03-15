import Layout from "../layout";
import React from 'react'
import Image from "next/image";
import { useSelector} from 'react-redux';

const SizeFound = (props) => {
    const setShowSeeItMe = props.setShowSeeItMe;
    const setShowSizeFound= props.setShowSizeFound;
    const setShowSizeForm=props.setShowSizeForm;
    const count = useSelector((state) => state.counter.value);
    return (

        <>
            <div className="modal-forme">
                        <div className="modal-overlay-forme"></div>
                        <div className="modal-body-forme">
                            <div className="modal-inner-form">
                                <h6>Size Recomendation</h6>
                                <div className="bundle_text">
                                <p className="see_me"  style={{background:"white", color:"rgb(227, 123, 115)", border:"solid 2px rgb(227, 123, 115)"}} onClick={() => {setShowSeeItMe(true); setShowSizeFound(false)}}>See it on me</p>
                                <p className="my_size" style={{color:"white", background:"rgb(227, 123, 115)"}} >My size</p>
                                </div>
                                <div className="imgIcon">
                                    <Image
                                        src="/static/productDetail/Group 63.png"
                                        width="160"
                                        height="160"
                                        alt=""
                                    />
                               
                                </div>
                                <h6 style={{paddingTop:"32px"}}>
                                    Your Recommended size is:
                                </h6>
                                <p style={{ fontWeight: "800", paddingBottom: "0px" }} id='sizeComplete'>
                                    {count}
                                </p>

                                <div
                                    className="infor"

                                    onClick={() => {setShowSizeFound(false); setShowSizeForm(true)}}
                                >
                                    Edit info
                                </div>


                                <p className="continues" onClick={() => {
                                    setShowSizeFound(false);
                                    setShowSizeForm(false);
                                }}>Continue Shopping</p>

                            </div>
                        </div>
                    </div>
        </>

    )
}
export default SizeFound