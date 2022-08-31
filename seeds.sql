INSERT INTO department (id, dep_name)
VALUES (1, "HR");

INSERT INTO employee_role (id, title,salary,department_id)
VALUES (1, "manager","10.5",1);

INSERT INTO employee (id, first_name,last_name,role_id,manager_id)
VALUES (1,"Mike","Potatoes",1,1);