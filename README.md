# Tech Roster Web Application
This web application is designed to display a list of important links for easy access. It includes a public end for displaying all the links and an administration end for modifying the link content.

## Features
### Public End
The public end is made up of four categories of links displayed in four columns. Each column has a category title at the top. Each column is made up of several links, each with their favicon displayed. The links in the column are in alphabetical order. At the top of each column, there are a handful of links that are above a line (or equivalent). These links are “pinned” to the top of the list and are also in alphabetical order. If no links are pinned, then no line is displayed. Clicking a link should open the website in a new browser window (tab). The web page must be responsive using bootstrap.

### Administration End
The administration end must be accessed through a login that uses a hashed and salted password stored in a database table. After 18 minutes of no post-backs, a warning message must be displayed to the user that they are about to be logged out – and then at 20 minutes the user must be automatically logged out. The admin end page must look the same as the public end with the inclusion of:

- Add Link and Edit Category buttons beside each category title (top of each column)
- Edit Link and Delete Link buttons beside each link
- When the user clicks on an Edit Category button, a form is displayed to change the category name
- When the user clicks on an Add Link button, a form is displayed to enter the label, URL, pinned option of the new link. The category is displayed but is not changeable since it is already determined by which Add Link button was clicked.
- When the user clicks on an Edit Link button, a form is displayed to change the link’s existing category (from a dropdown), label, URL, and pinned option.
- When the user clicks on a Delete Link button, a form is displayed to delete the link or not by clicking a button

## Requirements
- .NET 5.0 SDK
- MySQL database
- Docker (for running the MySQL database in a container)

## Installation and Usage
- Clone this repository: git clone https://github.com/your-username/tech-roster
- Change to the project directory: cd tech-roster
- Run the docker: docker-compose up
- Run the application: dotnet run start


## Author
This application was created by Jenny Ngi
