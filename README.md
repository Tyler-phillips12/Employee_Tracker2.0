# Employee_Tracker2.0

This command-line application is designed to manage employee information within a database. It provides various options to view, add, and update departments, roles, and employees. The application accepts user input through the command line interface and interacts with the database accordingly.

# Screenshot
<img width="2560" alt="2023-05-24" src="https://github.com/Tyler-phillips12/Employee_Tracker2.0/assets/123614404/48bb1a7f-f150-4f0c-9904-1c4007586747">

# Installation
To use this application, follow these steps:

1. Clone the repository to your local machine.
2. Ensure that you have Node.js and MySQL installed on your system.
3. Open a terminal or command prompt and navigate to the application's root directory.
4. Install the required dependencies by running the following command:  npm install


5. Configure the database connection by modifying the connection.js file. Update the connection details with your MySQL credentials.
6. Import the database schema by executing the schema.sql file on your MySQL server. This file can be found in the repository's root directory.
7. Optionally, you can populate the database with sample data by executing the seeds.sql file.
Once the database is set up, you are ready to run the application.
# Usage
To start the application, navigate to the application's root directory in the terminal or command prompt and run the following command:  node index.js

Upon running the application, you will be presented with a menu of options:

1. View all departments: This option displays a formatted table showing the department names and IDs.
2. View all roles: This option presents a list of job titles, role IDs, departments, and salaries associated with each role.
3. View all employees: Selecting this option shows a formatted table containing employee data, including IDs, first names, last names, job titles, departments, salaries, and the managers they report to.
4. Add a department: Choosing this option prompts you to enter the name of the new department. Once entered, the department is added to the database.
Add a role: This option allows you to add a new role by providing the role name, salary, and department it belongs to.
6. Add an employee: Selecting this option guides you through the process of adding a new employee. You will be prompted to enter the employee's first name, last name, role, and manager's ID.
7. Update an employee role: This option enables you to update an employee's role by selecting the employee and their new role.

To navigate the menu, simply enter the corresponding number for the desired option and press Enter.

# Database Structure
This application interacts with a MySQL database that consists of three main tables: departments, roles, and employees. The relationships between these tables are as follows:

    -Each role belongs to a department (one-to-many relationship).
    -Each employee has a role (one-to-many relationship).
    -Each employee may have a manager (self-referencing one-to-many relationship).
    -Contributing
    -Contributions to this project are welcome. If you encounter any issues or have suggestions for improvement, please open an issue on the project's repository.

# License
This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as needed.