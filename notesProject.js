var backupNotes = localStorage.getItem('notes');
if (backupNotes) {
	var notes = JSON.parse(backupNotes);
} else {

	var notes = [
		{
			noteContent: "Literature Bagrut!",
			datetime: "07/02/2018 15:20",
		},
		{
			noteContent: "I Have to finish the project!",
			datetime: "09/03/2018 11:00",
		},
		{
			noteContent: "Appointment with the hygienist",
			datetime: "11/04/2018 19:30",
		}

	];
}
objectsToNotes(notes);

function objectsToNotes(notes) {
	for (let i = 0; i < notes.length; i++) {
		CreateNoteElements(notes[i])
	}
}



function CreateNoteElements(objects) {
	var newDivElement = document.createElement('div');
	var newButtonElement = document.createElement('button')
	var newPElement = document.createElement('p');
	var newSpanElement = document.createElement('span');

	newDivElement.classList.add('note');

	newButtonElement.innerHTML = '<img src="style/images/X-icon.png">';
	newPElement.textContent = objects.noteContent;
	newSpanElement.textContent = objects.datetime;


	document.querySelector('.all-notes').appendChild(newDivElement);
	newDivElement.appendChild(newButtonElement);	
	newDivElement.appendChild(newPElement);
	newDivElement.appendChild(newSpanElement);


	newButtonElement.addEventListener('click', function (event) {
		var backupNotesArray = document.querySelectorAll('.note');
		var deletedNote = event.target.parentNode.parentNode;
		for (var i = 0; i < backupNotesArray.length; i++) {
			if (backupNotesArray[i] == deletedNote) {
				break;
			}
		}
		notes.splice(i, 1);
		updateBackup(notes);

		event.target.parentNode.parentNode.remove();

	});
}




var resetBtn = document.querySelector('#clear_button');
var textArea = document.querySelector('#textarea');

textArea.addEventListener ('change', function () {
	(textArea.value === '') ? resetBtn.style.display = 'none' : resetBtn.style.display = 'block';
})

console.log(textArea.value);

resetBtn.addEventListener ('click', function clearText() {
	textArea.value = '';
});




var addNoteForm = document.querySelector('.notebook-form');
addNoteForm.addEventListener ('submit', function addANote(event) {
	event.preventDefault();

	var noteContent = addNoteForm.querySelector('textArea').value;
	var datetimeContent = addNoteForm.querySelector('#input_datetime').value;
	console.log(datetimeContent);
	var dateContent = datetimeContent.slice(8,10) + "/" + datetimeContent.slice(5,7) + "/" + datetimeContent.slice(0,4) + " " + datetimeContent.slice(-5);
	console.log(dateContent);

	var noteObject = {
		noteContent: noteContent,
		datetime: dateContent,
	}

	CreateNoteElements(noteObject);
	
	notes.push(noteObject);
	updateBackup(notes);

	addNoteForm.reset();

});


var currentTime = new Date().getTime() + 2*60*60*1000;
var today = new Date(currentTime);
var nowDateFormat = today.toISOString().slice(0, 16);
document.querySelector('#input_datetime').setAttribute("min", nowDateFormat);




function updateBackup (array) {
	localStorage.setItem('notes', JSON.stringify(array));
}




