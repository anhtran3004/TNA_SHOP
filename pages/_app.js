import '../styles/globals.css'
import '../styles/header.css'
import '../styles/home.css'
import '../styles/brandItem.css'
import '../styles/productDetail.css'
import '../styles/sizeform.css'
import '../styles/uploadMethod.css'
import '../styles/formPhotoUploaded.css'
import '../styles/sizeNotFound.css'
import '../styles/QR.css'
import '../styles/waitting.css'
import '../styles/waitingSize.css'
import '../styles/SeeItMe.css'
import '../styles/confirm.css'
import  '../styles/mobile.css'
import '../styles/instruction.css'
// import '../styles/camera.css'
import '../styles/takePicture.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {store} from '../store'
// get our fontawesome imports
import {Provider} from 'react-redux'

function MyApp({Component, pageProps}) {

    return (
        <Provider store={store}>
        <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
