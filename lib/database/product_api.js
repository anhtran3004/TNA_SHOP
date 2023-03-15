import {getDbObject} from "./core";


export async function getListProductsByBrand(brand_id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from products where is_active = 1 AND brand_id = ?;'
        const row = await db.all(query, [brand_id]);
        // console.log(row);
        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getListProductsByBrandAndCategory(brand_id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * FROM products WHERE is_active = 1 AND brand_id= ?;'
        const row = await db.all(query, [brand_id]);
        // console.log('rrrrrrrrr',row);
        // console.log("qqqqqqqq", brand_id)
        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getListProductsByBrandAndCategorys(brand_id, category_id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * FROM products WHERE is_active = 1 AND brand_id=? AND category_id=?'
        const row = await db.all(query, [brand_id, category_id]);
        // console.log('rrrrrrrrr',row);
        // console.log("qqqqqqqq", query)
        // console.log("qqqqqqqq",brand_id)
        // console.log("ccccccccc", category_id)
        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getListProductsByCategory(category_id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * FROM products join brands on products.brand_id = brands.id WHERE products.is_active = 1 AND category_id=?;'
        const row = await db.all(query, [category_id]);
        // console.log('rrrrrrrrr',row);

        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getListProductsByCategoryLimit(category_id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * FROM products join brands on products.brand_id = brands.id WHERE products.is_active = 1 AND category_id=? limit 4;'
        const row = await db.all(query, [category_id]);
        // console.log('rrrrrrrrr',row);

        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCategoryById(id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from categories where id = ?;'
        return await db.get(query, [id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getAllCategoryIds() {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from categories;'
        const row = await db.all(query);

        return row.map((category) => {
            return {
                params: {
                    id: category.id.toString(),
                    // brand_id: category.brand_id.toString()
                },
                // params: {
                // brand_id: category.brand_id.toString(),
                // }
            };
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getProductById(id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from products join brands on products.brand_id = brands.id  where products.is_active = 1 AND products.id = ?;'
        return await db.get(query, [id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getCategorytByproductId(id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT categories.name from products join categories on categories.id = products.category_id where products.is_active = 1 AND products.id = ?;'
        return await db.get(query, [id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllProductIds() {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from products where is_active = 1;'
        const row = await db.all(query);

        return row.map((product) => {
            return {
                params: {
                    id: product.id.toString(),
                },

            };
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getProductImageByProductId(id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from product_images where is_active = 1 AND product_id=?;'
        return await db.all(query, [id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getProductImageIdMinByProduct(product_id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from product_images where product_id = ? order by id LIMIT 1;'
        const row = await db.get(query, [product_id]);
        // console.log('oooooooooooo',row);
        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// export async function getProductImageNameById(id) {
//     try {
//         const db = await getDbObject();
//         const query = 'SELECT * from products where id=?;'
//         return await db.all(query, [id]);
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }
export async function getAllProducts() {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from products join brands on brands.id = products.brand_id where products.is_active = 1;'
        const row = await db.all(query);
        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
