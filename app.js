const notesContainer = document.querySelector('.notes');
const textInput = document.querySelector('#input-text');
const inputBtn = document.querySelector('.input-btn');
const date = new Date;
let NoteList = JSON.parse(localStorage.getItem('Notes')) || [];
console.log(NoteList)
const createNote = () => {
    notesContainer.innerHTML = ``;
    NoteList.forEach((noteContent, index) => {
        const template = `
            <div class="NoteCard">
                <div class='card-head'> <h1>${index + 1}</h1> <div class='date-time'><p>${noteContent.dateAdded}</p> <p>${noteContent.timeAdded}</p></div></div>
                <p class="content">${noteContent.text}</p>
                <div class="button">
                    <button class="delete">Delete <i class='bx bx-trash'></i></button>
                </div>
            </div>
        `;
        notesContainer.insertAdjacentHTML('beforeend', template);
    });
    addDeleteListeners();
};

const addDeleteListeners = () => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            NoteList.splice(index, 1);
            localStorage.setItem('Notes', JSON.stringify(NoteList));
            createNote();
        });
    });
};

inputBtn.addEventListener('click', () => {
    const inputValue = textInput.value.trim();
    if (inputValue !== '') {
        // const addingDate = `${date.getUTCDate()} / ${date.getUTCMonth()} / ${date.getFullYear()}`
        // const addingTime = `${date.getUTCHours()} : ${date.getUTCMinutes()} : ${date.getUTCSeconds()}`
        NoteList.push({
            text: inputValue,
            dateAdded: `${date.getUTCDate()} / ${date.getUTCMonth()} / ${date.getFullYear()}`,
            timeAdded: `${date.getUTCHours()} : ${date.getUTCMinutes()} : ${date.getUTCSeconds()}`
        });
        localStorage.setItem('Notes', JSON.stringify(NoteList));
        textInput.value = ''; // Clear the input field
        createNote();
        location.reload()
    }
});

document.querySelector('#clearAll').addEventListener('click', ()=>{
    localStorage.clear();
    location.reload()
});

// Initial rendering of notes
createNote();
if(NoteList.length == 0){
    notesContainer.innerHTML=`<h2>Nothing added yet.</h2>`
}