CREATE DATABASE IF NOT EXISTS ubsa_db;
USE ubsa_db;

-- 1. Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50),
    location VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255), 
    type ENUM('upcoming', 'past') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    src TEXT NOT NULL, 
    caption VARCHAR(255),
    category VARCHAR(50) DEFAULT 'Community',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Public Sponsors Table (What is shown on the website)
CREATE TABLE IF NOT EXISTS sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tier ENUM('Platinum', 'Gold', 'Silver', 'Bronze') NOT NULL,
    image_url VARCHAR(255), -- Keep this consistent with your getImageUrl helper
    contribution VARCHAR(255),
    description TEXT,
    discount_title VARCHAR(255),
    discount_desc TEXT,
    website_url VARCHAR(255)
);

-- 4. Executives Table
CREATE TABLE IF NOT EXISTS executives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    email VARCHAR(255),
    display_order INT DEFAULT 0
);

-- ==========================================
-- NEW TABLES FOR USER SUBMISSIONS
-- ==========================================

-- 5. Membership Table (Data from /join page)
CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    student_id VARCHAR(50) NOT NULL,
    department VARCHAR(150),
    status ENUM('Pending', 'Paid', 'Expired') DEFAULT 'Pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Sponsor Applications Table (Data from Sponsor Modal)
CREATE TABLE IF NOT EXISTS sponsor_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tier ENUM('Silver', 'Gold', 'Platinum') NOT NULL,
    payment_type ENUM('E-Transfer', 'Cheque') NOT NULL,
    status ENUM('Pending', 'Reviewed', 'Approved', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);