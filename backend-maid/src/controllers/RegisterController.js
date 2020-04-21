const connection = require('../database/connection');

const crypto = require('crypto');

const sendEmail = require('../utils/sendEmail');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const { filter, subfilter } = request.body;

        const [count] = await connection('housekeepers').count();

        const filters = ["gender", "all", "city", "name", "age"];

        let housekeepers = "";
        
        if (filter === 'all'){
            housekeepers = await connection('housekeepers').limit(5).offset((page - 1) * 5).select('*');
        }
        else{
            if (filters.includes(filter)){
                housekeepers = await connection('housekeepers').limit(5).offset((page - 1) * 5).where(`${filter}`, subfilter).select('*');
            }
        }

        response.header('X-Total-Count', count['count(*)']);

        return response.json(housekeepers);
    },

    async create(request, response){
        const { name, surname, gender, age, city, whatsapp, email, description, profile_pic } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        sendEmail.send('lucasmvl2003@gmail.com','lmvllsvl', email, 'Seu ID de cadastro', `Muito obrigado por utilizar o MaidMe! Aqui está o seu ID de cadastro: ${id}`)
        
        await connection('housekeepers').insert({
            id,
            name,
            surname,
            gender,
            age,
            city,
            whatsapp,
            email,
            description,
            profile_pic,
        });

        return response.json({ id })
    },
    async delete(request, response) {
        /* const { id } = request.params;
        const AsyncStorage_id = request.headers.authorization;

        if (id !== AsyncStorage_id){
            return response.status(401).json({erro: "The submitted ID does not match the previously entered ID."})
        }

        await connection('housekeepers').where('id', id).delete();

        return response.status(204).send(); */
        const { id, verificationCode } = request.body;
        const generatedCode = request.headers.authorization;

        if (generatedCode !== verificationCode){
            return response.status(401).json({ error: "The verification code is not correct" })
        }

        await connection('housekeepers').where('id', id).delete();

        return response.status(204).send();
    }
};