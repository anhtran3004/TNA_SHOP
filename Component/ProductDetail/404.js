import React from 'react'
import Image from 'next/image'
const Page404 = (props) => {
    const setShow404 = props.setShow404
    return (
        <>
            <div className="modal_method">
                <div className="modal_overlay_method" onClick={() => {setShow404(false)}}></div>
                <div className="modal_body_method">
                    <div className="modal_inner_method">
                    <div className="warning" style={{marginLeft:"40px"}}>
                            <Image
                                src="/static/productDetail/warning.png"
                                width="43.75"
                                height="43.75"
                                alt=""
                            />
                        </div>
                        <h6 className='text-center mt-5' style={{fontSize:"72px", fontWeight:"bold", color: "green"}}>404</h6>
                        <h6 className='text-center mt-5' style={{fontSize:"36px", fontWeight:"bold"}}>That's an error </h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page404