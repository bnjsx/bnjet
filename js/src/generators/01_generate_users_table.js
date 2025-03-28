const { Generator } = require('bnjsx');

/**
 * This is a base generator template for managing database tables.
 *
 * @extends `Generator`
 */
class UsersTableGenerator extends Generator {
  /**
   * Creates a generator instance.
   */
  constructor() {
    super();

    // The table name associated with this generator.
    this.set.table('users');
  }

  /**
   * Creates the `users` table.
   */
  create() {
    return this.schema(
      this.primaryKey(), // Primary key column
      this.createdAt(), // CreatedAt column
      this.updatedAt(), // UpdatedAt column

      // Add more columns here...
      this.column('email').varChar(250).unique().notNull(),
      this.column('password').varChar(250).notNull()
    );
  }
}

module.exports = new UsersTableGenerator();
