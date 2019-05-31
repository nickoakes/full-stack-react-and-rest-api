# full-stack-react-and-rest-api
A full-stack application which enables users to create, read, update and delete course listings for an educational provider. 

The REST API for the back end was built using Express and Sequelize, while the front end was built using React.

Users who are not signed in can view course listings and details, but authentication and private routes prohibit them from creating or updating courses.

Validation is carried out server-side when creating a new user or course, and validation messages sent by the REST API are displayed when a POST or PUT request is unsuccessful.

When a non-authenticated user attempts to create a new course, they are redirected to the sign in component. Upon signing in, they are redirected back to their origin.

Attempted navigation to a non-existent route leads the user to a stateless, functional 'not found' component.

Attempts to update a course which was not created by the current user leads them to a stateless, functional 'forbidden' component.

Server errors are handled by a stateless, functional 'unhandled error' component.
