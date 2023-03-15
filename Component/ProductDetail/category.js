import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import {getAllCategoryIds, getCategoryById} from '/lib/database/category_api'
import { getListProductsByCategory } from "/lib/database/product_api";
const category = () => {
  return (
    <>
        <div className="containers">
            <div className="brand-item">
                
                <h6>{categoryData.name}</h6>

                <div className='list-products row'>
                    {products.map(product => (
                        <Link href={`/productDetail/${product.id}`} key={product.id}>
                        <div className='product col'>
                            <div className='thumbnail-product'>
                            <Image
                                src={product.thumbnail}
                                width="240"
                                height="320"
                                alt=""
                                />
                            </div>
                            <div className='infor-product'>
                            <div className='brand'>{product.brand_name}</div>
                                <div className='name'>{product.name}</div>
                                <div style={{display:"flex"}}>
                                <div className='price'>{product.price}.000đ</div>
                                <div className='detail'>See-more</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))}
                
                
                </div>
            </div>
            <div className="page">
                    <span>1</span>
                    <span style={{color:"gray"}}>2</span>
                    <span style={{color:"gray"}}>3 </span>
                    <span style={{color:"gray"}}>...</span>
                    <span style={{color:"gray"}}>5</span>
                    <span className="next">
                        <Image
                        src='/static/mobile/next.png'
                        width="48"
                        height="48"
                        alt=""
                        />
                    </span>
                </div>
            </div>
    </>
  )
}
export async function getStaticPaths() {
    const paths = await getAllCategoryIds();
    console.log("test all path ", paths)
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const categoryData = await getCategoryById(params.id);
    const products = await getListProductsByCategory(params.id);
    return {
        props: {
            categoryData,
            products,
            
        },
    };
}
export default category