// import mysql2
const mysql = require('mysql2')
// import inquirer 
const inquirer = require('inquirer')

const cTable = require('console.table'); 

// connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employee_tracker_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected to local port');
});

// inquirer prompt for first action
const init = () => {
  inquirer
      .prompt([
          {
              type: "list",
              message: "Please select from the following options:",
              name: "initialize",
              choices: [
                  "View all departments",
                  "View all roles",
                  "View all employees",
                  "Add a department",
                  "Add a role",
                  "Add an employee",
                  "Update an employee role",
                  "I'm finished"
              ]
          }
      ]).then(ans => {
          switch (ans.initialize) {
              case "View all departments": viewDept();
                  break;
              case "View all roles": viewRoles();
                  break;
              case "View all employees": viewEmployees();
                  break;
              case "Add a department": addDept();
                  break;
              case "Add a role": addRole();
                  break;
              case "Add an employee": addEmployee();
                  break;
              case "Update an employee role": updateEmployee();
                  break;
              case "I'm Done":
                  console.log("Thank you!");
                  process.exit();
          }
      }).catch(err => console.error(err));
}

init();

const viewDept = () => {
  connection.query(`SELECT * FROM department`, (err, results) => {
      err ? console.error(err) : console.table(results);
      init();
  })
};

const viewRoles = () => {
  connection.query(`SELECT * FROM roles`, (err, results) => {
      err ? console.error(err) : console.table(results);
      init();
  })
};

const viewEmployees = () => {
  connection.query(`SELECT * FROM employees`, (err, results) => {
      err ? console.error(err) : console.table(results);
      init();
  })
}

const addDept = () => {
  inquirer
      .prompt([
          {
              type: "input",
              message: "What is the name of the department you'd like to add?",
              name: "addDept"
          }
      ]).then(ans => {
          connection.query(`INSERT INTO department(name)
                  VALUES(?)`, ans.addDept, (err, results) => {
              if (err) {
                  console.log(err)
              } else {
                  connection.query(`SELECT * FROM department`, (err, results) => {
                      err ? console.error(err) : console.table(results);
                      init();
                  })
              }
          }
          )
      })
};

const addRole = () => {
  const deptChoices = () => connection.promise().query(`SELECT * FROM departments`)
    .then((rows) => {
      let arrNames = rows[0].map(obj => obj.name);
      return arrNames;
    });

  deptChoices().then(choices => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the title of the role you'd like to add?",
          name: "roleTitle"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "roleSalary"
        },
        {
          type: "list",
          message: "Which department is this role in?",
          name: "addDept",
          choices: choices
        }
      ]).then(ans => {
        connection.promise().query(`SELECT id FROM departments WHERE name = ?`, ans.addDept)
          .then(answer => {
            let mappedId = answer[0].map(obj => obj.id);
            return mappedId[0];
          })
          .then((mappedId) => {
            connection.promise().query(`INSERT INTO roles(title, salary, department_id)
              VALUES(?, ?, ?)`, [ans.roleTitle, ans.roleSalary, mappedId]);
            init();
          });
      });
  });
};

const addEmployee = () => {
  const rollChoices = () => connection.promise().query(`SELECT * FROM roles`)
    .then((rows) => {
      let arrNames = rows[0].map(obj => obj.title);
      return arrNames;
    });

  rollChoices().then(choices => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "firstName"
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "lastName"
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "employeeRole",
          choices: choices
        }
      ]).then(ans => {
        connection.query(`INSERT INTO employees(first_name, last_name, role_id)
                  VALUES(?, ?, (SELECT id FROM roles WHERE title = ?))`, [ans.firstName, ans.lastName, ans.employeeRole], (err, results) => {
          if (err) {
            console.log(err);
          } else {
            connection.query(`SELECT * FROM employees`, (err, results) => {
              err ? console.error(err) : console.table(results);
              init();
            });
          }
        });
      });
  });
};
