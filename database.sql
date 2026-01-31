CREATE TABLE whitelists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ucp VARCHAR(25) UNIQUE,
  nickadmin VARCHAR(25) DEFAULT 'System',
  adutyname VARCHAR(25) DEFAULT 'System',
  verify INT DEFAULT 1,
  recovery INT DEFAULT -1,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  discordid VARCHAR(31),
  allowed TINYINT(3) UNSIGNED DEFAULT 1
);
