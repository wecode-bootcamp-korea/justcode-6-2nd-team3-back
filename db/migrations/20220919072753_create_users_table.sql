-- migrate:up
CREATE TABLE users (
unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(300) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
user_name VARCHAR(50),
nickname VARCHAR(50),
profile_image VARCHAR(3000),
user_type TINYINT,   
create_at DATETIME DEFAULT NOW(),
update_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users;