# User Management Dashboard

This project is a simple React-based User Management Dashboard that demonstrates CRUD (Create, Read, Update, Delete) operations on user data. It uses JSONPlaceholder as a fake REST API for demonstration purposes. The app includes features like:

- **Data Fetching:** Uses React Query to fetch data from JSONPlaceholder.
- **CRUD Operations:**
  - **Create:** Add a new user via a modal form.
  - **Edit:** Update an existing user's details using a modal prefilled with user data.
  - **Delete:** Remove a user with a confirmation prompt.
- **Sorting & Filtering:**
  - Sort the table by clicking on the column headers.
  - Filter the user list using a debounced search input.
- **Pagination:**
  - The table handles pagination internally on the client side.
- **Routing & Navigation:**
  - The project uses React Router for navigation between the dashboard and a user details page.
- **Styling:**
  - Styled using Tailwind CSS.

> **Note:** JSONPlaceholder returns successful responses on POST, PUT/PATCH, and DELETE requests but does not persist changes. To simulate immediate UI updates, the project uses local state updates after mutations.

## Features

- **Data Fetching:**
  - Retrieve a list of users and user details from JSONPlaceholder.
- **CRUD Operations:**
  - **Create:** Click the "Create New User" button to open a modal with an empty form.
  - **Edit:** Click the "Edit" button next to a user to open a modal prefilled with that user's data.
  - **Delete:** Click the "Delete" button and confirm to remove the user from the list.
- **Sorting & Filtering:**
  - Sort columns by clicking on the header.
  - Use a debounced search input to filter the user list.
- **Pagination:**
  - The table component includes pagination controls for navigating through the user list.
- **Responsive UI:**
  - Sidebar navigation and a responsive layout using Tailwind CSS.
- **Routing:**
  - Navigate between the dashboard and individual user details pages.

## Installation

1. **Clone the Repository:**
   - git clone https://github.com/whoisexcel/minidashboard.git

# or

- git clone git@github.com:whoisexcel/minidashboard.git
- cd minidashboard

2. **Install Dependencies:**

   - npm install # or yarn install

3. **Run the Application:**
   - npm start or yarn start

## Usage

- Visit http://localhost:3000/dashboard

## Technologies Used

- React, React Query (TanStack Query), Axios, React Router, Tailwind CSS, TypeScript
