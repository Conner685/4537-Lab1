class ReaderApp {
    constructor() {
        this.notesContainer = document.getElementById('notes-wrapper');
        this.timeDisplay = document.getElementById('time-display');
        
        this.initUI();
        this.fetchNotes();
        
        setInterval(() => this.fetchNotes(), 2000);
    }

    initUI() {
        document.getElementById('page-title').innerText = TEXT.readerTitle;
        document.getElementById('back-btn').innerText = TEXT.backBtn;
    }

    fetchNotes() {
        const storedData = localStorage.getItem('lab1_notes');
        const time = new Date().toLocaleTimeString();

        this.timeDisplay.innerText = TEXT.lastStored + time;

        this.notesContainer.innerHTML = "";

        if (storedData) {
            const parsedNotes = JSON.parse(storedData);
            parsedNotes.forEach(noteData => {
                this.createReadElement(noteData.content);
            });
        }
    }

    createReadElement(content) {
        const container = document.createElement('div');
        container.className = 'note-card';
        
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.disabled = true;
        
        container.appendChild(textArea);
        this.notesContainer.appendChild(container);
    }
}

const readerApp = new ReaderApp();

//  Used Gemini (https://gemini.google.com) To check for any logical errors 