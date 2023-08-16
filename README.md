# Chatter

A chatting app named Chatter.

### Introduction 
This is the front end of the Chatter App. This provides an interactive and eye-catching UI for the users. The Landing Page of the app is the following: 
![Landing Page](https://github.com/aniketmu/final-project-frontend/assets/135434733/666d2ac2-8da0-4cff-bb1b-0df7282829a7)
The Sign Up page looks like the following : 
![Sign Up](https://github.com/aniketmu/final-project-frontend/assets/135434733/6f1e0f07-1d73-4252-8214-23e8a916fca7)
Users will not be allowed to sign up with an emaill that is already registered and will be alerted to enter a new one.
![registration](https://github.com/aniketmu/final-project-frontend/assets/135434733/15bae268-5574-40c8-8da1-e4202731aa54)

The Sign In page loooks like the following: 
![Sing In](https://github.com/aniketmu/final-project-frontend/assets/135434733/3787fefd-3eaf-4896-83e5-6e6b23e17fbe)
If the user attempts to sign in using an unregistered email, alert will we shown for email not found and similarly is the password do not match
![sign in with credentials](https://github.com/aniketmu/final-project-frontend/assets/135434733/700143cc-fbfb-4541-b325-14668c37be3b)
Upon successful signign in, the user will be routed to the following dashboard page:
![dashboard](https://github.com/aniketmu/final-project-frontend/assets/135434733/29bc9dd1-13a2-405a-9c84-facabe926701)
The dashboard displays the user's name and the channels they are a part of. They will be able to add new channels by clicking the + button besides Channels
![adding channel](https://github.com/aniketmu/final-project-frontend/assets/135434733/d32ccb27-7d3a-4a0b-b4a3-6f1a306b4b7a)
After the Channel has been added, the Dashboard will display the added channel.
![dashboard with channels](https://github.com/aniketmu/final-project-frontend/assets/135434733/7323e429-c0ac-4884-a185-0e18157aa5bd)
Users will be able to add Members to the channel by clicking + button besides the channel name. It will open up a search box where the user will have to enter the email of the user they wish to add. As they type, matching emails will be shown below the searchbox and users can click on one of them to select and click on the invite button and the user will be added.
![adding members](https://github.com/aniketmu/final-project-frontend/assets/135434733/33c3d156-2e6d-41a3-819f-40d818f95946)
Upon clicking on a Channel, messages belonging to that channel will populate on the screen. Users can type in and send newer messages. 
![sending text 1](https://github.com/aniketmu/final-project-frontend/assets/135434733/6d530d4c-dad7-4335-b24d-f2b9d5b16720)
The sent message will be rendered on the screen real-time on other logged users as seen in the following dahboard of another logged in user:
![sending text 2](https://github.com/aniketmu/final-project-frontend/assets/135434733/bd40434b-9f3b-4a22-ba22-0c80274db2ad)
![sending text 3](https://github.com/aniketmu/final-project-frontend/assets/135434733/0258dced-e6a2-43cd-a9b1-1657b9b01d4b)
![sending text 4](https://github.com/aniketmu/final-project-frontend/assets/135434733/ebd056ff-ddc7-4424-985f-12d74e5e8483)
Users can visit their profile by clicking the Profile button on the Dashboard.
![profile](https://github.com/aniketmu/final-project-frontend/assets/135434733/b244ee28-bcb6-449b-ae5d-d750478de906)
Here they can choose to assign themselves an avatar(Due to time constraints the logic to store this profile Image change and persist the same could not be implemented).
Upon clicking the Sign Out button on the dashboard, the user will be logged out and taken to the Sign In page.

### Technologies Used

A list of technologies used within the project:

* [HTML](https://html.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React.JS](https://nodejs.org/en)
* [Redux](https://redux.js.org/)

## Installation

A little intro about the installation. 
```
$ git clone https://github.com/aniketmu/final-project-backend.git
$ cd /server
$ npm install
$ npm start

````
### Deployment 
The app has been deployed on [Netlify.com](https://64dbc23d9ab0da13ddb90c8f--stalwart-begonia-d763e3.netlify.app/)
