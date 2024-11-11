import { EntitySchema } from "typeorm";

const Log = new EntitySchema({
    name: 'Log',
    tableName: 'logs',
    columns: {

        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        question: {
            type: "varchar",
        },

        response: {
            type: "varchar",
        },

        createdAt: {
            type: "varchar"
        }
    }
})

export default Log;