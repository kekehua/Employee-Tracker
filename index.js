const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // {TODO: Add your MySQL password}
      password: 'Vaportrail1!',
      database: 'employee_db'
    },
    console.log(`Connected to the inventory_db database.`)
  );


async function init() {
    await opener();
}

async function opener(){
    await inquirer.prompt([{
        message: "What would you like to do?",
        type: "list",
        choices: ["view all departments","view all roles","view all employees","add a department","add a role","add an employee","update an employee","quit"],
        name:"choice"
    }]).then((answer) =>{
        switch (answer.choice) {
            case "view all departments":
                AllDepartments();
                break;
            case "view all employees":
                AllEmployees();
                break;
            case "view all roles":
                AllRoles();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRole();
                break;
            case "update an employee":
                updateEmployee();
                break;
            case "quit":
                connection.end();
                break;
            default:
                throw new Error("invalid initial user choice");
        }
    })
}
function AllDepartments(){
    db.query('SELECT * from department', function(err,results){
        console.table(results);
        opener();
    })
}
function AllEmployees(){
    db.query('SELECT * from employee', function(err,results){
        console.table(results);
        opener();
    })
}

function AllRoles(){
    db.query('SELECT * from employee_role', function(err,results){
        console.table(results);
        opener();
    })
}
async function addDepartment(){
        const answer = await inquirer.prompt([
        {
        message: "What is the name of your new department?",
        type:"input",
        name:"dep_name",
        }
        ]).then(department => {
            console.log(department)
            db.query('INSERT INTO department SET ?', department)
        })
        opener();
    
    }

    async function addRole(){
        const answer = await inquirer.prompt([
                        {
                        message: "What is the title of your new role?",
                        type:"input",
                        name:"title",
                        },
                        {
                            message: "What is the salary of the new role?",
                            type:"input",
                            name:"salary"
                        },
                        {
                            message: "What department is this role in(Proviode department id)?",
                            type:"input",
                            name:"department_id"
                        
                        }]).then(role =>{
                            console.log(role);
        db.query("INSERT INTO employee_role SET ?", role)})
        opener();
    
    }
    
    async function addEmployee(){
        const answer = await inquirer.prompt([
                        {
                        message: "First Name?",
                        type:"input",
                        name:"first_name",
                        },
                        {
                            message: "Last Name?",
                            type:"input",
                            name:"last_name",
                        },
                        {
                            message: "Role ID?",
                            type:"input",
                            name:"role_id",
                        }, 
                        {
                            message: "Manager's ID?",
                            type:"input",
                            name:"manager_id",
                        }]).then(answer =>{
                            console.log(answer);
        db.query("INSERT INTO employee SET ?", answer)})
        opener();
    
    }      
    async function updateEmployee(){
        const answer = await inquirer.prompt([
                        {
                        message: "What is the employee ID whose role you would like to change?",
                        type:"input",
                        name:"id",
                        },
                        {
                            message: "What is the new Role ID?",
                            type:"input",
                            name:"role_id",
                        }]).then(answer =>{
                            console.log(answer.role_id);
        db.query("UPDATE employee SET ? WHERE ?",[{role_id:answer.role_id},{id:answer.id}])})
        opener();     
    
    }      

init();