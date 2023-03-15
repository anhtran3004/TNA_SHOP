const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

export async function getDbObject() {
    try {
        const dataPath = (process.cwd() + "/lib/database/vto.db")
        return await open({
            filename: dataPath,
            driver: sqlite3.Database
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}