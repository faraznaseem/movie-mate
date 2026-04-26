# 🎬 Movie Discovery App

A responsive movie discovery web application built with React that allows users to browse, search, and explore movies using real-time data from TMDB API. The app features debounced search, pagination, and detailed movie pages with trailer playback.

---

## 🚀 Features

- 🔎 Search movies with **debounced input** to optimize API calls  
- 📄 Pagination system to browse large movie datasets efficiently  
- 🎬 Movie details page with overview, ratings, and metadata  
- ▶️ Trailer playback integrated for selected movies  
- 📱 Fully responsive design for mobile, tablet, and desktop  
- ⚡ Optimized API handling for better performance and user experience  

---

## 🛠️ Tech Stack

- React – Frontend UI library  
- Vite – Fast development build tool  
- Tailwind CSS – Utility-first CSS framework for styling  
- TMDB API – Movie data provider  
- Appwrite – Backend-as-a-service

---

## ⚙️ Key Implementations

### 🔹 Debounced Search
Implemented debouncing to reduce unnecessary API calls and improve performance during user input.

### 🔹 Pagination System
Fetched movie data page-wise from TMDB API to efficiently handle large datasets.

### 🔹 Movie Detail View
Created a dedicated movie page displaying detailed information including synopsis, ratings, and trailer playback.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_APPWRITE_PROJECT_ID=your_project_id_here
