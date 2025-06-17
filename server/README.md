# React Frontend Server

This is a simple Go server that serves the React frontend application.

## Prerequisites

- Go 1.21 or later
- React application built (in the `build` directory)

## Building and Running

1. First, build your React application:
```bash
npm run build
```

2. Run the Go server:
```bash
cd server
go run main.go
```

The server will start on port 8080 by default. You can change the port by setting the `PORT` environment variable.

## Features

- Serves static files from the `build` directory
- Handles client-side routing by serving `index.html` for all routes
- Configurable port through environment variables 