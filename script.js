const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all-btn');

let notes = JSON.parse(localStorage.getItem('quicknotes')) || [];

function saveNotes() {
  localStorage.setItem('quicknotes', JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  const searchTerm = searchInput.value.toLowerCase();
  notesList.innerHTML = '';

  const filtered = notes.filter(n => n.text.toLowerCase().includes(searchTerm));

  if (filtered.length === 0 && searchTerm !== '') {
    const li = document.createElement('li');
    li.textContent = 'No notes match your search.';
    li.className = 'note-card';
    notesList.appendChild(li);
    updateCount();
    return;
  }

  filtered.forEach(note => {
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;

    const textP = document.createElement('p');
    textP.textContent = note.text;

    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';

    const catSpan = document.createElement('span');
    catSpan.textContent = `${note.category} • ${note.createdAt}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      notes = notes.filter(n => n.id !== note.id);
      saveNotes();
      render();
    });

    metaDiv.appendChild(catSpan);
    metaDiv.appendChild(delBtn);

    li.appendChild(textP);
    li.appendChild(metaDiv);
    notesList.appendChild(li);
  });

  updateCount();
}

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();

  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  errorMessage.textContent = '';

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);
  saveNotes();
  render();
  noteInput.value = '';
  noteInput.focus();
});

searchInput.addEventListener('input', render);

clearAllBtn.addEventListener('click', () => {
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});

// Load on start
render();