# Dog Adoption App

This project is a React application created with Vite and integrated with MirageJS for mocking API requests, Redux Toolkit for state management, Cypress for end-to-end testing, Vitest for unit testing, and React Testing Library for component testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Mock Backend API - MirageJs](#mock-backend-api---miragejs)
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

## Mock Backend API - MirageJs

This project does not require additional configurations for a mock API server. MirageJs is set up to intercept all outgoing network requests. 

### Models

   #### Dog Model
   Represents a dog available for adoption.
      
    * {string} id - id of the dog.
    * {string} name - The name of the dog.
    * {string} food - Favorite food.
    * {string} img - The dog's image url string.
    * {string} ownerId - Associated owner in database.
   
   
   #### Owner Model
   Represents an owner who has adopted a dog.
   
    * {string} id - id of the owner.
    * {string} name - The name of the owner.
    * {number} exp - Years of dog ownership experience.
    * {string} dogId - Associated dog in database.

### Endpoints

   #### Get All Owners
   - **URL:** `/api/owners`
   - **Method:** `GET`
   - **Description:** Fetches all owners
   #### Get Single Owner
   - **URL:** `/api/owners/:id`
   - **Method:** `GET`
   - **Description:** Fetches a single owner based on ownerId
   #### Add new owner and adopt a dog
   - **URL:** `/api/owners/new`
   - **Method:** `POST`
   - **Description:** Add new owner to database. Include new owner data in request body. Returns updated owner list.
   #### Edit Owner
   - **URL:** `/api/owners/edit`
   - **Method:** `PUT`
   - **Description:** Edit an owner and save to database. Returns updated owner list. Updated owner data must be sent in request body.
   #### Get All Dogs
   - **URL:** `/api/dogs`
   - **Method:** `GET`
   - **Description:** Returns all dogs currently owned.
   #### Get single dog based on dogId
   - **URL:** `/api/dogs/:id`
   - **Method:** `GET`
   - **Description:** Returns a single dog along with its owner info.

## Testing
- Unit Tests with Vitest and React Testing Library:
  
  Run unit tests:.

     ```bash
   npm test
     
- End-to-end Tests with Cypress:
  
  Cypress tests must be run interactively along with Vite development:

     ```bash
   npm run cy:open
