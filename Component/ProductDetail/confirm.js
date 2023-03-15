import Layout from '../layout'
import Link from "next/link";
import Image from "next/image";


const Confirm = (props) => {
    const setShowSizeForm = props.setShowSizeForm;
    const setShowConfirm =props.setShowConfirm;
    const setSizes = props.setSizes;
    const dispatch = props.dispatch;
    const setShowInstruction = props.setShowInstruction;
    return (
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
                            <div className="cancel_confirm" onClick={() => { setShowSizeForm(true); setShowConfirm(false);setShowInstruction(false) }}>Cancel</div>
                            {/* <Link href="/productDetail"> */}
                                <div className="yes" onClick={() => {dispatch(setSizes('')); window.location.reload()}}>Yes Discard it</div>
                                {/* </Link> */}
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
export default Confirm