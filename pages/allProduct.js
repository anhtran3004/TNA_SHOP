import Layout from "../Component/layout";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from "next/image";
import ReactPaginate from 'react-paginate';
import { getListCategories } from "/lib/database/category_api";
import { getAllProducts } from "../lib/database/product_api";


const Id = ({ products, categories }) => {
    function numberWithDots(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;
    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));
    }, [itemOffset]);
    const LINK_IMAGE = process.env.NEXT_PUBLIC_LINK_IMAGE_PRODUCT;
   
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <Layout categories={categories}>
            <div className="containers">
                <div className="brand-item">

                    <h6>ALL PRODUTS</h6>
                    {/* <div style={{display:"flex"}}> */}
                    {/* style={{display:"flex", justifyContent:"flex-start"}} */}
                    <div className='list-products row' >
                        {/* {currentItems && 
                            currentItems.map(item =>( */}
                        {currentItems && currentItems.map(product => (
                            <Link href={`/productDetail/${product.id}`} key={product.id}>
                                <div className='product' style={{ margin: "48px 14px" }}>
                                    <div className='thumbnail-product'>
                                        <Image
                                            // loader={myLoader}
                                            src={`${LINK_IMAGE}/${product.image_preview_name.split(",")[0]}.jpg`}
                                            width="240"
                                            height="320"
                                            alt=""
                                        />
                                    </div>
                                    <div className='infor-product' id="l">
                                        <div className='brand'>{product.brand_name}</div>
                                        <span className={'name '}>{product.name.slice(0, 20)}</span>
                                        <span style={{ border: "none", borderRadius: "5px" }} >...</span>
                                        <div id="parent_p">
                                            <div className='price'>{numberWithDots(product.price)}đ</div>
                                            <div className='detail'>See-more</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {/* ))} */}



                    </div>
                    {/* <div style={{flexBasis:"0%"}}></div> */}
                    {/* </div> */}
                </div>
                <div className="page">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={<Image src="/static/mobile/next.png" width="48" height="48" alt="" />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel={<Image src="/static/mobile/next.png" width="48" height="48" alt="" />}
                        renderOnZeroPageCount={null}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"

                    />
                </div>
            </div>
        </Layout>
    )
}

export default Id


export async function getStaticProps() {
    const categories = await getListCategories();
    const products = await getAllProducts();
    return {
        props: {
            products,
            categories


        },
    };
}