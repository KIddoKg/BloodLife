![Logo](https://i.imgur.com/SlDhflx.png)

# Blood Donation Management

## 📝 Contents

Chapter 1: INTRODUCTION

    1. Motivation
    2. Problems Statement
    3. Scope

Chapter 2: LITERATURE REVIEW

    1. Similar Applications/Systems
    2. Platform and Tools Review

Chapter 3: SYSTEM DESIGN

    1. System Requirement Specification
        1.1 System Requirement Specification
        1.2 Requirements Analysis
        1.3 Non-functional Requirements
    2. System Design Specification
        2.1 Use-cases Diagram
        2.2 Sequence Diagram
        2.3 Activity Diagram
        2.4 Class Diagram

Chapter 4: SYSTEM IMPLEMENTATION

        4.1 Technical Information
        4.2 System Structure

Chapter 5: CONCLUSION AND DISCUSSION

    1. List of Accomplished Work
    2. Strength and Weakness
    3. Future Work

## 1️⃣ INTRODUCTION

### 🩸 1. Motivation

The number of blood donation programs in Vietnam has increased
considerably in recent years, resulting in a significant rise in
the volume of blood donated and more lives saved. On the other hand,
the link between the donation clinic and the donors is insufficiently built and maintained.

When a donor comes to a donation center to give blood, they must first register, submit personal information and medical history, undergo a brief physical examination, and blood test tubes are taken for testing. If their health meets certain criteria, blood will be taken and given to a blood bank. After the donation, the donor will receive a certificate for their generosity. The information about the donation will then be entered into a database at the processing facility, and the majority of given blood will be divided into transfusable components: red cells, platelets, and plasma. The test tubes will be examined at a testing facility in tandem with this process to determine the blood type and screen for infectious illnesses. The contribution will be rejected if the test result is positive, and the donor will be notified. The blood will be preserved and distributed to the hospital when these tests are completed. This kind of contribution, however, is inefficient and unproductive.

To begin with, donor information was not saved in order to be utilized for future donations. Donors must fill out a form every time they give at a donation facility, and their blood will be checked for blood type again. As a result of the duplicate and fragmented information contained in the database, this superfluous repetition is time consuming and labor expensive.

Secondly, donation time was not adequately managed since it is labeled only on the certificate. Therefore, the facility is not able to handle the period between two consecutive donations, that this period has met the minimum time requirement between two donations.

Third, donors should have information regarding donation, donors' health, and what occurred with given blood from a reliable, consistent, and comprehensive website, not simply a poster. However, the present method provided little and inconsistent information or answers to frequently asked queries concerning blood donation. As a result, the program will have a difficult time attracting new contributors, and existing donors will be less likely to give again.

Therefore, we aim to build a website for the donation clinic in order to enhance the donor-clinic relationship and attract more new potential donors.

### 📢 2. Problems Statement

The goal of this website is to improve the donor-clinic interaction by providing a trustworthy information platform for donors to look up and follow their blood donation history. The website will provide all pertinent information as well as commonly asked questions regarding the blood donation process. The donor will be provided an account via which they may track their medical status, blood type, and donation time. They may schedule a donation day with the clinic, and they will receive reminders about health care and the required recuperation period before the next donation. The donor may get information on all blood donation drives, allowing them to avoid having to go to a facility to donate blood and instead donate at a campaign closer to their home.

The website also assists the donation center in storing donor information, allowing them to skip some steps in the blood donation process, such as filling out a personal information form. When the donor arrives at the clinic, they will just need to supply some basic information in order to update their medical records.
The hospital can use the website to contact the blood donation clinic to confirm the amount of each blood type needed and place an order with the blood bank.

Furthermore, the main page of the website may advertise the blood group that is needed or insufficient in order to solicit donations (in a circumstance like this, a website will be more useful than a conventional appeal for donation).

### 📏 3. Scope

The webpage is based on references from the American Red Cross and the Australian Red Cross blood donation processes.

## 2️⃣ LITERATURE REVIEW

### 📱 1. Similar Applications/Systems

The blood donation, processing, testing, store and distribution processes are referenced from Blood Services of American Red Cross 1881, United States, accessed 1 June 2022, [Link](https://www.redcrossblood.org/donate-blood/blood-donation-process/what-happens-to-donated-blood.html).

The website is similar to the Blood Services website of American Red Cross 1881, United States, accessed 1 June 2022, [Link](https://www.redcrossblood.org/).

### 💼 2. Platform and Tools Review

The Blood Services website of American Red Cross has 3 sections on the navigation bar: Donated Blood, Hosting a Blood Drive and Biomedical Services. Each of them provides the links to information pages or the forms for users to perform their roles on the system.

Donors may manage their donations, book an appointment, manage an existing appointment, examine donation history, read donation information, and access other health resources through the website.

Blood program leader can apply to host a blood life, add blood campaign and find the frequently asked questions about hosting.

In addition to order services for hospitals, the American Red Cross offers blood tests, cell/gene therapy, and other services.

## 3️⃣ System Requirement Specification

### 🔧 1. System Requirement Specification

#### 1.1 System Requirement Specification

#### 🙋 _Donnor_

##### ✔️ Create an account

- A person can register as a system donor by creating an account.
- The account initially just contains the donor's personal information, such as name, SSN, gender, birthdate, phone number, email, and address.
- BloodLife employees will save and update other information about the donor's health and blood (e.g., blood group, medical condition) every time the donor visits the donation facility.

##### ✔️ Schedule an appointment

- A donor can make an appointment with the facility and come to give blood at that time.

##### ✔️ View the donation history

- BloodLife personnel will enter donation information into a database after the donation, allowing the donor to trace their contribution history.

##### ✔️ View/Modify personal information

- The donor can view and modify their personal information, but not the medical information. The staff will be in charge of this field.

#### 🏥 _Hospital_

##### ✔️ Order blood stocks

- Hospital can order blood stocks on the website.
- Blood stocks are classified by product types (i.e., red blood cells, platelets, plasma and whole blood), blood group (i.e., A+, A-, B+, B-, O+, O-, AB+ and AB-) and transfusable volume (i.e., 200, 300, 350 and 500mL).
- For any special orders, the hospitals need to contact directly with the facility.

##### ✔️ View ordering history

- Hospital can view their ordering history.

#### 👩‍⚕️ _BloodLife staff_

##### ✔️ Update blood stocks in blood bank

- If a blood supply passes all of the necessary testing, it will be kept and distributed to hospitals. At that time, the personnel will be in charge of entering the blood stock information into the database for hospital blood searches on the website.

##### ✔️ Update blood group and medical history of donors

- The team is responsible for storing the blood group and medical status of donors once they have been tested for blood type and infectious illnesses.
- If any blood stocks are found to be ineligible for transfusion, they will be destroyed, the donor will be told, and the donor's record will be marked as “cannot donate”

#### 👨‍💼 _Blood Drive Leader_

##### ✔️ Assign a blood donation campaign

- Blood Drive Leader may organize a blood drive and work with BloodLife to process, test, and store donated blood.
- Furthermore, rather of constantly going to the facility to donate blood, donors may obtain campaign information on the website and go to a campaign near them.

##### ✔️ Manage the donation campaigns

- Blood Drive Leader can open and close the campaign on the website.

#### 1.2 Requirements Analysis

- The requirements are well-written and include enough information to allow for the creation of a product design. Furthermore, the relevance of functionalities is used to prioritize the requirements.
- The product sure to determine the reliability and simplicity of use that the website will offer.

_Flowchart of the website implementation process:_

![Summary](https://i.imgur.com/msF1nAD.png)

#### 1.3 Non-functional Requirements

#### 🛡️ Security

- To prevent data loss and ensure data security, all private information pertaining to donors, hospitals, and blood drive leaders, as well as donation and ordering information, is preserved systematically in the database.
- The website is authorized for 4 users, so the important information of 1 user cannot be seen by the others.

#### 🛠️ Maintainability

- The website is regularly updated, tested, and mended in order to reduce mistakes, improve speed, and adapt to new environments.

#### 🔰 Reliability

- The website is guaranteed to be 95 percent reliable for a month, which indicates that there is a 95 percent possibility that the system will not encounter significant failure during that month under typical usage conditions.
- The trusted sources supply and validate all information on blood donation and health care (i.e., American Red Cross and Australian Red Cross)

#### 🌐 Usability

- The interface is user-friendly and navigable; buttons, headings and messages are simple to understand.

#### 📈 Performance and Scalability

- In most cases, the system returns findings in less than 0.5 seconds. With increased traffic, the website has been guaranteed to produce results in less than two seconds.

### 🔩 2. System Requirement Specification

#### 2.1 Use-cases Diagram

_Summary Goal Use Case:_

![Summary](https://i.imgur.com/W0s2NwD.png)

_Summary Goal Use Case:_

- Blood Donation Process:

![Donation](https://i.imgur.com/MUVhfZ9.png)

- Blood Processing Process:

![Processing](https://i.imgur.com/KtOOLNl.png)

- Blood Distribution Process:

![Distribution](https://i.imgur.com/ofO9DBK.png)

#### 2.2 Sequence Diagram

🙋 _Donnor_

- Create an account:
  ![Distribution](https://i.imgur.com/kT8VxJl.png)

- Schedule an appointment:
  ![Distribution](https://i.imgur.com/RmxdczW.png)

- View the donation history:
  ![Distribution](https://i.imgur.com/mJu7JI2.png)

- View/Modify personal information:
  ![Distribution](https://i.imgur.com/clNRjY3.png)

🏥 _Hospital_

- Order blood stocks:
  ![Distribution](https://i.imgur.com/sS5qVWw.png)

- View ordering history:
  ![Distribution](https://i.imgur.com/z6eegex.png)

👩‍⚕️ _BloodLife staff_

- Update blood stocks in blood bank:
  ![Distribution](https://i.imgur.com/h3x1aGk.png)

- Update blood group and medical history of donors:
  ![Distribution](https://i.imgur.com/H365rHM.png)

👨‍💼 _Blood Drive Leader_

- Assign a blood donation campaign:
  ![Distribution](https://i.imgur.com/OYUZ0Np.png)

- Manage the donation campaigns:
  ![Distribution](https://i.imgur.com/4HUFxjs.png)

#### 2.3 Activity Diagram

![Distribution](https://i.imgur.com/RlL0puX.png)

#### 2.3 Class Diagram

![Distribution](https://i.imgur.com/SX34Iew.png)

## 4️⃣ SYSTEM IMPLEMENTATION

### 💻 4.1 Technical Information

#### 4.1.1 System and Software Design

A variant of the "waterfall" paradigm was used to create the system. The waterfall methodology is the most basic and oldest of the structured SDLC approaches. Complete one phase before moving on to the next. There's no turning back now. Each step builds on the preceding stage's knowledge and has its own project plan. Waterfalls are straightforward to comprehend and maintain.

⭕The following are the steps in the Waterfall model:

- Gathering and analyzing requirements: During this phase, all feasible needs for the system to be developed are gathered and recorded in a requirement specification document.
- System Design: During this phase, the required requirements from the primary phase are examined, and the system design is completed. This approach design aids in designing the system architecture as well as describing hardware and system requirements.
- Implementation: The system is first created in small programs called units, which are then incorporated into the next steps, using inputs from the system design. Unit testing is the process of developing and testing each unit for its functioning.
- Integration and Testing: After each unit has been tested, all of the units generated during the implementation phase are combined into a system. Following integration, the entire system is tested for errors and failures.
- The goods is deployed into the client environment or launched into the market when the functional and non-functional testing is completed.
- Maintenance: There are several difficulties that arise in the client environment. Patches are published to fix the problems. In addition, improved versions of the items are created to support the merchandise. Maintenance has been completed in order to bring these modifications to the customer's environment. 12 In our projects, we've discovered that the wants that arise during the project should be well anticipated ahead of time. As a result, we chose this approach to complete each assignment step by step.

🔐 Program Reliability

- The dependability of a system is critical to the user experience and, more importantly, the project's viability.
- The issue of information security and accuracy is given great emphasis in this project. Only those who are linked to us and work with us (excluding Donors) are allowed to enter into the system using the account we give. As a result, the chance of blood bags not arriving where they are needed can be reduced.

🔁 Software Reuse

- Project interoperability across many devices and system reuse become easier with the introduction of new technologies.

#### 4.1.2 Design Decisions

**Why a Website?**

Our system is primarily designed for the delivery of blood to hospitals and for hospitals to order blood using software on mobile phones, which can make it difficult for hospitals to discover blood or order blood, as well as the majority of illnesses. A computer is now in every hospital. Inexperienced users will find it simpler to utilize the website platform since it is incredibly user-friendly and accessible to a large number of individuals. Because of the vast display space of the web page, it is easier for event partners and personnel to submit data.

![portfolio](https://camo.githubusercontent.com/f6b246bbb9287f4622f018f0a3fef2f3cc48634f04b43bfeb63f79ef3b635780/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533442e7376673f7374796c653d666c61742d737175617265266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)

- Nodejs is an independent development platform (Platform) based on the V8 JavaScript Engine - a JavaScript interpreter that allows you to create online applications such as video clips, forums, and most notably, a narrow social networking site that extends rapidly and easily.

**Benefits of Nodejs**

- Node.js is based on the Google V8 JS engine, which translates Javascript code into machine code. This improves the frame's resource efficiency while also enhancing the frame's speed. In truth, Google puts a lot of money into its search engine to keep it running smoothly.

- The fact that node js comes with a plethora of tools and modules for building web apps that decrease mistakes and the size of your web project by using reusable templates. Aids in the reduction of product development time.

- Simple, free-form programming languages for developing applications across different platforms and without constraints

**Embedded JavaScript Technologies (EJS)**

- Express.js (or just Express) is a NodeJS Web Application Framework. For online and mobile apps, it offers a robust feature set. EJS stands for "Embedded JavaScript templating," and it's a library that parses ejs files and generates HTML for the client to see (Browser).

![portfolio](https://camo.githubusercontent.com/e1840b4e176feb06e47500d5d74d65041ac3f193192174097956f2bea2ceea5f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4d7953514c2d4632393131313f7374796c653d666c61742d737175617265266c6f676f3d4d7953514c266c6f676f436f6c6f723d7768697465)

- MySQL is an open source relational database management system (RDBMS) that works in a client-server architecture. Relational Database Management System (RDBMS) is an acronym for Relational Database Management System. MySQL, Apache, and PHP are all interwoven. MySQL uses databases to handle data. Many relational tables holding data may be found in a database. The SQL language has the same access and code as MySQL.

**Mysql benefits**

- Ease of Use: MySQL is a high-performance, reliable, easy-to-use, cross-platform database with a wide collection of extremely useful utility functions.
- High security: MySQL is ideally suited for applications that require access to databases on the Internet while also providing a high level of security.
- MySQL supports a wide range of SQL functions, both directly and indirectly, as one would expect from a relational database management system.
- MySQL is scalable and strong, with the ability to manage a large amount of data and the ability to be extended if necessary.
- Fast: The adoption of various standards allows MySQL to operate at a high level of efficiency and cost-effectiveness, resulting in faster execution.

**Mysql - the Downside**

- Restrictions: MySQL isn't meant to be a one-size-fits-all solution, and it has certain limitations in terms of what an application can accomplish with it.
- MySQL's handling of certain functions (e.g. references, transactions, audits, and so on) makes it less trustworthy than some DBMSs. other connection.
- Capacity constraints: If the amount of entries in your database grows, it will become increasingly difficult to retrieve your data; in this case, we will need to take a variety of methods to speed up data retrieval, such as load-sharing the database over many servers or setting up a MySQL cache.

### 📋 4.2 System Structure

**The system consists of the following components:**

**The system includes:**

- index.js system initialization directory (contains links to import libraries from node_modules )

- node_modules directory (node ​​js system directory containing library and module files)

- configs folder contains protection files, database connection

- the controller folder is used to link to get data from the database displayed on the user's screen and receive the user's information entered into the database.

- The Router folder contains the urls of the website

- view folder contains ejs files to display custom website and user's login account public folder contains image and css files to display in the file ejs

## 5️⃣ CONCLUSION AND DISCUSSION

### 📑 1. List of Accomplished Work

- The home page is the initial page that all users in the system see. The page includes information on the service, system convenience, contact information, blood donation events, and a login link.

- Users can log into the system via the login page. After entering their username and password, the user chooses a role (validate login information). The related home page will display after the information has been verified.

- Registration Website: This page allows donors to create a account before giving blood.

- Forgot Password Page: This page allows donors to retrieve their account password using the previously registered gmail address.

- Staff page: The Staff page has two major tasks, one of which is to add the quantity of blood bags to the bank. The second step is to make changes to the donor's information (blood type, blood donation status and medical record).

- Donor Information Page: The donor may examine and update their personal information, as well as check their blood donation history and total donation amount.

- Hospital Page: If the hospital specifies the kind of blood and volume required, the system will filter and search the blood bank before informing the hospital of the findings. The hospital has the ability to request blood and analyze the history of previous orders.

- Campaign Event Page: Organizers can work with the system to post and maintain information on the campaign event page's home page.

- Nutrition Page: A page that answers and gives basic information on the procedure of blood donation (What we should do before and after donating blood.)

### 💡 2. Strength and Weakness

#### Strength

- We will receive a paper with the amount of donated blood every time we donate blood at a certain location, but the time is too long, making it impossible to preserve. Furthermore, reviewing it would take too much time. So the system's first strength is the sensible storing and presentation of donor information; donors can quickly view their blood donation information, what blood components they've provided, and the amount of donated.

- The Hospital saves time by not having to call blood banks to get blood thanks to the simple search for blood information and amount. Above all, the technology assists the hospital in managing the blood bags that have been ordered, reducing the number of mistakes.

- The Bloodlife system also enables easy access to information on local blood donation events, making it easier for donors to understand.

#### Weakness

- When it comes to blood ordering, the hospital may only order blood for each individual blood bag. The transfusion process is difficult for each patient since blood must be transfused according to the volume of each occurrence.

- At this point, the system is unable to detect and remove expired blood packs, as well as correctly manage the expiry time of each blood pack.

- Because there is only one blood bank to keep all of the system's blood, transporting it to distant hospitals is expensive and risky.

### 🚀 3. Future Work

- Blood distribution to remote hospitals is challenging due to the fact that there is only one blood bank. As a result, we will work to establish more blood banks in the future so that blood may be distributed more easily to a wider range of locations.

- At the moment, we can only verify blood's expiration date; we can't automatically remove blood from blood banks or blood banks.

## Run Locally

Clone the project

```bash
  git clone https://github.com/KIddoKg/BloodLife.git
```

Connect to database with Mysql

```bash
  webdatabase
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## 🏆 NoHope Team

- Trần Thị Huỳnh Như - ITITIU19174
- Đỗ Hoàng Nhung - ITITIU19176
- Nguyễn Quốc Bảo - ITITIU19081
