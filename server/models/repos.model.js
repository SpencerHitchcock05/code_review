import db from '../db/connection.js';

export const getRepoIdByName = async (name) => {
    try {
        const [rows] = await db.execute(`SELECT id FROM repos WHERE name = ?`, [name]);
        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return -1;
        }
    } catch (err) {
        return -1;
    }

}

export const createRepo = async (name, repoPrivate=false) => {
    try {
        const [data] = await db.execute(`INSERT INTO repos (name, inCache, private) VALUES ("${name}", false, ${repoPrivate})`);
        return data.insertId
    } catch (err) {
        return -1
    }
} 