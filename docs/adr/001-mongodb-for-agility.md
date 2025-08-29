MongoDB for Agility
We need a database that allows for rapid iteration on our data models during early development.
We will use MongoDB as our primary database. Its flexible schema is ideal for this stage.
We gain development speed. We lose ACID guarantees of SQL, but can mitigate this with transactions. A future migration to PostgreSQL is possible via an abstraction layer (like Prisma or a repository pattern).