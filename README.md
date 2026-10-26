# Mega Blog

A full-stack blogging application built with **React**, **Vite**, and **Appwrite**. Users can sign up, write rich-text posts, upload cover images, and manage their own content.

> Built as the capstone project of the **"React with Chai"** series by [Hitesh Choudhary](https://github.com/hiteshchoudhary) (*Chai aur Code*), with my own implementation and customizations.

**Live Demo:** <your-deployed-link>
**Repository:** <your-repository-url>

---

## Screenshots

| Home | Post Editor |
|------|-------------|
| ![Home](./screenshots/home.png) | ![Editor](./screenshots/editor.png) |

---

## Features

- **Authentication:** Signup, login, logout, and persistent sessions via Appwrite Auth.
- **Post CRUD:** Create, read, update, and delete blog posts.
- **Image Upload:** Featured image upload and preview using Appwrite Storage buckets.
- **Rich Text Editor:** TinyMCE-powered WYSIWYG editor for formatted content.
- **Authorization:** Edit and delete controls are shown only to the post's author.
- **Auto Slug Generation:** URL-friendly slugs generated from the post title.
- **Post Status:** Posts can be marked active or inactive.
- **Responsive UI:** Built with Tailwind CSS for mobile, tablet, and desktop.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React, Vite |
| Routing | React Router DOM |
| State Management | Redux Toolkit, React Redux |
| Backend (BaaS) | Appwrite (Auth, Database, Storage) |
| Forms | React Hook Form |
| Rich Text Editor | TinyMCE (`@tinymce/tinymce-react`) |
| HTML Parsing | html-react-parser |
| Styling | Tailwind CSS |

---

## Project Structure

```
src/
├── appwrite/      # Appwrite service classes (auth, database, storage)
├── components/    # Reusable UI components (Header, PostCard, RTE, PostForm...)
├── conf/          # Environment variable config
├── pages/         # Route pages (Home, AllPosts, AddPost, EditPost, Post...)
├── store/         # Redux store and auth slice
├── App.jsx
└── main.jsx
```

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher)
- A free [Appwrite Cloud](https://cloud.appwrite.io) account
- A free [TinyMCE](https://www.tiny.cloud) API key

### 2. Clone and Install
```bash
git clone <your-repository-url>
cd <your-project-folder-name>
npm install
```

### 3. Appwrite Setup
1. Create a new **Project** in Appwrite.
2. Add a **Web platform** with `localhost` as the hostname.
3. Create a **Database** and a **Collection** with these attributes:

| Attribute | Type | Required |
|-----------|------|----------|
| `title` | String | Yes |
| `content` | String (large) | Yes |
| `featuredImage` | String | Yes |
| `status` | String | Yes |
| `userId` | String | Yes |

4. Set collection permissions so that users can create, read, update, and delete documents.
5. Create a **Storage Bucket** with the same permissions.
6. Use the post **slug as the document ID** when creating documents.

### 4. Environment Variables
Create a `.env` file in the project root:

```env
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
VITE_TINYMCE_API_KEY="your_tinymce_api_key"
```

> **Warning:** Never commit your `.env` file. Make sure it's listed in `.gitignore`.

### 5. Run Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Build for Production

```bash
npm run build     # create an optimized build
npm run preview   # preview the production build locally
```

---

## What I Learned

- Structuring a scalable React project
- Building reusable service classes for API layers
- Managing global auth state with Redux Toolkit
- Handling complex forms with React Hook Form and `forwardRef`
- Integrating a third-party BaaS (Appwrite) for auth, database, and file storage
- Protecting routes and conditionally rendering UI based on user ownership

---

## Future Improvements

- [ ] Add comments and likes
- [ ] Add search and category filters
- [ ] Add dark mode
- [ ] Migrate to TypeScript

---

## Acknowledgements

Huge thanks to [Hitesh Choudhary](https://github.com/hiteshchoudhary) and the **Chai aur Code** community for the guidance.

---

## Author

**Your Name**
[GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-username)
