const db = require('../db');

class ServiceController {
    async createService(req, res) {
        const { type, param, tarif_id } = req.body;
        const newService = await db.query(
            `INSERT INTO service (type, param, tarif_id) values ($1, $2, $3) RETURNING *`,
            [type, param, tarif_id]
        );
        res.json(newService.rows[0]);
    }

    async getServices(_, res) {
        const services = await db.query('SELECT * FROM service');
        res.json(services.rows);
    }

    async getOneService(req, res) {
        const id = req.params.id;
        const service = await db.query('SELECT * FROM service WHERE id = $1', [id]);
        res.json(service.rows[0]);
    }

    async updateService(req, res) {
        const { id, type, param, tarif_id } = req.body;
        const service = await db.query(
            'UPDATE service SET type = $1, param = $2, tarif_id = $3 where id = $4 RETURNING *',
            [type, param, tarif_id, id]
        );
        res.json(service.rows[0]);
    }

    async deleteService(req, res) {
        const id = req.params.id;
        const service = await db.query('DELETE FROM service WHERE id = $1', [id]);
        res.json(service.rows[0]);
    }

    async getTarifServices(req, res) {
        const tarif_id = req.params.tarif_id;
        const service = await db.query('SELECT * FROM service WHERE tarif_id = $1', [tarif_id]);
        res.json(service.rows);
    }
}

module.exports = new ServiceController();
