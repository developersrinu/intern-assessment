Repository Viewer
This repository contains a simple web application for viewing repositories based on the provided design. The application is built using HTML, CSS, and JavaScript. It incorporates server-side pagination, loading indicators during API calls, and an optional search bar for repository filtering.
hosted link:  https://intern-assessment-chi.vercel.app/
Features
Server-side Pagination:

By default, the application displays 10 repositories per page.
Users have the option to choose up to 100 repositories per page.
Loading Indicators:

Loading spinners are displayed when API calls are in progress, providing visual feedback to users.
Search Bar:

An optional search bar allows users to filter repositories based on their preferences.
Assumptions
The application is built using HTML, CSS, and JavaScript.
Bootstrap and jQuery are allowed for use, but no other library or design system should be used.
The design provided is for representation purposes only, and modifications are allowed as long as all specified functionalities are retained.
All edge cases, such as empty or erroneous API responses, are considered and appropriately handled.
Getting Started
To run the application, simply open the index.html file in a web browser.

How to Use
Use the pagination controls at the bottom of the page to navigate through the repositories.
Adjust the repositories per page using the dropdown menu.
Enter search queries in the search bar to filter repositories based on the provided topics.
Folder Structure
css/: Contains the stylesheets.
js/: Contains the JavaScript files.
index.html: The main HTML file for the application.
API Integration
The application relies on external APIs to fetch repository data. Ensure a stable internet connection for proper functionality.
