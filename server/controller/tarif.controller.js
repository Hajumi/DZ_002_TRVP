const db = require('../db');

class TarifController {
    async createTarif(req, res) {
        const { name } = req.body;
        const newTarif = await db.query(`INSERT INTO tarif (name) values ($1) RETURNING *`, [name]);
        res.json(newTarif.rows[0]);
    }

    async getTarifs(req, res) {
        const tarifs = await db.query('SELECT * FROM tarif');
        res.json(tarifs.rows);
    }

    async getOneTarif(req, res) {
        const id = req.params.id;
        const tarif = await db.query('SELECT * FROM tarif WHERE id = $1', [id]);
        res.json(tarif.rows[0]);
    }

    async updateTarif(req, res) {
        const { id, name } = req.body;
        const tarif = await db.query('UPDATE tarif set name = $1 where id = $2 RETURNING *', [name, id]);
        res.json(tarif.rows[0]);
    }

    async deleteTarif(req, res) {
        const id = req.params.id;
        await db.query('DELETE FROM service WHERE tarif_id = $1', [id]);
        const tarif = await db.query('DELETE FROM tarif WHERE id = $1', [id]);
        res.json(tarif.rows[0]);
    }
}

module.exports = new TarifController();
