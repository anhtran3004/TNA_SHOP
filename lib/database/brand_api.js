import {getDbObject} from "./core";

export async function getListBrands() {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from brands;'
        const row = await db.all(query);
        // console.log(row);
        return row;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getBrandById(id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from brands where id = ?;'
        return await db.get(query, [id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getBrandsById(id) {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from brands where id = ?;'
        return await db.all(query, [id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllBrandIds() {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from brands '
        const row = await db.all(query);

        return row.map((brand) => {
            return {
                params: {
                    id: brand.ID.toString(),

                },
            };
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllBrandCategoryIds() {
    try {
        const db = await getDbObject();
        const query = 'SELECT * from brands join products on products.brand_id = brands.ID join categories on categories.id = products.category_id;'
        const row = await db.all(query);

        return row.map((brand) => {
            return {
                params: {
                    id: brand.ID.toString(),
                    category_id: brand.category_id.toString()
                },
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}