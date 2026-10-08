# QuickNotes App

QuickNotes is a simple, fast note-taking web app built with vanilla HTML, CSS, and JavaScript. It lets you capture ideas with categories, search them instantly, and keeps everything saved in your browser even after refresh.

## Features

- Add notes with Personal, Work, or Study categories
- Each note shows text, category, and creation date
- Delete individual notes
- Live search (case-insensitive)
- Character validation (empty and >200 characters)
- Note count with correct grammar for 0, 1, and many notes
- Data persistence with localStorage
- Responsive layout for mobile
- Bonus: Clear all with confirmation

## How to run locally

1. Clone the repo: `git clone https://github.com/your-username/quicknotes-app.git`
2. Open the folder: `cd quicknotes-app`
3. Open `index.html` in your browser or use VS Code Live Server.

## What I learned

1. How to structure semantic HTML and link labels correctly for accessibility.
2. How to use Flexbox and media queries to make a responsive card layout and category styling with left-border colors.
3. How to manage state with an array of objects, render with `createElement` and `textContent` (avoiding `innerHTML`), and persist data using `JSON.stringify` and `JSON.parse` with localStorage.

## Bonus

Implemented Clear All button using `confirm("Delete all notes?")`.
