# 🧳 JobbyApp

A responsive job portal web app built with **React**, **React Router**, and **styled-components**. It allows users to authenticate, browse job listings, view detailed job info, and filter results by employment type and salary range.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Styled Components](https://img.shields.io/badge/Styled--Components-5.3.6-pink?logo=styled-components)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- 🔐 **Login Authentication** using JWT
- 🔒 **Protected Routes** (only accessible when logged in)
- 🧭 **Routing with React Router**
- 📋 **Job Listings** from API
- 📄 **Job Detail View**
- 🎯 **Filter by Employment Types & Salary Ranges**
- 💅 **Responsive UI** using styled-components

## 🛠️ Technologies Used

| Tool             | Description                                |
|------------------|--------------------------------------------|
| React            | Front-end library                          |
| React Router     | Client-side routing                        |
| Styled-Components| Styling with scoped CSS                    |
| JWT              | Token-based user authentication            |
| REST API         | Data fetched from mock/real job listings   |

## 📂 Project Structure (Simplified)

```
src/
├── components/       # Reusable React components (Header, JobCard, etc.)
├── App.css           # Global styling
├── App.js            # Main app component and routing logic
├── index.js          # App entry point
└── setupTests.js     # Jest setup (for test configurations)
```


## ⚙️ Setup Instructions

```bash
https://github.com/Unni8230/Job_Portal.git
cd jobbyApp
npm install
npm start
```

> 📝 **Note**: If you're using Node.js 17+, you may need to run:
> ```bash
> export NODE_OPTIONS=--openssl-legacy-provider
> ```

## ✅ Authentication Flow

- Users log in using valid credentials
- JWT stored securely (cookie/localStorage)
- Routes like `/jobs` and `/jobs/:id` protected using a custom `ProtectedRoute` component
- Unauthenticated users are redirected to the login page

## 🙌 Credits

This project is part of my learning journey in full-stack development, focusing on **React**, **Routing**, and component architecture. Crafted with ❤️ and a lot of debugging.

