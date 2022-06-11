/*
--------------------------------------------------------------------
Web Project
--------------------------------------------------------------------
Name   : Blood Donation
Team   : No Hope
Lab    : Mr.Tom - Saturday Morning class
--------------------------------------------------------------------
*/


create database WebProject;

create table Donor (
	id int auto_increment,
    -- did starts from 'D0001'
    did varchar(5) unique,
    imgid varchar(5),
	name varchar(50) not null,
	ssn varchar(50) not null,
	gender varchar(10) not null,
	birthday date not null,
	phone char(10) unique not null,
	email varchar(70) not null,
	address varchar(200) not null,
	blood_type varchar(5),
	med_cond varchar(500),
	can_donate int not null default 1,
    resetLink varchar(500),
    password varchar(500) not null,
	primary key (id)
);

create table Hospital (
	-- hid starts from 'H0001'
	hid char(5) unique not null,
	hname varchar(50) not null,
	address varchar(200) not null,
	email varchar(70) unique not null,
	phone varchar(20) unique not null,
    password varchar(500) not null,
	primary key (hid)
);

create table BloodStock (
	id int auto_increment,
    -- bid starts from 'B0001'
    bid varchar(5) unique,
    -- did references from did of Donor
	did varchar(5) not null,
	input_date date not null,
	blood_type varchar(5) not null,
	product_type varchar(20) not null,
	volume int not null,
	exp_date date,
	is_ordered int not null default 0,
	is_discarded int not null default 0,
	primary key (id)
);

create table BloodDriveLeader (
	id int auto_increment,
    -- bdid starts from 'BD001'
    bdid varchar(5) unique,
	bdname varchar(50) not null,
	ssn varchar(50) not null,
	gender varchar(10) not null,
	birthday date not null,
	phone char(10) unique not null,
	email varchar(70) not null,
	address varchar(200) not null,
    password varchar(500) not null,
	primary key (id)
);

create table Ordering (
	-- hid references from hid of Hospital
	hid char(5) not null,
    -- bid references from bid of BloodStock
	bid varchar(5) not null,
	order_date date not null,
	primary key (bid)
);

create table Appointment (
	-- did references from did of Donor
	did varchar(5) not null,
	appoint_date date not null,
	appoint_time time not null,
	is_appointed int not null default 0,
    mesage_note varchar(250),
    primary key (did, appoint_date)
);

create table Campaign (
	id int auto_increment,
    -- cid starts from 'C0001'
    cid varchar(5) unique,
	-- bdid references from bdid of BloodDriverLeader
    idimg int ,
	bdid varchar(5) not null,
	cname varchar(50) not null,
	open_time varchar(20) not null,
	start_date date not null,
	end_date date not null,
	address varchar(200) not null,
	pledge_number varchar(200) default 0,
	primary key (id)
);

create table HospitalMessage (
	id int auto_increment,
    -- hid references from hid of Hospital
    hid varchar(5) not null,
    subject varchar(100),
    message varchar(500) not null,
    is_processed int default 0,
    primary key (id)
);

create table Staff (
	id int auto_increment,
    username varchar(200) not null,
    password varchar(200) not null,
    primary key (id)
);

