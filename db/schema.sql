CREATE TABLE users (
  id SERIAL PRIMARY KEY,         
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  name VARCHAR(100) NOT NULL,     
  id_number VARCHAR(50)           
);

 
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id), 
  course VARCHAR(100) NOT NULL,   
  score INTEGER NOT NULL,        
  date DATE DEFAULT CURRENT_DATE  
);