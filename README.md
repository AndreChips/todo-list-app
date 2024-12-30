# Todo List Application

A React-based todo list application.

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
