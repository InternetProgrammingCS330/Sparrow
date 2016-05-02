USE sergeidb

INSERT INTO UserDB (email, first_name,last_name) VALUES ("sergeihanka@test.net","Sergei","Hanka");
INSERT INTO UserDB (email, first_name,last_name) VALUES ("sparrow@isabird.org","Ales","ToughLastName");
INSERT INTO UserDB (email, first_name,last_name) VALUES ("CS330@isawesome.com","Brad","Miller");

INSERT INTO ProjectDB (title,description,email, department) VALUES ("One","testing number one","sparrow@isabird.org","Computer Science");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Two","testing number two","sergeihanka@test.net","Biology");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Three","testing number three","CS330@isawesome.com","Economics");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Four","testing number four","sergeihanka@test.net","Nursing");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Five","testing number five","sparrow@isabird.org","Economics");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Six","testing number six","sergeihanka@test.net","Computer Science");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Seven","testing number seven","sergeihanka@test.net","Biology");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Eight","testing number eight","sparrow@isabird.org","Computer Science");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Nine","testing number nine","sergeihanka@test.net","Computer Science");
INSERT INTO ProjectDB (title,description,email, department) VALUES ("Ten","testing number ten","CS330@isawesome.com","Nursing");

INSERT INTO DepartmentDB (department_name) VALUES ("Computer Science");
INSERT INTO DepartmentDB (department_name) VALUES ("Biology");
INSERT INTO DepartmentDB (department_name) VALUES ("Chemistry");
INSERT INTO DepartmentDB (department_name) VALUES ("Physics");
INSERT INTO DepartmentDB (department_name) VALUES ("Mathematics");
INSERT INTO DepartmentDB (department_name) VALUES ("Environmental Studies");
INSERT INTO DepartmentDB (department_name) VALUES ("Economics");
INSERT INTO DepartmentDB (department_name) VALUES ("Political Science");
INSERT INTO DepartmentDB (department_name) VALUES ("Nursing");