import Layout from '../../../Component/layout';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image";
import ReactPaginate from 'react-paginate';
import { useRouter } from "next/router";
// import { getAllBrandIds} from '/lib/database/brand_api'
import { getBrandById } from '/lib/database/brand_api'
import { getListCategoriesByBrand } from "/lib/database/category_api";
import { getListProductsByBrandAndCategorys } from "/lib/database/product_api";
import { getAllBrandCategoryIds } from "/lib/database/brand_api";
import { getListCategories } from "/lib/database/category_api";
import { useSelector, useDispatch } from 'react-redux';
const Brand = ({ brandData, categories, products, categoriese, categoryId }) => {
    const active = useSelector((state) => state.active.value);
    const [activeLink, setActiveLink] = React.useState(active);
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const query = router.query;
    }, [router.isReady, router.query]);

    function numberWithDots(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;
    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));
    }, [itemOffset, brandData.ID, categoryId]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const LINK_IMAGE = process.env.NEXT_PUBLIC_LINK_IMAGE_PRODUCT;
    // const myLoader = ({ src }) => {
        
    //     return `${LINK_IMAGE}/${src}`
    // }
    return (
        <Layout categories={categories}>
            <div className="containers">
                <div className="brand-item">

                    <h6>{brandData.brand_name}</h6>
                    <div className='category-segment containers'>

                        <div className='list-category row'>
                            <Link href={`/brand/${brandData.ID}`}>
                                <div className={'category ' + (activeLink === 0 ? 'active' : '') + ' col'}
                                    onClick={() => { setActiveLink(0); }} >ALL
                                </div>
                            </Link>
                            {categoriese.map(category => (
                                //  <Link href={`/brand/${brandData.ID}/${category.id}`} key={category.id}>
                                <Link href={`/brand/${brandData.ID}/${category.id}`} key={category.id}>
                                    <div className={'category ' + (activeLink === category.id ? 'active' : '') + ' col'}
                                        onClick={() => { setActiveLink(category.id); }} >{category.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='list-products row'>
                        {currentItems && currentItems.map(product => (
                            <Link href={`/productDetail/${product.id}`} key={product.id}>
                                <div className='product' style={{ margin: "40px 14px" }}>
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
                                        <div className='brand'>{brandData.brand_name}</div>
                                        <span className={'name '}>{product.name.slice(0,20)}</span>
                                        <span style={{ border: "none", borderRadius: "5px" }} >...</span>
                                        <div id="parent_p">
                                            <div className='price'>{numberWithDots(product.price)}đ</div>
                                            <div className='detail'>See-more</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                    <div className="page">
                    <ReactPaginate
                            breakLabel="..."
                            nextLabel={<Image src="/static/mobile/next.png" width="48" height="48" alt=""/>}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel={<Image src="/static/mobile/next.png" width="48" height="48" alt=""/>}
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
            </div>
        </Layout>
    )
}
export async function getStaticPaths() {
    // const paths= await getAllBrandIds();
    const paths = await getAllBrandCategoryIds();
    // console.log("test all path ", paths)
    // console.log("kkkkkkkkkkk",path)
    // const paths = {brands, category}
    // const paths = [
    //     { params: { id: '1', category_id: '1' } },
    //     { params: { id: '2', category_id: '2' } },
    //     { params: { id: '3', category_id: '3' } },
    //     { params: { id: '4', category_id: '4' } },
    //   ]
    console.log("test all path ", paths);
    return {
        paths,
        fallback: false
    };
}


export async function getStaticProps({ params }) {
    // console.log("jjjjjjjj", params.id);
    const brandData = await getBrandById(params.id);
    const categories = await getListCategories();
    const categoriese = await getListCategoriesByBrand(params.id);
    const products = await getListProductsByBrandAndCategorys(params.id, params.category_id);
    const categoryId = params.category_id;
    return {
        props: {
            brandData,
            categoriese,
            products,
            categories,
            categoryId
        },
    };
}


export default Brand