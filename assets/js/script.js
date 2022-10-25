let formContainer = document.querySelector('.todo-form');
let inputForm = document.getElementById('input-form');
let errorMsg = document.querySelector('.error-message');
let todoList = document.querySelector('.todo-list');
let doneList = document.querySelector('.done-list');
let listEmpty = document.querySelector('.list-empty');

let addBtn = document.querySelector('.add-button');



window.addEventListener('load', () => {
    let nameInput = document.getElementById('username');
    let username = localStorage.getItem('username') || '';
    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

})


function createElement() {
    if(inputForm.value == null || inputForm.value.trim() === '') {
        errorMsg.style.display = 'block';
    } else {
    errorMsg.style.display = 'none';
    let inputFieldText = inputForm.value;
   
    let todoSectionWrap = document.createElement('div');
    let todoSection = document.createElement('textarea');
    
    let editBtnDiv = document.createElement('div');
    let delBtnDiv = document.createElement('div');
    let saveBtnDiv = document.createElement('div');
    let checkBtnDiv = document.createElement('div');
    let doneBtnDiv = document.createElement('div');

    
    todoSectionWrap.classList.add('todo-section-wrap');
    todoSection.classList.add('todo-section');
    todoSection.setAttribute('readonly', true);
    todoSection.type = 'text';
    delBtnDiv.classList.add('delete-button');
    editBtnDiv.classList.add('edit-button');
    saveBtnDiv.classList.add('edit-button');
    saveBtnDiv.classList.add('save-button');
    checkBtnDiv.classList.add('check-button');
    doneBtnDiv.classList.add('done-button');

    delBtnDiv.innerHTML = '<img src="assets/img/bin.png" alt="bin">';
    editBtnDiv.innerHTML = '<img src="assets/img/edit.png" alt="edit">';
    saveBtnDiv.innerHTML = '<img src="assets/img/save.png" alt="save">';
    checkBtnDiv.innerHTML = '<img src="assets/img/do.png" alt="do">';
    doneBtnDiv.innerHTML = '<img src="assets/img/done.png" alt="done">';

   
    todoList.appendChild(todoSectionWrap);
    todoSectionWrap.appendChild(todoSection);
    todoSectionWrap.appendChild(editBtnDiv);
    todoSectionWrap.appendChild(saveBtnDiv);
    todoSectionWrap.appendChild(checkBtnDiv);
    todoSectionWrap.appendChild(doneBtnDiv);
    todoSectionWrap.appendChild(delBtnDiv);
    
    doneBtnDiv.style.display = 'none';

    todoSection.value = inputFieldText;

    inputForm.value = '';

    // Resize input
    let textarea = todoSectionWrap.querySelector('textarea');
    if(textarea.textLength >= 31) {
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.classList.add('todo-section-bigger');
    } else {
        textarea.style.height = '38px';
    }


    
  


    // Edit button
    editBtnDiv.addEventListener('click', () => {
        let todoListItem = todoSectionWrap.querySelector('.todo-section');
        if(inDoneList) {
            return;
        }
        todoListItem.removeAttribute('readonly');
        todoListItem.focus();
    
        textarea.style.outline = true;

        editBtnDiv.style.display = 'none';
        
        saveBtnDiv.style.display = 'flex';
    });
    

    // Save button
    saveBtnDiv.addEventListener('click', () => {
        let todoListItem = todoSectionWrap.querySelector('.todo-section');

        textarea.classList.remove('border-gradient');
        textarea.classList.remove('border-gradient-purple');
        editBtnDiv.style.display = 'flex';
        saveBtnDiv.style.display = 'none';

        todoListItem.setAttribute('readonly', true);
    })

    var inDoneList = false;

    // Delete button
    delBtnDiv.addEventListener('click', () => {
        if(!inDoneList) {
            todoList.removeChild(todoSectionWrap);
        } else {
            doneList.removeChild(todoSectionWrap);
        }
        
    });

    

    // Check button (Move list items to done list)
    checkBtnDiv.addEventListener('click', function(){

        doneList.appendChild(todoSectionWrap);
        checkBtnDiv.style.display = 'none';
        doneBtnDiv.style.display = 'flex';
        textarea.style.textDecoration = 'line-through';

        inDoneList = true;
    });

    // Done button
    doneBtnDiv.addEventListener('click', () => {
        todoList.appendChild(todoSectionWrap);

        checkBtnDiv.style.display = 'flex';
        doneBtnDiv.style.display = 'none';
        textarea.style.textDecoration = 'none';
        inDoneList = false;
    })

    function showMessageIsNoCompleteTasks() {
        if(doneList.children.length >= 2) {
            listEmpty.style.display = 'none';
        } else {
            listEmpty.style.display = 'flex';
        }
    
    }

    setInterval(showMessageIsNoCompleteTasks, 10);

    // Resize edit
    function autoResize() {
        this.style.height = '38px';
        this.style.height = this.scrollHeight + 'px';
        if(this.scrollHeight >= 66) {
            textarea.classList.add('todo-section-bigger');
        }  else {
            this.style.height = '38px';
            textarea.classList.remove('todo-section-bigger');
            
        }
         
    }

    
    textarea.addEventListener('input', autoResize);
    
        
    };

  
}  


window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        createElement();
    }
})


addBtn.addEventListener('click', createElement);




