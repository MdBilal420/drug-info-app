# Drug Info Backend

This is the backend API for the Drug Info application. It provides endpoints for accessing drug information stored in a PostgreSQL database.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up the database:
   - Install PostgreSQL locally
   - Create a database named `druginfo`
   - Create a user with appropriate privileges
   - Update the `DATABASE_URL` in the `.env` file

3. Run database migrations:
   ```
   npx prisma migrate dev
   ```

4. Import drug data:
   ```
   npm run seed
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/config` - Get table configuration
- `GET /api/companies` - Get list of all companies
- `GET /api/drugs` - Get list of drugs (with optional company filter)

## Environment Variables

- `PORT` - Port for the server to listen on (default: 3001)
- `DATABASE_URL` - Connection string for PostgreSQL database

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── .env
├── package.json
└── README.md
```