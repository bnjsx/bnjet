const { Generator } = require('bnjsx');

/**
 * This is a base generator template for managing database tables.
 *
 * @extends `Generator`
 */
class ResetTokensTableGenerator extends Generator {
  /**
   * Creates a generator instance.
   */
  constructor() {
    super();

    // The table name associated with this generator.
    this.set.table('reset_tokens');
  }

  /**
   * Creates the `reset_tokens` table.
   */
  create() {
    return this.schema(
      this.primaryKey(), // Primary key column
      this.createdAt(), // CreatedAt column
      this.updatedAt(), // UpdatedAt column

      // Add more columns here...
      this.column('email').varChar(250).notNull().index(),
      this.column('token').text().unique().notNull(),
      this.column('expires_at').datetime().notNull().index()
    );
  }
}

module.exports = new ResetTokensTableGenerator();
