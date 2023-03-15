import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { setSizes } from "../../slices/counterSlices";
import { useSelector, useDispatch } from 'react-redux';
import { setBlob } from '../../slices/blobSlices';
import {
    UploadFrontImage,
    UploadSideImage,
    create3DBody,
    get3DBodyMeasurements,
    getRecommendedSize,
    save_size_RdSv,
    UploadFaceImage,
    DoArImage,
    CheckImage,
    ResultStatus,
    ResultImage,
    save_token_ar
} from "../../lib/APIs";
import { useRouter } from "next/router";
const SizeFormMobile = (props) => {
    const setShowSizeForm = props.setShowSizeForm;
    const setShowConfirm = props.setShowConfirm;
    const heights = props.heights;
    const handleChangeHeight = props.handleChangeHeight;
    const showError = props.showError;
    const weights = props.weights;
    const handleChangeWeight = props.handleChangeWeight;
    const showErrorWeight = props.showErrorWeight;
    const setGender = props.setGender; // set value
    const gender = props.gender; // router
    const setShowMethod = props.setShowMethod;
    const setShowImageError = props.setShowImageError;
    const imgurl = props.imgurl;
    // const button = props.button;
    // const setButton = props.setButton;
    const showMethod = props.showMethod;
    const height = props.height;
    const img_file = props.img_file;
    const web_token = props.web_token;
    let timerId = null;
    let timerIds = null;
    const setShowWaittingSize = props.setShowWaittingSize;
    const setShowSizeFound = props.setShowSizeFound;
    const setShowSizeNotFound = props.setShowSizeNotFound;
    const setShow404 = props.setShow404;
    const weightImg = props.weightImg;
    const getVideo = props.getVideo;
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();
    const processAPIError = () => {
        setShowSizeFound(false)
        setShowSizeNotFound(true);
    }
    const processRequestError = (e) => {
        // todo: processRequestError
        setShow404(true);
    }
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const query = router.query;
    }, [router.isReady, router.query]);
    const brand = router.query.brand_name;
    const category = router.query.category;
    const subCategory = router.query.subcategory;
    const sku = router.query.sku;
    console.log("bbbbbbbbbbb", brand)
    const toDoIm = async () => {
        try {
            setShowWaittingSize(true);
            const your_gender = document.getElementById('gender').value;
            const your_height = document.getElementById('height').value;
            const your_weight = document.getElementById('weight').value;
            // confirm("Start");
            //  await getInfo_from_iframe();
            // console.log("iiiiiiii", img_file);
            const token = await UploadFrontImage(img_file);
            await UploadSideImage(token, img_file);
            await create3DBody(token, your_gender, your_height, your_weight);

            // eslint-disable-next-line react-hooks/exhaustive-deps
            timerId = setInterval(async () => {
                const json = await get3DBodyMeasurements(token);
                // if (statuse == 200) {
                if (json.code == 200) {
                    setShowWaittingSize(false);
                    setShowSizeFound(true);
                    const _your_measurements = json.data.body_measure;
                    // console.log("json:", json);
                    // console.log("_your_measurements:", _your_measurements);
                    const jsons = await getRecommendedSize(_your_measurements, your_gender, brand, category, subCategory);
                    if (jsons.status == 500) {
                        processAPIError();
                        save_size_RdSv(web_token, '');
                    } else {
                        dispatch(setSizes(jsons.recommend_size))
                        save_size_RdSv(web_token, jsons.recommend_size);
                    }
                    for (let i = 1; i < timerId + 1; i++) {
                        // console.log("timerId",timerId, i)
                        clearInterval(i); // clear all Interval, if re-click the button many times
                    }
                    for (let i = 1; i < timerIds + 1; i++) {
                        clearInterval(i); // clear all Interval, if re-click the button many times
                    }
                } else if (json.code === 40000) {
                    // pending

                } else {
                    setShowWaittingSize(false);
                    processAPIError()
                }


            }, 1000);

        } catch (e) {
            setShowWaittingSize(false);
            processRequestError(e);
        }
    }
    // program to generate random strings

    // declare all characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    
    const toDoAr = async () => {
        try {
            const your_gender = document.getElementById('gender').value;
            const your_height = document.getElementById('height').value;
            const your_weight = document.getElementById('weight').value;
            const token_ar = await UploadFaceImage(img_file);
            const status_check = await CheckImage(img_file);
            await DoArImage(brand, sku, your_weight, your_height, your_gender, token_ar);

            timerIds = setInterval(async () => {
                console.log("ccccccccccc", status_check.status);
                if (status_check.status == 200) {
                    setShowImageError(false);
                    const status = await ResultStatus(token_ar);
                    // const js = await ResultImage(token_ar);
                    console.log("jjjjjjj", status);
                    if (status == 200) {
                        setShowImageError(false);
                        const blob = await ResultImage(token_ar);
                        dispatch(setBlob(blob));
                        console.log("bbbbbbbbbbbb", blob);
                        save_token_ar(web_token, token_ar);
                        // for (let i = 1; i < timerIds + 1; i++) {
                        //     clearInterval(i); 
                        // }

                    }
                    if (status == 500) {
                        dispatch(setBlob(imgurl));
                        // save_token_ar(web_token, '');
                    }
                } if (status_check.status == 500) {
                    setShowImageError(true);
                    save_token_ar(web_token, '');
                    // for (let i = 1; i < timerIds + 1; i++) {
                    //     clearInterval(i); // clear all Interval, if re-click the button many times
                    // }
                }
            }, 1000);
        } catch (e) {
            setShowWaittingSize(false);
            processRequestError(e)
        }
    }
    useEffect(() => {
        setDisabled(false);
    }, [])
    console.log(disabled);

    return (

        <>
            <div className="modal-form">
                <div className="modal-overlay-form"></div>
                <div className="modal-body-form">
                    <div className="modal-inner-form">
                        <h6>Size Recomendation</h6>
                        <form id="form_f">
                            <label>Enter your height (cm)</label>
                            <br></br>

                            <input
                                type="number"
                                className="height"
                                name="height"
                                id="height"
                                // value={height}
                                defaultValue={heights}
                                placeholder="height"
                                onChange={handleChangeHeight}
                            // required
                            />
                            <br></br>
                            {showError ? (
                                <p className="text-danger error_inforr">
                                    Height must be an integer 50 and 200
                                </p>
                            ) : null}
                            <label>Enter your weight (kg)</label>
                            <br></br>

                            <input
                                type="number"
                                className="weight"
                                name="weight"
                                id="weight"
                                defaultValue={weights}
                                // value={weight}
                                onChange={handleChangeWeight}
                                placeholder="weight"
                            // required
                            />
                            <br></br>
                            {showErrorWeight ? (
                                <p className="text-danger error_inforsr">
                                    Weight must be an integer 30 and 150
                                </p>
                            ) : null}

                            <label>Gender</label>
                            <br></br>
                            <select name="gender" id="gender" defaultValue={gender} onChange={(e) => {
                                setGender(e.target.value)
                            }}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <br></br>
                            <label>Your front full-body photo</label>

                        </form>
                        <div className='choosephoto_p'>
                            <div className="choosephoto">
                                {imgurl != '/' ? (
                                    <div className='frame_img'>
                                        <Image
                                            src={imgurl}
                                            height="140"
                                            // width="100"
                                            width={weightImg}
                                            alt=""
                                            className="imgf"
                                            id="imgd"
                                        />
                                    </div>
                                ) : null}
                                {imgurl != '/' ? (
                                    <>
                                        <label
                                            htmlFor="upload_photo"
                                            className="upload_photo"
                                            id="phe"
                                            style={{ fontSize: "17px" }}
                                            onClick={() => setShowMethod(true)}
                                        >
                                            Change Picture
                                        </label>
                                        {showErrorWeight == false ?
                                            <>
                                                {!showError ? (
                                                    <input
                                                        className="submit-s"
                                                        id="submit"
                                                        name="submit"
                                                        type="button"
                                                        value="Virtual Try On"
                                                        disabled={disabled}
                                                        style={{ marginTop: "70px" }}
                                                        onClick={() => { toDoIm(); toDoAr(); setDisabled(true); setShowSizeForm(false) }}
                                                    />
                                                ) : null}
                                            </> : null}
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SizeFormMobile