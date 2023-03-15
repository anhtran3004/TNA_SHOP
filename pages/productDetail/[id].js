import Layout from "../../Component/layout";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QRcodes from "../../Component/ProductDetail/QRcode";
import SizeForm from "../../Component/ProductDetail/sizeform";
import WaitingSize from "../../Component/ProductDetail/waitingSize";
import { useSelector, useDispatch } from 'react-redux';
import { setSizes } from "../../slices/counterSlices";
import SizeFound from "../../Component/ProductDetail/sizeFound"
import SizeNotFound from "../../Component/ProductDetail/sizeNotFound"
import SeeItMee from "../../Component/ProductDetail/seeItMe"
// import { ImageError } from "../../Component/ProductDetail/imageError";
import Confirm from "../../Component/ProductDetail/confirm"
import Instruction from "../../Component/ProductDetail/instruction";
import Page404 from "../../Component/ProductDetail/404";
import { getAllProductIds, getProductById } from "/lib/database/product_api";
import { getListCategories } from "/lib/database/category_api";
// import { getProductImageIdMinByProduct } from "../../lib/database/product_api";
import { getCategorytByproductId } from "../../lib/database/product_api";
import {
    getRecommendedSize,
} from "../../lib/APIs";
const ProductDetail = ({ productData, categoriese, categories, categoryName }) => {
    const LINK_IMAGE = process.env.NEXT_PUBLIC_LINK_IMAGE_PRODUCT;
    const [click, clickthumbnail] = useState(false);
    const [showSizeForm, setShowSizeForm] = useState(false);
    const [showMethod, setShowMethod] = useState(false);
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [showError, setShowError] = useState(false);
    const [showErrorWeight, setShowErrorWeight] = useState(false);
    const [disable, setDisable] = useState(true);
    const [showImg, setShowImg] = useState(null);
    const [image, setImage] = useState(null);
    const [showWaittingSize, setShowWaittingSize] = useState(false);
    const [showSizeFound, setShowSizeFound] = useState(false);
    const [showSizeNotFound, setShowSizeNotFound] = useState(false);
    const [showSeeItMe, setShowSeeItMe] = useState(false);
    const [showImageError, setShowImageError] = useState(false);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [showInstruction, setShowInstruction] = useState(false);
    const [showImgThumbnail, setShowImgThumbnail] = useState(`${LINK_IMAGE}/${productData.image_preview_name.split(",")[0]}.jpg`);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirms, setShowConfirms] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [show404, setShow404] = useState(false);
    const [QRnone, setQRnone] = useState(false);
    const [showWaitingSeeItMe, setShowWatingSeeItMe] = useState(false);
    const brand = productData.brand_name;
    const sku = productData.sku;
    const subCategory = categoryName.name.toUpperCase();
    // const [widthImg, setWidthImg] = useState('140');
    const [heightImg, setHeightImg] = useState('140');
    const ima = productData.image_preview_name.split(",");
    const list_size = productData.list_size.split(",");
    const list_color = productData.image_color_name.split(",");
    const [showImgDetail, setShowImgDetail] = useState(ima[0]);
    const [state, setState] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const count = useSelector((state) => state.counter.value);
    let timerId = null;
    let timerIds = null;
    const img_files = showImg;

    useEffect(() => {
        // componentDidMount() {
        window.localStorage.setItem('brand', brand);
        window.localStorage.setItem('category', category);
        window.localStorage.setItem('subCategory', subCategory);

        const gender = window.localStorage.getItem('gender');
        setHeight(window.localStorage.getItem('height'));
        setWeight(window.localStorage.getItem('weight'));
        if (window.localStorage.getItem('height') != "" && window.localStorage.getItem('weight')) {
            setDisable(false);
        }
        if (window.localStorage.getItem('_your_measurements') != undefined) {
            const measurement = window.localStorage.getItem('_your_measurements');
            const measurements = JSON.parse(measurement);
            timerIds = setInterval(async () => {
                const jsons = await getRecommendedSize(measurements, gender, brand, category, subCategory);
                if (jsons.status === 500) {
                    dispatch(setSizes(''))
                    for (let i = 1; i < timerIds + 1; i++) {
                        clearInterval(i); // clear all Interval, if re-click the button many times
                    }
                } else {
                    dispatch(setSizes(jsons.recommend_size))
                    for (let i = 1; i < timerIds + 1; i++) {
                        clearInterval(i); // clear all Interval, if re-click the button many times
                    }
                }
            }, 1000);
        }
        // }
    }, [])

    //  setImagea(showImg);
    function numberWithDots(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }
    const handleChange = async (event) => {
        console.log("=============");
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            // setCreateObjectURL(URL.createObjectURL(i));
            // setShowMethod(false);
            // setShowSizeForm(true);
            // setShowInstruction(false);
            // console.log("weeeeeeeeeeeeeee",i);
           if(i.size < 1000000){
            setCreateObjectURL(URL.createObjectURL(i));
            setShowMethod(false);
            setShowSizeForm(true);
            setShowInstruction(false);
            console.log("weeeeeeeeeeeeeee",i);
            }
            else{
                setError(true);
                console.log("weeeeeeeeeeeeeee",i);
            }
            let img = window.document.createElement("img");
            img.onload = function () {
                // alert(img.width + " "+ img.height)
                setHeightImg((img.width * 134) / img.height);
                
            };
            img.src = createObjectURL;
            //const img =  "/"+ event.target.files[0].name;
            setShowImg(i);
            console.log("ffffffffffff", heightImg)
        }
    };

    const handleChangeHeight = async (event) => {

        setHeight(event.target.value);
        window.localStorage.setItem('height', event.target.value);
        if (event.target.value < 50 || event.target.value > 200) {
            setShowError(true);
            setDisable(true);
        } else {
            setShowError(false);
            //setDisable(false);
            if (weight != "") {
                setDisable(false);
            }
        }


        if (height == "") {
            setDisable(true);
        }
    };
    const handleChangeWeight = async (event) => {

        setWeight(event.target.value);
        window.localStorage.setItem('weight', event.target.value);
        if (event.target.value < 30 || event.target.value > 150) {
            setShowErrorWeight(true);
            setDisable(true);
        } else {
            setShowErrorWeight(false);
            if (height != "") {
                setDisable(false);
            }
        }
        if (weight == "") {
            setDisable(true);
        }
    };
    const rand = () => {
        return Math.random().toString(36).substr(2);
    }
    const token = () => {
        return rand() + rand();
    }
    const convertTypeClothes = () => {
        if (productData.cloth_type == 'upper') {
            return 'TOP'
        }
        if (productData.cloth_type == 'full_body') {
            return 'FULLBODY'
        }
    }
    const category = convertTypeClothes();
    
    
    
    return (
        <Layout categories={categories}>
            <div className="category_brands containers">
                <ul className="nav">
                    {/* <Link href="/brand">
                        <li >
                            <div className='logo'>
                                <Image
                                    src="/static/productDetail/owens.png"
                                    width="120"
                                    height="25"
                                    alt=""
                                />
                            </div>
                        </li>
                    </Link> */}

                    {categoriese.map(category => (
                        <Link href={`/category/${category.id}`} key={category.id}>
                            <li>{category.name}</li>
                        </Link>
                    ))}

                </ul>
            </div>
            <div className="line"></div>
            <div className="containers">

                <div className="product-detail">

                    <div className="thumbnail-img">
                        <div
                            className="thumbnail-product"
                            onClick={() => clickthumbnail(true)}
                        >
                            <Image
                                // loader={myLoader}
                                src={showImgThumbnail}
                                width="510"
                                height="680"
                                alt=""
                            />
                        </div>
                        <div className="images_product">
                            {ima.map(imas => (
                                <div className={'image_component ' + (showImgDetail == imas ? 'activeImg' : '')} onClick={() => { setShowImgDetail(imas); setShowImgThumbnail(`${LINK_IMAGE}/${imas}.jpg`) }} key={imas} >
                                    <Image
                                        // loader={myLoader}
                                        src={`${LINK_IMAGE}/${imas}.jpg`}
                                        width="135"
                                        height="180"
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="infor-products">
                        <div className="brand">
                            Brand:{" "}
                            <Link href={`/brand/${productData.brand_id}`}>
                                <span className="brand-name">{productData.brand_name}</span>
                            </Link>
                        </div>
                        <div className="name">{productData.name}</div>
                        <div className="price">{numberWithDots(productData.price)}đ</div>
                        <p className="ms">Màu sắc:</p>
                        <div style={{display:"flex"}}>
                        {list_color.map(size => (
                            <div key={size} >
                                <Image
                                src={`/static/productDetail/${size}.png`}
                                width="48"
                                height="48"
                                alt=""
                                
                            />
                            </div>
                            ))}
                        </div>
                        <p className="ms">Size:</p>
                        <div className="displaySize">
                            {/* <div className="subSize">S</div>
                            <div className="subSize">M</div>
                            <div className="subSize">L</div>
                            <div className="subSize">XL</div> */}
                            {list_size.map(size => (
                                (size.length > 2) ? (
                                    <div className="subSizeExtra" key={size}>{size}</div>
                                ) : (<div className="subSize" key={size}>{size}</div>)

                            ))}
                        </div>
                        {(count != 0) ? <>
                            <div className="coi">
                                <Image
                                    src="/static/productDetail/coi.png"
                                    width="32"
                                    height="32"
                                    alt=""
                                />
                            </div>
                            <div className="size" id="size">Your recomended size:  </div>
                            <span className='size_recommend' style={{ fontWeight: "600", fontSize: "32px" }}>{count}</span>
                            <div className="getSizeE" onClick={() => { setShowSizeForm(true); setShowMethod(false); window.scrollTo(0, 0); setShowQR(false); setState(false) }}>
                                <div className='iconfs'>
                                    <Image
                                        src="/static/productDetail/edit.png"
                                        width="24"
                                        height="24"
                                        alt=""
                                    />
                                </div>
                                <p>
                                    Edit Infor
                                </p>
                            </div>
                        </> : <>
                            <div className="getSize" onClick={() => { setShowSizeForm(true); window.scrollTo(0, 0); setShowQR(false); setState(false) }}>
                                <div className='iconf'>
                                    <Image
                                        src="/static/productDetail/iconf.png"
                                        width="24"
                                        height="24"
                                        alt=""
                                    />
                                </div>
                                <p>
                                    Virtual Try On
                                </p>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            {click ? (
                <>
                    <div className="modal_pro">
                        <div className="modal_overlay_pro" onClick={() => clickthumbnail(false)}></div>
                        <div className="modal_body_pro">
                            {/* <div className="modal_inner_pro"> */}
                            <div className="extend_thumb">
                                <Image src={showImgThumbnail} width="600" height="800" alt="" className="thumb" />
                            </div>
                            {/* <div className="back"  onClick={() => clickthumbnail(false)}>
                                    <i className="fa-solid fa-x"></i>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </>
            ) : null}
            {showSizeForm ? (
                <SizeForm
                    heightImg={heightImg}
                    timerId={timerId}
                    img_files={img_files}
                    setShowWaittingSize={setShowWaittingSize}
                    setShowSizeForm={setShowSizeForm}
                    showSizeFound={showSizeFound}
                    showSizeNotFound={showSizeNotFound}
                    setShowConfirm={setShowConfirm}
                    height={height}
                    handleChangeHeight={handleChangeHeight}
                    showError={showError}
                    weight={weight}
                    handleChangeWeight={handleChangeWeight}
                    showErrorWeight={showErrorWeight}
                    setGender={setGender}
                    gender={gender}
                    disable={disable}
                    setShowMethod={setShowMethod}
                    createObjectURL={createObjectURL}
                    showMethod={showMethod}
                    // handleChange={handleChange}
                    setShowQR={setShowQR}
                    setShowSizeFound={setShowSizeFound}
                    setShowSizeNotFound={setShowSizeNotFound}
                    setShow404={setShow404}
                    setQRnone={setQRnone}
                    category={category}
                    brand={brand}
                    subCategory={subCategory}
                    sku={sku}
                    setShowWatingSeeItMe={setShowWatingSeeItMe}
                    setShowImageError = {setShowImageError}
                    // photoRef={photoRef}
                // web_token={web_token}
                />
            ) : null}
            {/* Show method */}
            {showMethod ? (
                <div className="modal_method">
                    <div className="modal_overlay_method"></div>
                    <div className="modal_body_method">
                        <div className="modal_inner_method">
                            <h5 className="upload_method">Upload your photo</h5>
                            {/* <form id="form" action="/Component/ProductDetail/formPhotoUploaded"> */}
                            <p className="text-center device_method" onClick={() => { setShowMethod(false); setShowInstruction(true) }}>
                                <label htmlFor="up_img">
                                    Select form this device
                                </label>
                                {/* <input
                                        type="file"

                                        onChange={handleChange}
                                        // value={showImg}
                                        id="up_img"
                                        name="img"

                                    /> */}
                            </p>
                            {/* </form> */}
                            <p className="text-center" style={{ fontSize: "18px" }}>or</p>

                            <p className="text-center mt-3 qr_method" onClick={() => setShowQR(true)}>
                                Select from phone by QR
                            </p>


                            <p
                                className="text-center mt-5 cancel_method"
                                onClick={() => { setShowMethod(false); setShowConfirm(true); }}
                            >
                                Cancel
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
            {showInstruction ? (
                <Instruction
                    setShowConfirm={setShowConfirm}
                    handleChange={handleChange}
                    setShowInstruction={setShowInstruction}
                    
                />
            ) : null}
            {/* show waitting size */}
            {showWaittingSize ? (
                <WaitingSize
                />
            ) : null
            }
            {/* Show size found */}
            {showSizeFound ? (
                <>
                    <SizeFound
                        setShowSeeItMe={setShowSeeItMe}
                        setShowSizeFound={setShowSizeFound}
                        setShowSizeForm={setShowSizeForm}
                        dispatch={dispatch}
                    />
                </>
            ) : null}
            {/* Show size not found  */}
            {showSizeNotFound ? (
                <SizeNotFound
                    setShowSizeNotFound={setShowSizeNotFound}
                    setShowSizeForm={setShowSizeForm}
                    setShowWaittingSize={setShowWaittingSize}
                />
            ) : null}
            {/* Show see it me */}
            {showSeeItMe ? (
                <SeeItMee
                    setShowSizeFound={setShowSizeFound}
                    setShowSeeItMe={setShowSeeItMe}
                    createObjectURL={createObjectURL}
                    setShowSizeForm={setShowSizeForm}
                    showWaitingSeeItMe={showWaitingSeeItMe}
                    showImageError={showImageError}
                />
            ) : null}
            {/* show image error */}
            {/* {showImageError ? <>
                <ImageError
                    setShowImageError={setShowImageError}
                    setShowSizeFound={setShowSizeFound}
                    setShowWaittingSize={setShowWaittingSize}
                />
            </>: null} */}
            {showConfirm ? (
                <Confirm
                    setShowSizeForm={setShowSizeForm}
                    setShowConfirm={setShowConfirm}
                    setSizes={setSizes}
                    dispatch={dispatch}
                    setShowInstruction={setShowInstruction}
                />
            ) : null}
            {showQR ? (
                <div className={"modal_method " + (QRnone ? "none" : "")}>
                    <div className='modal_overlay_method'></div>
                    <div className='modal_body_method'>
                        <div className='modal_inner_method'>
                            <h6 className="text-center mt-5 ins" >Introduction Link</h6>
                            <div className="qr_code mt-4">
                                <QRcodes
                                    web_token={token()}
                                    height={height}
                                    gender={gender}
                                    weight={weight}
                                    showSizeFound={showSizeFound}
                                    setShowSizeFound={setShowSizeFound}
                                    setShowSizeForm={setShowSizeForm}
                                    showSizeForm={showSizeForm}
                                    setShowQR={setShowQR}
                                    setShowMethod={setShowMethod}
                                    setShowConfirm={setShowConfirm}
                                    setShowConfirms={setShowConfirms}
                                    showConfirms={showConfirms}
                                    setShowInstruction={setShowInstruction}
                                    setQRnone={setQRnone}
                                    category={category}
                                    brand={brand}
                                    subCategory={subCategory}
                                    sku={sku}
                                    setState={setState}
                                    state={state}
                                />

                            </div>
                            {/* <Link href={`/mobile?sku=${sku}&brand_name=${brand}&category=${category}&subcategory=${subCategory}&web_token=${token()}&gender=${gender}&height=${height}&weight=${weight}`}>
                                <p className="link_qr mt-2">Link</p>
                            </Link> */}
                            <p className='text-center cancel_method' onClick={() => { setShowConfirms(true); setShowMethod(false) }}>Cancel
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
            {show404 ?
                (
                    <Page404 setShow404={setShow404} />
                )
                : null}
            {error ? (
                <div className="modal_method">
                <div className="modal_overlay_method" onClick={() => {setError(false)}}></div>
                <div className="modal_body_method">
                    <div className="modal_inner_method">
                    <div className="warning" style={{marginLeft:"20px"}}>
                            <Image
                                src="/static/productDetail/warning.png"
                                width="43.75"
                                height="43.75"
                                alt=""
                            />
                        </div>
                        {/* <h6 className='text-center mt-5' style={{fontSize:"72px", fontWeight:"bold", color: "green"}}>404</h6> */}
                        <h6 className='text-center mt-5' style={{fontSize:"36px", fontWeight:"bold"}}>The picture is too big in size (less than 1MB) ! </h6>
                    </div>
                </div>
            </div>
            ) : null}
        </Layout>
    );
};
export async function getStaticPaths() {
    const paths = await getAllProductIds();
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const productData = await getProductById(params.id);
    const categoryName = await getCategorytByproductId(params.id);
    const categoriese = await getListCategories();
    const categories = await getListCategories();
    // const products = await getProductImageByProductId(params.id);
    // const productImage = await getProductImageIdMinByProduct(params.id);
    // const products = await getProductImageNameById(params.id);
    // console.log("hhhhhhhh", productData)
    // console.log("pppppppp", productImage)

    return {
        props: {
            productData,
            categoriese,
            categoryName,
            categories,
            // productImage
        },
    };
}
export default ProductDetail;
