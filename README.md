# Todo List Application

A React-based todo list application with filtering capabilities and responsive design.

## Features

- Filter todos by category (All/Personal/Work)
- Toggle todo completion status
- Responsive design
- Sorted by completion status and creation date
- Secure API handling

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment template and fill in your values:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

### Testing

Run the test suite:

```bash
npm test
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

### Environment Variables

Configure the following environment variables in your deployment platform:

- `NEXT_PUBLIC_API_BASE_URL`: Your API base URL
- `API_KEY`: Your API key (keep this secret!)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Code Style

This project uses:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## Security Considerations

- API keys are stored in environment variables
- CORS policies are implemented
- Input validation is performed
- Security headers are configured

## License

This project is licensed under the MIT License - see the LICENSE file for details.
