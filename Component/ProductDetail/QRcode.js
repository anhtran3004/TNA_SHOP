import React, { useState, useEffect, useRef } from 'react'
import QRCode from "qrcode.react";
import Waiting from './waiting';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { setSizes } from '../../slices/counterSlices';
import { get_token_ar, ResultImage, ResultStatus } from '../../lib/APIs'
import { setBlob } from '../../slices/blobSlices'

const QRcodes = (props) => {
  const web_token = props.web_token;
  const height = props.height;
  const weight = props.weight;
  const gender = props.gender;
  const setShowSizeFound = props.setShowSizeFound;
  const [showWaiting, setShowWaiting] = useState(false);
  const [size, setSize] = useState('');
  const [showSizeFounds, setShowSizeFounds] = useState(false);
  const setShowSizeForm = props.setShowSizeForm;
  // const showImageError = props.showImageError;
  const [showImageError,setShowImageError] = useState(false);
  const setShowQR = props.setShowQR;
  const setShowMethod = props.setShowMethod;
  const setShowConfirm = props.setShowConfirm;
  const setShowConfirms = props.setShowConfirms;
  const showConfirms = props.showConfirms;
  const setShowInstruction = props.setShowInstruction;
  const setQRnone = props.setQRnone;
  const category = props.category;
  const brand = props.brand;
  const sku = props.sku;
  const subCategory = props.subCategory;
  const [showSeeItMe, setShowSeeItMe] = useState(false);
  const setState = props.setState;
  const state = props.state;
  // const count = useSelector((state) => state.counter.value);
  // const [state, setState] = useState(false);
  const [showSizeNotFound, setShowSizeNotFound] = useState(false);
  const blob = useSelector((state) => state.blob.value);
  const dispatch = useDispatch();
  // console.log(count);
  // const timerIds = useRef(null);
  const timerId = null;
  const RsizeFrRdsv = async (web_token) => {
    let url_body = 'https://api.3drp.tech/get_recommend_size_by_web_token';
    let data = {
      "web_token": web_token
    }
    // console.log("Getting data from redis:", JSON.stringify(data))
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); //application/json'
    // The parameters we are gonna pass to the fetch function
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    }


    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    try {
      // console.log(url);
      let response = await fetch(url_body, fetchData);
      // console.log(response);
      const json = await response.json();
      console.log("Get data to redis server: ", json);
      console.log(json.status);
      if (json.status == 202) {
        setShowWaiting(true);
        setShowSizeFounds(false);
        setShowSizeNotFound(false);
        setShowSeeItMe(false);
      }
      if (json.status == 200) {
        setShowWaiting(false);
        setShowSizeFounds(true);
        const your_size = json.recommend_size;
        console.log("your_size:", your_size)
        setSize(your_size);
        // AR
        const jsons = await get_token_ar(web_token);
        // console.log("ggggggggggg", jsons.status);
        // console.log("ssssssssssss",state);
        if (jsons.status == 200) {
          
          const status = await ResultStatus(jsons.token_ar);
          if (status == 200) {
            setShowImageError(false);
            const blob = await ResultImage(jsons.token_ar);
            dispatch(setBlob(blob));
            // console.log("bbbbbbbbbbbb", blob);
            // for(let i = 1; i < timerId +1; i++){
            //   clearInterval(i);
            // }
            // setState(true);
          }
          if (status == 500) {
            // dispatch(setBlob('/static/productDetail/warning.png'));
            setShowImageError(true);
            // for(let i = 1; i < timerId +1; i++){
            //   clearInterval(i);
            // }
          }
        }
        if(jsons.status == 500){
          // dispatch(setBlob('/static/productDetail/warning.png'));
          setShowImageError(true);
        }
        // end AR
        if (your_size == '') {
          setShowSizeNotFound(true);
          setShowSizeFounds(false);
          // for(let i = 1; i < timerId +1; i++){
          //   clearInterval(i);
          // }
        }
        
      }
      
      // console.log("ssssssssssss",state);
      // if (state) {
      //   for (let i = 1; i < timerId + 1; i++) {
      //     clearInterval(i); // clear all Interval, if re-click the button many times
      //   }
      // }
    }
    catch (error) {
      console.log("Error:", error);
    }

  }
  useEffect(() => {
    // const timerId = timerIds.current;
    
    timerId = setInterval(async () => {
      // console.log("tttttttttttttt",state);
      await RsizeFrRdsv(web_token);
      if (state) {
        for (let i = 1; i < timerId + 1; i++) {
          clearInterval(i);
        }
      }
    }, 1000)
  },[state])
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // console.log("ssssssssssss",state);
  // console.log("bbbbbbbbbbb", BASE_URL);
  // console.log("con ga to lon")
  return (
    <>
      <div style={{ marginLeft: "0px" }}>
        <QRCode
          value={`${BASE_URL}/mobile?sku=${sku}&brand_name=${brand}&category=${category}&subcategory=${subCategory}&web_token=${web_token}&gender=${gender}&height=${height}&weight=${weight}`} style={{ marginRight: "0", height: "140px", width: "140px" }}
        />
      </div>
      {/* <p className='text-center mt-4 cancel_method' onClick={() => { setShowConfirms(true); setShowMethod(false); }}>Cancel
      </p> */}
      {showWaiting ? <>
        <Waiting />
      </> : null
      }
      {showSizeFounds ? <>
        <div className="modal-form-QR">
          <div className="modal-overlay-form-QR"></div>
          <div className="modal-body-form-QR">
            <div className="modal-inner-form">
              <h6>Size Recomendation</h6>
              <div className="bundle_text">
                <p className="see_me" id="see" style={{background:"white", color:"rgb(227, 123, 115)", border:"solid 2px rgb(227, 123, 115)"}} onClick={() => { setShowSeeItMe(true); setShowSizeFounds(false) }}>See it on me</p>
                <p className="my_size" id="mySize" style={{color:"white", background:"rgb(227, 123, 115)"}}>My size</p>
              </div>
              <div className="imgIcon" id="iconImg">
                <Image
                  src="/static/productDetail/Group 63.png"
                  width="160"
                  height="160"
                  alt=""
                />
              </div>
              <h6 style={{ marginTop: "12px" }}>
                Your Recommended size is:
              </h6>
              <p id="sizeComplete" style={{ fontWeight: "800", paddingBottom: "0px" }} >
                {size}
              </p>
              <p className="continue" id="continue"  onClick={() => {
                setState(true);
                setShowSizeFounds(false);
                setShowSizeFound(false);
                setShowWaiting(false);
                setShowMethod(false);
                setShowConfirm(false);
                // setShowQR(false);
                setQRnone(true);
                setShowSizeForm(false);
                // endStream();

              }}>Continue Shopping</p>

            </div>
          </div>
        </div>
      </> : null}
      {showSizeNotFound ? (
        <div className='modal-form-QR'>
          <div className="modal-overlay-form-QR"></div>
          <div className="modal-body-form-QR">
            <div className="modal-inner-form">
              <h6 style={{ paddingTop: "60px" }}>Size Recomendation</h6>
              <h6 className="icon_sad">
                <Image
                  src="/static/productDetail/Group 89.png"
                  width={250}
                  height={250}
                  alt=""
                />
              </h6>
              <h6 style={{ marginTop: "0px", fontWeight: "bold", fontSize: "32px" }}>Sorry!</h6>
              <h6 style={{ paddingTop: "20px", fontSize: "21px", fontWeight: "400" }}>We cannot find your suitable size</h6>
              {/* <div className="infor" onClick={() => setShowSizeNotFound(false)}>Edit info</div> */}
              <p className="continue" style={{ marginTop: "135px" }} onClick={() => {
                setState(true);
                setShowSizeFounds(false);
                setShowSizeFound(false);
                setShowWaiting(false);
                // setShowQR(false);
                setQRnone(true);
                setShowMethod(false);
                setShowSizeForm(false);
                setShowConfirm(false);
                // endStream();
                
              }}>Continue Shopping</p>
            </div>
          </div>
        </div>
      ) : null}
      
      {
        showSeeItMe ? <>
          <div className='modal-form-QR'>
            <div className="modal-overlay-form-QR"></div>
            <div className="modal-body-form-QR">
              <div className="modal-inner-form">
                <h6>Size Recomendation</h6>
                <div className="bundle_text">
                  <p className="see_me" style={{color:"white", background:"rgb(227, 123, 115)"}} >See it on me</p>
                  <p className="my_size" style={{background:"white", color:"rgb(227, 123, 115)", border:"solid 2px rgb(227, 123, 115)"}} onClick={() => {
                    setShowSizeFounds(true);
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
                    <h6 style={{ paddingTop: "5px", fontSize: "21px", marginBottom:"241px" }} >with a straight face!</h6>
                </>:<>
                <div className="imgCheck">
                  <Image
                    src={blob}
                    width="300"
                    height="410"
                    alt="" />
                </div>
                </>}
                
                <p className="continue" style={{marginTop:"127px"}} onClick={() => {
                  setState(true);
                  setShowSizeFounds(false);
                  setShowSeeItMe(false);
                  setShowWaiting(false);
                  // setShowQR(false);
                  setQRnone(true);
                  setShowMethod(false);
                  setShowSizeForm(false);
                  setShowConfirm(false);
                  // endStream();
                  
                }}>Continue Shopping</p>
              </div>
            </div>
          </div>
        </> : null
      }
      {showConfirms ?
        <>
          <div className="modals">
            <div className="modal_overlay_confirm"></div>
            <div className="modal_body_confirm">
              <div className="modal_inner_confirm">
                <div className="warning">
                  <Image
                    src="/static/productDetail/warning.png"
                    width="80"
                    height="80"
                    alt=""
                  />
                </div>
                <div className="text_warning">
                  <p className="text-center text_confirm">Changes you made will not be saved.</p>
                  <p className="text-center text_confirm">Do you want to discard it anyway</p>
                </div>
                <div className="button_confirm">
                  <div className="cancel_confirm" onClick={() => { setShowSizeForm(true); setQRnone(true); setShowConfirms(false); setShowInstruction(false); setState(true); }}>Cancel</div>
                  {/* <Link href="/productDetail"> */}
                  <div className="yes" onClick={() => { dispatch(setSizes('')); setState(true); window.location.reload() }}>Yes Discard it</div>
                  {/* </Link> */}
                </div>


              </div>
            </div>
          </div>
        </> : null
      }
    </>

  )
}

export default QRcodes