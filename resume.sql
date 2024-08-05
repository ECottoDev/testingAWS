
use SuperProject;

create table workExperience(
id int auto_increment primary key,
Company varchar(100) not null,
Position varchar(100) not null,
Duties varchar(500),
TimeWorked varchar(50)
);

create table educationHistory(
id int auto_increment primary key,
schoolName varchar(100) not null,
schoolYear varchar(25) not null,
concentration varchar(200) not null,
graduated bool
);

create table skills(
id int auto_increment primary key,
name varchar(50) not null, 
skillLevel varchar(25) not null
);

create table completedProjects(
id int auto_increment primary key,
projectTitle varchar(50) not null,
projectLink varchar(1000)not null
);

select * from Skills;
insert into educationHistory values ('1','scool', '1787', 'music', 1);

create TABLE BudgetData(
	cardID int primary key not null AUTO_INCREMENT,
    cardName varchar(20),
    amountDue int,
    amountMinDue int
); 
Insert Into BudgetData(cardName, amountDue, amountMinDue) values('Test', 283, 35);
select * from BudgetData;
drop table BudgetData;
Update BudgetData set cardName = 'Sams' where cardID =1;

create TABLE monthBudget(
budget int primary key
);
insert into monthBudget(budget) values(0);
select * from monthBudget;
drop table monthBudget;
update monthBudget set budget = 7800;
insert into monthBudget(budget) values(490);

create Table Bank(
currentBankAmount int primary key
);
insert into Bank (currentBankAmount) values (838);
select * from Bank;
