
export const up = async function(knex) {
    await knex.schema.createTable('repos', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.boolean('inCache').notNullable();
        table.boolean('private').notNullable();
    });
};


export const down = async function(knex) {
    await knex.schema.dropTableIfExists('repos');
};
