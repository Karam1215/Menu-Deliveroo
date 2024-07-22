<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=35&center=true&vCenter=true&width=500&height=70&duration=4000&lines=Deliveroo👋;" />
</h1>

This project is a web application designed to facilitate the delivery of menu items to a dormitory. It features a backend service developed with Java Spring Boot and a frontend application built using React. The project includes database integration with PostgreSQL and aims to provide a seamless user experience for ordering food items.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Web-site Structure](#web-site-structure)
- [Conclusion](#conclusion)

## Project Overview

The Dormitory Menu Delivery System was developed as part of a practical training project. The goal was to gain hands-on experience with modern web development technologies and tools.

## Technologies Used

- **Backend**: Java Spring Boot
- **Frontend**: React
- **Database**: PostgreSQL, administered via pgAdmin
- **Testing Tools**: Postman
- **Visualization Tools**: Diagrams

## Features

1. **Main Menu**: Displays a responsive list of available menu items.
2. **Cart**: Allows users to add, remove, and update quantities of menu items.
3. **Order Placement**: Users can finalize their orders by providing delivery and payment details.

## Installation

### Prerequisites

- Java 8 or higher
- Node.js and npm
- PostgreSQL

### Backend Setup

1. Clone the repository:
    ```sh
    git clone git@github.com:Karam1215/Menu-Deliveroo.git
    cd menu_site/backend
    ```

2. Configure PostgreSQL:
    - Create a database named `menu_delivery`.
    - Update the `application.properties` file with your PostgreSQL credentials.

3. Build and run the backend:
    ```sh
    ./mvnw spring-boot:run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Browse the menu, add items to your cart, and place an order.

## Web-site Structure

Here is a diagram illustrating the structure of the web-site: 

<p>[Click here to view the diagram without messing content!](Diagrams/Deliveroo.drawio.png)</p>

![Web-site Structure](Diagrams/Delivero.svg)

---------------------------------------------------------------------------------------------------------
| Table       | Column Name    | Data Type     | Description                                            |
|-------------|----------------|---------------|--------------------------------------------------------|
| `menuitem`  | `id`           | `SERIAL`      | Primary key, unique identifier for each menu item.     |
|             | `name`         | `VARCHAR(255)`| Name of the menu item.                                 |
|             | `description`  | `VARCHAR`        | Description of the menu item.                       |
|             | `price`        | `DECIMAL`     | Price of the menu item.                                |
|             | `photo_url`    | `VARCHAR(255)`| URL to the photo of the menu item.                     |
|-------------|----------------|---------------|--------------------------------------------------------|
| `orders`    | `id`           | `SERIAL`      | Primary key, unique identifier for each order.         |
|             | `name`         | `VARCHAR(255)`| Name of the customer.                                  |
|             | `surname`      | `VARCHAR(255)`| Surname of the customer.                               |
|             | `delivery_....`| `VARCHAR(255)`| Delivery option chosen by the customer.                |
|             | `payment_....` | `VARCHAR(255)`| Payment option chosen by the customer.                 |
|             | `room_number`  | `VARCHAR(10)` | Room number for delivery.                              |
|             | `total`        | `DECIMAL`     | Total cost of the order.                               |
|-------------|----------------|---------------|--------------------------------------------------------|
|`order_items`| `id`          | `SERIAL`      | Primary key, unique identifier for each order item.     |
|             | `order_id`     | `INTEGER`     | Foreign key, references `orders(id)`.                  |
|             | `menuitem_id`  | `INTEGER`     | Foreign key, references `menuitem(id)`.                |
|             | `quantity`     | `INTEGER`     | Quantity of the menu item ordered.                     |
---------------------------------------------------------------------------------------------------------

## Conclusion

The project has equipped me with valuable experience in full-stack development, including backend services, frontend interfaces, and database management. This comprehensive learning experience has significantly enhanced my technical skill set and prepared me for future development projects.
