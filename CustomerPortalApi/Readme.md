# Customer Portal API

## Overview

This project is a simple CRUD application for managing customer information, built with .NET 6 and Angular 14. It uses Entity Framework Core with a SQLite database for data persistence. The application allows for the creation, retrieval, updating, and deletion of customer records.

## Features

- CRUD operations for customer data (First Name, Last Name, Email, Created Date/Time, Last Updated Date/Time).
- Session storage to highlight the last customer selected.
- In-memory database for testing.
- Unit tests with xUnit and Moq.

## Prerequisites

- .NET 6 SDK
- Visual Studio 2022 or VS Code with C# extension
- Node.js and npm (for Angular)
- Angular CLI

## Project Structure

The project is organized into several layers, separating concerns and making it easier to manage and scale.

### Backend (API Layer)

Located in `CustomerPortalApi`, this layer handles all the business logic and data access.

- **Models**: Defines the data models (e.g., `Customer`).
- **Data**: Contains the `AppDbContext` for database interactions.
- **Repositories**: Implements the logic for accessing data stored in the database.
- **Controllers**: Handles HTTP requests, utilizes repositories, and returns responses.
- **Migrations**: Contains Entity Framework migrations for the database.

### Frontend (UI Layer)

Located in `CustomerPortal`, this layer is built with Angular.

- **src/app/components**: Angular components for the user interface.
- **src/app/services**: Angular services for handling HTTP requests to the API.
- **src/app/models**: TypeScript models/interfaces.

### Testing

Located in `CustomerPortalApi.Tests`, this layer contains unit tests.

- **RepositoriesTests**: Unit tests for repository classes.

## Architecture Pattern

The project follows the **Repository Pattern** along with **MVC (Model-View-Controller)** for the backend, and a **modular frontend architecture** for the Angular application.

### Backend Architecture

- **Model**: Represents the data structure. In this case, the `Customer` class.
- **View**: Although typically associated with frontend, in APIs, this can be considered as the format of data sent to the client.
- **Controller**: Handles incoming requests, processes them (with the help of Services, if applicable), and returns responses.
- **Repository**: Provides an abstraction layer over data access, allowing for easier testing and maintenance.

### Frontend Architecture

- **Components**: Responsible for rendering the UI and handling user interactions.
- **Services**: Handle the business logic of the application, especially communication with the backend API.
- **Models**: Define the structure of data used within the Angular application.


## Getting Started

### Setting Up the Backend

1. Clone the repository:
git clone [repository-url]
2. Navigate to the project directory:
cd CustomerPortalApi
3. Restore the .NET dependencies:
dotnet restore
4. Run the application:
dotnet run

### Setting Up the Frontend

1. Navigate to the Angular project directory:
cd CustomerPortal
2. Install npm packages:
npm install
3. Start the Angular application:
ng serve

## Testing

Run the unit tests using the following command:
dotnet test

## Architecture

- **Data Layer**: Entity Framework Core, SQLite for development/production, and In-Memory database for testing.
- **API Layer**: ASP.NET Core Web API.
- **Frontend**: Angular 14.


## Contact

Manisha
