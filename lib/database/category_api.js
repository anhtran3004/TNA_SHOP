import {getDbObject} from "./core";

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
        const query = 'SELECT * from categories'
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


export async function getListCategories() {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from categories;'
        // console.log(row);
        return await db.all(query);
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getListCategoriesByBrand(brand_id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT categories.name, categories.id from categories join products on categories.id = products.category_id where brand_id = ? group by categories.name, categories.id order by categories.id;'
        const row = await db.all(query, [brand_id]);
        // console.log(row);
        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getCategoryIdMinByBrand(brand_id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT categories.name, categories.id from categories join products on categories.id = products.category_id where brand_id = ? group by categories.name, categories.id order by categories.id LIMIT 1;'
        const row = await db.all(query, [brand_id]);
        // console.log(row);
        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}