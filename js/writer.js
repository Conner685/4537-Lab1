class Note {
    constructor(id, content, removeCallback) {
        this.id = id;
        this.content = content;
        this.removeCallback = removeCallback;
        this.element = this.createNote();
    }

    createNote() {
        const container = document.createElement('div');
        container.className = 'note-card';
        container.id = `note-${this.id}`;

        const textArea = document.createElement('textarea');
        textArea.value = this.content;
        textArea.placeholder = MESSAGES.placeholder;

        textArea.oninput = (e) => {
            this.content = e.target.value;
        };

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerText = MESSAGES.removeBtn;
        removeBtn.onclick = () => this.removeCallback(this.id);

        container.appendChild(textArea);
        container.appendChild(removeBtn);

        return container;
    }
}

class WriterApp {
    constructor() {
        this.notes = [];
        this.notesContainer = document.getElementById('notes-wrapper');
        this.timeDisplay = document.getElementById('time-display');
        
        this.initUI();
        this.loadNotes();
        
        setInterval(() => this.saveNotes(), 2000);
    }

    initUI() {
        document.getElementById('page-title').innerText = MESSAGES.writerTitle;
        document.getElementById('back-btn').innerText = MESSAGES.backBtn;

        const btnContainer = document.getElementById('add-btn-container');
        const addBtn = document.createElement('button');
        addBtn.innerText = MESSAGES.addBtn;
        addBtn.onclick = () => this.addNote();
        btnContainer.appendChild(addBtn);
    }

    loadNotes() {
        const storedData = localStorage.getItem('lab1_notes');
        if (storedData) {
            const parsedNotes = JSON.parse(storedData);
            parsedNotes.forEach(note => {
                this.createNoteElement(note.id, note.content);
            });
        }
    }

    addNote() {
        const newId = Date.now(); 
        this.createNoteElement(newId, "");
    }

    createNoteElement(id, content) {
        const newNote = new Note(id, content, (idToRemove) => this.removeNote(idToRemove));
        this.notes.push(newNote);
        this.notesContainer.appendChild(newNote.element);
    }

    removeNote(id) {
        const noteToRemove = this.notes.find(n => n.id === id);
        if (noteToRemove) {
            this.notesContainer.removeChild(noteToRemove.element);

            this.notes = this.notes.filter(n => n.id !== id);

            this.saveNotes(); 
        }
    }

    saveNotes() {
        const dataToSave = this.notes.map(n => ({
            id: n.id,
            content: n.content
        }));
        
        localStorage.setItem('lab1_notes', JSON.stringify(dataToSave));
        
        const time = new Date().toLocaleTimeString();
        this.timeDisplay.innerText = MESSAGES.lastStored + time;
    }
}

const writerApp = new WriterApp();