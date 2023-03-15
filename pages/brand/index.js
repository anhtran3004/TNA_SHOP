import Layout from "../../Component/layout";
import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { getListCategories } from "../../lib/database/category_api";
import { getListBrands } from "/lib/database/brand_api";
// import { getCategoryIdMinByBrand } from "../../lib/database/category_api";
const brandList = ({brands, categories}) => {
    return (
        <Layout categories={categories}>

            <div className="list-brand-full">
                <div className="containers">
                <h6>Featured Brands</h6>
                <div className="brands row">
                {brands.map(brand =>(
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
                </div>
            </div>
        </Layout>
    )
}
export const getStaticProps = async ({params}) =>{
    const brands = await getListBrands();
    const categories = await getListCategories();
    // const brandIndex = await getCategoryIdMinByBrand(params.id);
    return{
        props : {
            brands,
            categories
            // brandIndex
        }
    };

}
export default brandList