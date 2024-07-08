# Dog Adoption App

This project is a React application created with Vite and integrated with MirageJS for mocking API requests, Redux Toolkit for state management, Cypress for end-to-end testing, Vitest for unit testing, and React Testing Library for component testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Testing](#testing)


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Nicholas-Huang713/legalm-code-challenge.git
   cd <project-folder>

2. **Install dependencies:**

   ```bash
   npm install

## Usage

1. **Start the development server:**

   ```bash
   npm run dev
   
**Open http://localhost:5173 in your browser to view the app.**

2. **Build the project:**

   ```bash
   npm run build
   
**This command builds the app for production to the dist folder.**

## Features

- **Vite**: Next generation front-end tooling for React apps.
- **MirageJS**: API mocking library for development and testing.
- **Redux Toolkit**: State management library for predictable state containers in React apps.
- **Cypress**: End-to-end testing framework for web applications.
- **Vitest**: Lightweight unit testing library for React applications.
- **React Testing Library**: Testing utilities for React components.

## Testing

- End-to-end Tests with Cypress:
  
  Cypress tests must be run interactively along with Vite development server:

     ```bash
   npm run cy:open

- Unit Tests with Vitest and React Testing Library:
  
  Run unit tests:.

     ```bash
   npm test

