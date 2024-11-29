## Therapist Dashboard Backend
## Controllers
authController.js: Handles authentication, including login and registration.
communicationController.js: Manages communication-related functionalities.
patientController.js: Handles patient data and interactions.
reportController.js: Manages reports related to patients or sessions.
sessionController.js: Deals with session management.
settingsController.js: Manages user or application settings.
therapistController.js: Handles functionalities related to therapists.
upload.js: Manages file uploads.
userController.js: Handles user-related functionalities.

## Middleware
authMiddleware.js: Contains middleware functions for authentication, such as verifying tokens and checking user roles.
errorMiddleware.js: Handles errors globally, catching exceptions and formatting responses.
loggerMiddleware.js: Responsible for logging request details and other pertinent information for debugging and monitoring.

## Models
Contact.js: Handles contact information related to patients or therapists.
Note.js: Stores notes associated with sessions or patients.
Patient.js: Contains the model for patient data, including personal details and medical history.
Report.js: Represents reports generated for patients or sessions.
Session.js: Defines the session model, including timestamps, participants, and notes.
User.js: Manages user data, including authentication information and roles.

## Routes
authRoutes.js: Handles authentication-related routes such as user login and registration.
communicationRoutes.js: Manages routes related to communication features, covering messaging or notification functionalities.
patientRoutes.js: Contains routes for managing patient information, including creating, updating, deleting, and retrieving patient records.
reportRoutes.js: Manages routes for generating and accessing reports related to patients or therapy sessions.
sessionRoutes.js: Handles routes for managing therapy sessions, including scheduling and retrieving session details.
settingsRoutes.js: Manages user settings or application configurations, allowing updates and retrieval of user preferences.
therapistRoutes.js: Contains routes for managing therapist information, including adding and retrieving therapist profiles.
upload.js: Handles file upload routes for documents, images, or other files related to patients or sessions.
userRoutes.js: Manages routes related to user profiles, including creation, retrieval, updating, and deletion of user accounts.

## Tests
auth.test.js: Contains unit and integration tests for the authentication functionality, verifying that login, registration, and token management work as expected.
communicationController.test.js: Tests the communication-related functionalities, ensuring that messaging or notifications work correctly.
patientController.test.js: Tests the functionality of the patient controller, validating the CRUD operations related to patient records and ensuring data integrity.
reportController.test.js: Contains tests for the report generation and retrieval functionalities, ensuring that reports can be created and accessed accurately.
sessionController.test.js: Tests the session management functionalities, including the scheduling and details of therapy sessions, ensuring they behave as expected.
settingsController.test.js: Tests the settings management functionalities, validating that user preferences can be correctly updated and retrieved.
user.test.js: Contains tests for user-related functionalities, covering operations like user profile creation, updates, deletions, and retrievals.

## Utils
constants.js: Contains constant values used throughout the application, such as configuration settings and API response messages.
helpers.js: Includes utility functions that provide common functionality used across different modules, streamlining code for data manipulation and formatting.
logger.js: Responsible for logging messages and errors throughout the application, including configurations for logging levels and output methods.
validation.js: Contains validation logic for incoming requests, defining validation schemas or rules for various data inputs to ensure that only valid data is processed.

## Views
feedbackForm.html: Contains the HTML structure for a feedback form, allowing users (clients or therapists) to submit feedback regarding the services provided.
userProfile.html: Represents the user profile page, displaying user-specific information, session history, feedback provided, and options to update their profile or settings.

## APIS
