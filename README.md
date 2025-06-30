# Deals Management App

A modern React-based deals management application with filtering, pagination, and a clean professional interface.

## Features

- 📊 **Deals Table**: View and manage deals with customer information, values, stages, and probabilities
- 🔍 **Advanced Filtering**: Filter deals by name, customer, and stage
- 📄 **Pagination**: Navigate through deals with paginated results
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, professional interface with TailwindCSS

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Radix UI components
- **Backend**: Express.js server
- **State Management**: React hooks + TanStack Query
- **Routing**: React Router 6
- **Icons**: Lucide React

## Prerequisites

Before running this project locally, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd deals-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

This command will:

- Start the Vite development server for the React frontend
- Start the Express backend server
- Both will run on a single port (usually 8080)
- Enable hot reload for both client and server code

### 4. Open in Browser

Navigate to the URL shown in your terminal (typically `http://localhost:8080`) to view the application.

## Available Scripts

### Development

```bash
npm run dev          # Start development server (client + server)
npm run typecheck    # Run TypeScript type checking
npm test            # Run tests with Vitest
```

### Production

```bash
npm run build       # Build both client and server for production
npm run start       # Start production server
```

### Code Quality

```bash
npm run format.fix  # Format code with Prettier
```

## Project Structure

```
├── client/                 # React frontend
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── RecentDeals.tsx # Main deals component
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions
│   └── global.css         # Global styles
├── server/                # Express backend
│   ├── routes/            # API route handlers
│   └── index.ts           # Server configuration
├── shared/                # Shared types and utilities
│   └── types.ts           # TypeScript interfaces
└── public/                # Static assets
```

## Development Workflow

1. **Frontend Development**: Edit files in the `client/` directory. Changes will hot-reload automatically.

2. **Backend Development**: Edit files in the `server/` directory. The server will restart automatically.

3. **Adding New Components**: Create new components in `client/components/` and follow the existing patterns.

4. **Styling**: Use TailwindCSS classes. Custom styles go in `client/global.css`.

5. **Types**: Add shared types in `shared/types.ts` for use across client and server.

## API Endpoints

The application includes a simple Express server with example endpoints:

- `GET /api/ping` - Health check endpoint
- `GET /api/demo` - Demo endpoint

## Environment Variables

No environment variables are required for basic development. The app uses sensible defaults.

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, the development server will automatically try the next available port. Check the terminal output for the actual URL.

### Node Modules Issues

If you encounter dependency issues:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Run type checking to see detailed TypeScript errors:

```bash
npm run typecheck
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run `npm run typecheck` to ensure no TypeScript errors
4. Run `npm run format.fix` to format your code
5. Test your changes thoroughly
6. Submit a pull request

## License

This project is licensed under the MIT License.
