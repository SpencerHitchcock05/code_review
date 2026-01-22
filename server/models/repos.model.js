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
        const [data] = await db.execute(`INSERT INTO repos (name, inCache, private) VALUES (?, false, ?)`, [name, repoPrivate]);
        return data.insertId;
    } catch (err) {
        return -1;
    }
} 

export const deleteRepo = async (id) => {
    try {
        const [data] = await db.execute(`DELETE FROM repos WHERE id = ?`, [id]);
        return true;
    } catch (err) {
        return false;
    }
}

export const setRepoInCache = async (id, inCache) => {
    try {
        const [data] = await db.execute(`UPDATE repos SET inCache = ? WHERE id = ?`, [inCache, id]);
        return true;
    } catch (err) {
        return false;
    }
}