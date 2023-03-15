import React, {useState} from 'react';
import Layout from '../Component/layout'
import Link from 'next/link'
import Image from 'next/image';
import {getListBrands} from "/lib/database/brand_api";
import {getListCategories} from "/lib/database/category_api";
import {getListProductsByCategoryLimit} from '../lib/database/product_api';

function numberWithDots(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}


export default function Home({brands, categories, listCategoryProducts}) {
    const [activeLink, setActiveLink] = React.useState(1);
    const [extend, setExtend] = useState('');
    const LINK_IMAGE = process.env.NEXT_PUBLIC_LINK_IMAGE_PRODUCT;
    // const myLoader = ({ src }) => {
        
    //     return `${LINK_IMAGE}/${src}`
    // }
    return (
        <Layout categories={categories}>
            <div className='banner'>
                <Image
                    src="/static/home/bannerweb.png"
                    width="1920"
                    height="600"
                    alt=""
                />
            </div>
            <div className='containers'>
                <div className='list-brands mt-3'>
                    <h6 style={{fontFamily: "Playfair Display"}}>Featured Brands</h6>
                    <div className='brands row'>
                        {brands.map(brand => (
                            <Link href={`/brand/${brand.ID}`} key={brand.ID}>
                                <div className='brand col'>
                                    <Image
                                        src={brand.image}
                                        width="120"
                                        height="120"
                                        alt=""
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link href="/brand">
                        <div className='see-all m-auto mt-3'>View all</div>
                    </Link>
                </div>
                <div className='category-segment'>
                    <h6>Category</h6>
                    <div className='list-category row containers'>
                        {categories.map(category => (

                            <div className={'category ' + (activeLink === category.id ? 'active' : '') + ' col-md-2'}
                                 onClick={() => {
                                     setActiveLink(category.id);
                                 }} key={category.id}>{category.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='list-products row containers'>
                    {categories.map(category => (
                        activeLink === category.id ? <>
                            {listCategoryProducts[category.id].map((product, i) => (
                                
                                    // <div className='product' style={{margin: "40px 11px"}} key={product.id}>
                                    //     <Link href={`/productDetail/${product.id}`} key={product.id}>
                                    //     <div className='thumbnail-product'>
                                    //         <Image
                                    //             src={`/static/products-ar/${product.image_preview_name.split(",")[0]}.jpg`}
                                    //             width="240"
                                    //             height="320"
                                    //             alt=""
                                    //         />
                                    //     </div>
                                    //     </Link>
                                    //     <div className='infor-product' id="l">
                                    //         <div className='brand'>{product.brand_name}</div>
                                    //         <span className={'name ' + (extend == product.id ? 'none' : 'len')}>{product.name.split(" ")[0]} {product.name.split(" ")[1]} {product.name.split(" ")[2]}</span>
                                    //             <button className={(extend == product.id ? 'none' : 'len')} type="button" style={{border:"none", borderRadius:"5px"}} data-toggle="collapse" data-target="#demo" onClick={(e) => {setExtend(product.id)}}>...</button>
                                    //             <div className={'name ' + (extend == product.id ? 'len' : 'none')} >{product.name}</div>
                                    //        <Link href={`/productDetail/${product.id}`} key={product.id}>
                                    //         <div style={{display: "flex", cursor:"pointer"}}>
                                    //             <div className='price'>{numberWithDots(product.price)}đ</div>
                                    //             <div className='detail'>See-more</div>
                                    //         </div>
                                    //         </Link>
                                    //     </div>
                                    // </div>
                                    <Link href={`/productDetail/${product.id}`} key={product.id}>
                                    <div className='product' style={{margin: "40px 11px"}} >
                                       
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
                                            {/* <span className={'name ' + (extend == product.id ? 'none' : 'len')}>{product.name.split(" ")[0]} {product.name.split(" ")[1]} {product.name.split(" ")[2]}</span> */}
                                            <span className={'name ' + (extend == product.id ? 'none' : 'len')}>{product.name.slice(0,20)}</span>
                                            <span className={(extend == product.id ? 'none' : 'len')} style={{border:"none", borderRadius:"5px"}} >...</span>
                                            <div id="parent_p" >
                                                <div className='price'>{numberWithDots(product.price)}đ</div>
                                                <div className='detail'>See-more</div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    </Link>
                            ))}
                        </> : null
                    ))}
                    
                </div>
                <Link href="/allProduct"><div className='see-all'>See all</div></Link>
            </div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const brands = await getListBrands();
    const categories = await getListCategories();

    const listCategoryProducts = {}
    await Promise.all(categories.map(async category => {
        listCategoryProducts[category.id] = await getListProductsByCategoryLimit(category.id);
    }))

    return {
        props: {
            brands,
            categories,
            listCategoryProducts
        }
    };

}




