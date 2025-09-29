### This is a very simple Golf handicap calcuator. User can create Account, Add in scores and recive there average score and view old scores.

### Architecture
golf-handicap-calculator
├── web-server/  Frontend (Nginx + HTML/CSS/JS)
├── src/ Backend (Node.js + Express)
│ ├── routes/  API endpoints
│ ├── dao/  Data access objects
│ └── domain/  Business models
└── db/ Database schema and setup


### Prerequisites
- Docker Toolbox (for older macOS) or Docker Desktop
- Git

### Installation & Running

 Clone the repository
   git clone <your-repo-url>
   cd golf-handicap-calculator
Start the application

docker-compose up -d

### Access the application
http://192.168.99.100/