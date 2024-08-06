# 🚀 Supply Chain Dashboard

![Supply Chain Dashboard Logo](https://supply-chain-dashboard-3e5637c94499.herokuapp.com/logo.png)

Welcome to the **Supply Chain Dashboard**! This fully functional CRUD application allows users to manage various aspects of a supply chain, including customers, inventory, orders, products, shipments, and suppliers. Built with a modern tech stack and hosted on Heroku, it offers a comprehensive solution for managing and visualizing supply chain data.

## 🏆 Features

### 🔧 Full CRUD Operations

- **CRUD Functionality**: Manage Customers, Inventory, Orders, Products, Shipments, and Suppliers with complete Create, Read, Update, and Delete capabilities.
- **Seamless Management**: Easily handle your database with user-friendly interfaces.

**_Implementation Details_**
The backend is built with Express, PostgreSQL (pg), and CORS for secure and efficient API handling. The database is managed using pgAdmin 4, and testing is conducted with Postman. The frontend, built with React, includes MUI for the UI components, Nivo for charts, and Axios for API interactions. All components are organized for a clean and intuitive user experience.

<img src="https://supply-chain-dashboard-3e5637c94499.herokuapp.com/dashboard.png" alt="Dashboard Overview" style="width:100%; max-width:600px; border-radius:10px;">

### 📊 Interactive Dashboards

- **Graphs & Charts**: Visualize data with Nivo charts and graphs that provide real-time insights into your supply chain operations.
- **Dynamic Data Tables**: Manage and view data in fully functional tables with sorting, filtering, and pagination.

**_Implementation Details_**
Utilizing MUI and Nivo, the dashboard presents various graphs and charts to display key metrics. The data tables support CRUD operations and are integrated with API endpoints for real-time updates.

<img src="https://supply-chain-dashboard-3e5637c94499.herokuapp.com/datatable.png" alt="Charts and Graphs" style="width:100%; max-width:600px; border-radius:10px;">

### 🗂️ Routes and Navigation

- **Client Routes**: Manage different aspects of the supply chain with routes for Customers, Inventory, Orders, Products, Shipments, and Suppliers.
- **React Router**: Navigate seamlessly between different sections of the dashboard.

**_Implementation Details_**
React Router DOM is used to handle routing within the application, ensuring smooth navigation between various sections. Each route is connected to a specific CRUD interface, allowing users to manage different types of data effectively.

## 🎨 Technologies Used

- **Frontend**: React, MUI, Nivo, Axios, React Router DOM, React-Pro Sidebar
- **Backend**: Express, PostgreSQL, CORS, dotenv
- **Hosting**: Heroku
- **Testing**: pgAdmin 4, Postman

## 📁 Project Structure

- **`client/`**: Contains the React application with all UI components and frontend logic.
- **`server/`**: Contains the backend code including routes, controllers, and database interactions.

## 🚀 Deployment

The application is deployed on Heroku. Visit [Heroku App](https://supply-chain-dashboard-3e5637c94499.herokuapp.com/) to view the live application.
😊
