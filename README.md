# Blogging App

![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)

## Description

This is a full-stack blogging application built using Node.js, Express, Passport, MongoDB, React, Redux, HTML, and SASS. The application allows users to create and edit blogs, create and edit personal accounts, and interact with blogs through commenting and liking functionality.

## Technologies

- **Backend:** Node.js, Express, Passport, MongoDB
- **Frontend:** React, Redux, HTML, SASS
- **Authentication:** Passport (Local, Facebook, GitHub, Google, Twitter)
- **Database:** MongoDB with Mongoose

## Features

- **User Authentication:** Users can sign up, log in, and manage their accounts.
- **Blog Management:** Users can create, edit, and delete their blogs.
- **Interaction:** Users can comment on and like blogs.
- **Responsive Design:** The application is designed to be responsive and work well on various devices.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/OxiBo/dev-blog-app.git
   cd dev-blog-app
2. **Install dependencies:**

    ```sh
    npm install 
    cd client
    npm install
    cd ..
    ```
    
 3. **Set up environment variables:**

   Create two files in the `/config` folder: `dev.js` and `prod.js`. These files should contain the necessary environment variables for development and production environments, respectively.

   Example `dev.js`:
   ```js
   // dev.js - Don't commit this
   module.exports = {
       googleClientID: 'your_google_client_id_here',
       googleClientSecret: 'your_google_client_secret_here',
       githubClientId: 'your_github_client_id_here',
       githubClientSecret: 'your_github_client_secret_here',
       twitterConsumerKey: 'your_twitter_consumer_key_here',
       twitterConsumerSecret: 'your_twitter_consumer_secret_here',
       mongoURI: 'your_mongodb_connection_string_here',
       cookieKey: 'your_cookie_key_here'
   };
   ```
   Additionally, create a keys.js file in the /config folder to determine which set of credentials to use based on the environment:
```js
   if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./prod");
} else {
  // we are in development
  module.exports = require("./dev");
}
```

4. **Run the application:**

```sh
    npm run dev
```

The application should now be running on `http://localhost:3000`.


---

© 2019 OxiBo. All rights reserved.
