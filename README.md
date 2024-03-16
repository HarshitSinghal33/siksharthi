# Śikṣārthī

## Overview
"Siksharthi is a modern book reading app born out of a passion for reading and a frustration with traditional PDFs that often resulted in lost progress. As an avid reader myself, I understand the importance of seamless and immersive reading experiences. Siksharthi offers just that, allowing users to explore and enjoy a diverse library of books without the hassle of losing their progress. With Siksharthi, reading becomes a joyous journey, made convenient and enriching through intuitive features tailored to enhance the reading experience."


## Live Demo

Experience Śikṣārthī live! Click on the link below: [Śikṣārthī Live Demo](https://we-learn-read.web.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

- [Firebase Configuration](#firebase-configuration)
  - [Firebase setup and Story working](#firebase-setup-and-stories-feed-working)
  - [Firebase Rules](#Firebase-Rules)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Bookmark:** Bookmark feature allows users to mark their current reading position within a book, enabling them to easily resume reading from where they left off.

- **Dark Mode:** Dark Mode offers an alternative color scheme with darker tones, providing a visually comfortable reading experience in low-light environments and reducing eye strain.

- **Language Selector (Hindi and English):** Language Selector feature enables users to choose their preferred language for reading, supporting both Hindi and English languages to cater to a diverse user base.

- **Fontsize Selector:** Fontsize Selector empowers users to customize the text size of the book content according to their readability preferences and visual comfort.

- **Library Track Record:** Library Track Record feature keeps a comprehensive record of the books users have read, including the pages they've completed and their reading progress.


## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 8.19.2 or above)
- npm or yarn

### Installation

1. Clone the repository: `git clone https://github.com/HarshitSinghal33/siksharthi`
2. Navigate to the project directory: `cd Siksharthi`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm run dev` or `yarn dev`

## Usage

After setting up the project, visit the provided local server URL to explore the siksharthi application and can start reading life changing Novels.

## Firebase Configuration

To integrate Firebase with your project:

1. Set up a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Obtain your Firebase configuration details.
3. Replace the placeholder Firebase configuration in the project with your actual configuration.
4. Configure Firebase security rules by adding the following rules to your Firestore:

### Firebase Setup 
#### Two collection is firestore - 1: books and 2: users
![users collection](https://github.com/HarshitSinghal33/siksharthi/assets/124229061/ed62402f-2be4-421d-8770-8a5887a3f627)

![books collection](https://github.com/HarshitSinghal33/siksharthi/assets/124229061/4e9d310e-3fbb-4f53-8296-6ed37ae9e50b)

### Firestore Rules
The rule match /books/{bookID} make sure that any user can read it. match /pages/{pageDoc} make sure logined user can read the pages. while match /users/{userId} it check that only user can make changes in there Accounts.
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookID}{
    allow read;
    match /pages/{pageDoc}{
      allow read : if request.auth != null;
      }
    }
    match /users/{userId} {
     allow read, write: if request.auth != null && request.auth.uid == userId; // Allows access if authenticated user's UID matches userId
    }
  }
}
```
## Deployment

For deployment, follow these steps:

1. Build the project: `npm run build` or `yarn build`
2. Deploy the generated `dist` directory to your hosting platform of choice.

## Built With

- [Vite.js](https://vitejs.dev/) - A fast web development build tool.
- [Firebase](https://firebase.google.com/) - A comprehensive app development platform.

## Dependencies

The project relies on several key dependencies to enhance its functionality and development experience. Here are some of the most important ones:

### [Firebase](https://firebase.google.com/) (^10.5.2)

Firebase is a comprehensive app development platform that provides various services, including real-time databases and authentication. It plays a crucial role in enabling data storage and secure user authentication within our application.

### [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) (^3.39.3)
React Query is a versatile library for managing asynchronous data fetching and state management in React applications. It simplifies complex data fetching logic and provides a powerful caching mechanism for optimizing performance.

### [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) (^2.0.1)

Redux Toolkit is a powerful library that simplifies and streamlines Redux usage by providing utilities to reduce boilerplate code and manage state more efficiently. It plays a fundamental role in enabling robust state management within our React application.

### [React](https://reactjs.org/) (^18.2.0) and [React DOM](https://reactjs.org/docs/react-dom.html) (^18.2.0)

React is a powerful JavaScript library for building user interfaces, and React DOM is responsible for rendering React components in the browser. These libraries are the backbone of our front-end, facilitating the creation of interactive and dynamic user interfaces.

### [React Hook Form](https://react-hook-form.com/) (^7.47.0) and [@hookform/resolvers](https://react-hook-form.com/resolvers/yup) (^3.3.2)

React Hook Form is used for managing forms in React applications, providing efficient and flexible form handling. [@hookform/resolvers](https://react-hook-form.com/resolvers/yup) is a resolver for React Hook Form, and in combination with Yup (noted below), it helps validate and manage form data seamlessly.

### [Yup](https://github.com/jquense/yup) (^1.3.2)

Yup is a JavaScript schema builder for value parsing and validation. It's particularly useful in conjunction with React Hook Form to define and enforce validation rules for form fields.

These dependencies, along with others listed in the `package.json` file, contribute to the robustness and feature-rich nature of our project.

### [Tailwind CSS](https://tailwindcss.com/) (^3.4.1)
Tailwind CSS is a utility-first CSS framework that streamlines the process of styling web applications by providing a comprehensive set of pre-designed utility classes. It plays a pivotal role in enabling rapid and responsive UI development within our application.

### [Framer Motion](https://www.framer.com/motion/) (^10.17.9)
Framer Motion is a powerful animation library for React that simplifies the creation of fluid and interactive animations, adding polish and sophistication to user interfaces. It plays a pivotal role in page changing animation, enhancing user experience and engagement within our application.



### [React Toastify](https://www.npmjs.com/package/react-toastify)
React Toastify is a lightweight and customizable toast notification library for React applications. It enables developers to display informative and user-friendly notifications to users, enhancing the overall user experience and providing feedback on various events and actions within the application.

## Contributing

We welcome contributions! To get started, fork the repository, make your changes, and submit a pull request. 

## License

This project is licensed under the [MIT License](LICENSE.md).

