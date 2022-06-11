insert into hospital(hid, hname, address, email, phone, password) values
	('H0001', 'Adam Road Hospital', '559 Bukit Timah Road 01-02, King Arcade, Singapore 269695', 'nm@arh.com.sg', '6466-7777', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0002', 'Woodbridge Hospital', '10 Buangkok View Buangkok Green Medical Park Singapore 539747', 'enquiry@imh.com.sg', '6389-2000', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0003', 'National University Hospital', '11 Jalan Tan Tock Seng Singapore 308433', 'info@imc.jhmi.edu', '6880-2222', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0004', 'Mount Elizabeth Hospital', '3 Mount Elizabeth Singapore 228510', 'ppac@parkway.sg', '6737-2666', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0005', 'National Cancer Centre Singapore Hospital', '11 Hospital Drive Singapore 169610', 'cancerhelpline@nccs.com.sg', '6436-8000', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0006', 'Singapore General Hospital', '5 Second Hospital Avenue Singapore 168938', 'appointment@ndc.com.sg', '6324-8802', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0007', 'National Heart Centre Singapore Hospital', 'National Heart Centre 5 Hospital Drive Singapore 169609', 'nhcs@nhcs.com.sg', '6704-8000', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0008', 'National Neuroscience Institute Hospital', '11 Jalan Tan Tock Seng Singapore 308433', 'nni_hr@nni.com.sg', '6357-7153', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0009', 'National Skin Centre Hospital', '1 Mandalay Road Singapore 308205', 'nscqa@nsc.gov.sg', '6253-4455', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW'),
	('H0010', 'Singapore National Eye Centre Hospital', '11 Third Hospital Avenue Singapore 168751', 'appointments@snec.com.sg', '6227-7255', '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW');
    
insert into Staff (username, password) values
	("Staff@mail.com", '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW');
    
insert into BloodDriveLeader (bdname, ssn, gender, birthday, phone, email, address, password) values 
	("Social Work Team", "123456", "Orther", "2001-01-23", "0123456789", "IU@mail.com","International University", '$2a$10$rLtpsKv3rsKD40xd9eMcsuLn89V9.YrV/DPxqSz2bUpAnYZrcndcW');
    
insert into Campaign (bdid, cname, open_time, start_date, end_date, address, pledge_number) values 
	("BD001", "Nhu", "05:00", "2022-06-01", "2022-06-01", "abc", "abc");
    
insert into bloodstock(did, input_date, blood_type, product_type, volume) values 
	("D0001", "2022-02-04", "A+", "red blood cells", 200),
    ("D0001", "2022-02-04", "A+", "platelets", 200),
    ("D0001", "2022-02-04", "A+", "plasma", 200),
    ("D0001", "2022-02-04", "A+", "whole blood", 200);
