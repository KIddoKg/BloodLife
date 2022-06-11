/*
--------------------------------------------------------------------
Web Project
--------------------------------------------------------------------
Name   : Blood Donation
Team   : No Hope
Lab    : Mr.Tom - Saturday Morning class
--------------------------------------------------------------------
*/


-- Reset identity seed
alter table Donor auto_increment = 1;
alter table BloodStock auto_increment = 1;
alter table BloodDriveLeader auto_increment = 1;
alter table Campaign auto_increment = 1;


-- Triggrt img
DELIMITER $$
USE `webproject`$$
CREATE DEFINER=`root`@`localhost` TRIGGER create_img BEFORE INSERT ON Campaign FOR EACH ROW
BEGIN
    declare num int;
	set num = FLOOR( 1 + RAND( ) *3 );
    
	set new.idimg = num;

END$$
DELIMITER ;


-- Trigger to create did (donor id)
USE `webproject`;
DROP TRIGGER IF EXISTS `webproject`.`create_did`;

DELIMITER $$
USE `webproject`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `create_did` BEFORE INSERT ON Donor FOR EACH ROW
BEGIN
    declare num int;
	set num = (select max(id) from Donor) + 1;

    if (num >= 1 and num <= 9) then
        set new.did = (select concat('D000', cast(num as char)));
    elseif (num >= 10 and num <= 99) then
        set new.did = (select concat('D00', cast(num as char)));
    elseif (num >= 100 and num <= 999) then
        set new.did = (select concat('D0', cast(num as char)));
    elseif (num >= 1000 and num <= 9999) then
        set new.did = (select concat('D', cast(num as char)));
	else set new.did = 'D0001';
    end if;
END$$
DELIMITER ;


-- Trigger to create bid (blood stock id)
USE `webproject`;
DROP TRIGGER IF EXISTS `webproject`.`create_bid`;

DELIMITER $$
USE `webproject`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `create_bid` BEFORE INSERT ON BloodStock FOR EACH ROW
BEGIN
    declare num int;
	set num = (select max(id) from BloodStock) + 1;

    if (num >= 1 and num <= 9) then
        set new.bid = (select concat('B000', cast(num as char)));
    elseif (num >= 10 and num <= 99) then
        set new.bid = (select concat('B00', cast(num as char)));
    elseif (num >= 100 and num <= 999) then
        set new.bid = (select concat('B0', cast(num as char)));
    elseif (num >= 1000 and num <= 9999) then
        set new.bid = (select concat('B', cast(num as char)));
	else set new.bid = 'B0001';
    end if;
END$$
DELIMITER ;


-- Trigger to create bdid (blood drive leader id)
USE `webproject`;
DROP TRIGGER IF EXISTS `webproject`.`create_bdid`;

DELIMITER $$
USE `webproject`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `create_bdid` BEFORE INSERT ON BloodDriveLeader FOR EACH ROW
BEGIN
    declare num int;
	set num = (select max(id) from BloodDriveLeader) + 1;

    if (num >= 1 and num <= 9) then
        set new.bdid = (select concat('BD00', cast(num as char)));
    elseif (num >= 10 and num <= 99) then
        set new.bdid = (select concat('BD0', cast(num as char)));
    elseif (num >= 100 and num <= 999) then
        set new.bdid = (select concat('BD', cast(num as char)));
	else set new.bdid = 'BD001';
    end if;
END$$
DELIMITER ;


-- Trigger to create cid (campaign id)
USE `webproject`;
DROP TRIGGER IF EXISTS `webproject`.`create_cid`;

DELIMITER $$
USE `webproject`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `create_cid` BEFORE INSERT ON Campaign FOR EACH ROW
BEGIN
    declare num int;
	set num = (select max(id) from Campaign) + 1;

    if (num >= 1 and num <= 9) then
        set new.cid = (select concat('C000', cast(num as char)));
    elseif (num >= 10 and num <= 99) then
        set new.cid = (select concat('C00', cast(num as char)));
    elseif (num >= 100 and num <= 999) then
        set new.cid = (select concat('C0', cast(num as char)));
	elseif (num >= 1000 and num <= 9999) then
        set new.cid = (select concat('C', cast(num as char)));
	else set new.cid = 'C0001';
    end if;
END$$
DELIMITER ;


-- Trigger to calculate the expiry date
USE `webproject`;
DROP TRIGGER IF EXISTS `webproject`.`expiry_date_calculator`;

DELIMITER $$
USE `webproject`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `expiry_date_calculator` BEFORE INSERT ON BloodStock FOR EACH ROW
BEGIN
    if (new.product_type = 'Red Blood Cells') then
		set new.exp_date = (select date_add(new.input_date, interval 42 day));
    elseif (new.product_type = 'Platelets') then
        set new.exp_date = (select date_add(new.input_date, interval 5 day));
    elseif (new.product_type = 'Plasma') then
        set new.exp_date = (select date_add(new.input_date, interval 1 year));
	else set new.exp_date = (select date_add(new.input_date, interval 42 day));
    end if;
END$$
DELIMITER ;