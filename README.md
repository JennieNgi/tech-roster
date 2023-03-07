<img width="748" alt="tech-roster" src="https://user-images.githubusercontent.com/75710628/223285930-f8ff5c8b-314f-4aeb-a650-a6719af4ba2d.png">

# Tech Roster Administration App
This is a full-stack web application that allows the user to add, edit, and delete technologies and courses in the Tech Roster's MongoDB database. It has been built using Node.js, Express, MongoDB, and React with Tailwind CSS for styling.

## Client-Side Features
The Tech Roster Administration App provides the following features:
- Add, edit, and delete technologies and courses in the Tech Roster's MongoDB database.
- View a list of all technologies and courses, with buttons to edit or delete each item.
- Add a new technology with inputs for name, description, difficulty, and checkboxes to select which courses use the technology.
- Edit an existing technology with the same inputs as the new technology page, pre-populated with the selected technology's details.
- Delete a technology with a warning message.
- Add a new course with inputs for course code and name.
- Edit an existing course with inputs for course name, with the course code displayed but greyed out.
- Delete a course with a warning message.
- Routed components, with each page as a separate route.
- Loading screen with an animated spinner while data is being fetched from the server.
- Responsive design using Tailwind CSS.


## Web API Features
The application uses a Web API to interact with the MongoDB database. The API provides the following endpoints:
- GET /api/techroster - Returns all technologies and courses as a JSON object.
- POST /api/techroster/technologies - Adds a new technology to the database.
- PUT /api/techroster/technologies/:id - Updates an existing technology in the database.
- DELETE /api/techroster/technologies/:id - Deletes a technology from the database.
- POST /api/techroster/courses - Adds a new course to the database.
- PUT /api/techroster/courses/:id - Updates an existing course in the database.
- DELETE /api/techroster/courses/:id - Deletes a course from the database.

## Author
Jenny Ngi
