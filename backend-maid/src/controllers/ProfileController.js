const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.body;

        const housekeeper = await connection('housekeepers').where('id',id).select('*').first();

        return response.json({ housekeeper })
    },
    async update(request, response) {
        const { id, name, surname, gender, age,  city, whatsapp, email, description, profile_pic } = request.body;

        await connection('housekeepers').where('id',id).update({
            name,
            surname,
            gender,
            age,
            city,
            whatsapp,
            email,
            description,
            profile_pic
        })

        return response.status(204).send();
    }
}