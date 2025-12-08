
export const up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
    });
};


export const down = async function(knex) {
    await knex.schema.dropTableIfExists('users');
};
