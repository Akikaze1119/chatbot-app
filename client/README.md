# Chatbot App

This project is a responsive chatbot application built using React, TailwindCSS. It allows users to interact with Gemini AI chatbot, simulating conversations with various types of messages. The app includes smooth animations, customizable components, and integrates various features like form submissions and chat history.

## Tech Stack

React: JavaScript library for building user interfaces.
TypeScript: Superset of JavaScript that adds static typing.
TailwindCSS: Utility-first CSS framework for rapidly building custom designs.
React Hook Form: Library for managing forms in React.
Framer Motion: Library for animations in React.:

##　 Folder Structure

```
├── dist
├── public
├── src
│   ├── backend             # Backend-related files
│   │   ├── controllers     # Request handlers for routes
│   │   ├── errors          # Custom error classes and handling
│   │   ├── models          # Database models or schemas
│   │   ├── routers         # API route definitions
│   │   ├── services        # Business logic and services
│   │   └── server.ts       # Entry point for the backend server
│   ├── components          # Reusable components like Button, ChatBox, etc.
│   ├── utils               # Utility functions like clsx-utils
│   ├── App.tsx             # Main app component
│   ├── index.tsx           # Entry point of the app
│   ├── styles              # Global styles
│   └── ...
├── README.md
├── package.json
└── tailwind.config.js
```

## Usage

Chatbox Animation: Click on the chat button at the bottom-right corner of the screen to open the chatbox. The chatbox will animate from the button's position.
Form Submission: Type your message and click submit to send it. The form uses react-hook-form for validation.
AI Response: The AI bot responds to the user's input in real-time.

### Customization

You can adjust the default history passed to the AI to support various contexts. This allows for customization tailored to specific scenarios.

### License

This project is licensed under the MIT License.
