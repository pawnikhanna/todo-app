let id = 0;
const list = document.querySelector('#list');

class UI{
    static displayToDo(){
        const todos = Store.getToDos();
        todos.forEach((todo) => UI.addToDoToList(todo.text, todo.id, todo.completed));
    }

    static addToDoToList(toDo, id, ifChecked){
        const completed = ifChecked ? 'checkedLine' : '';
        const statusIcon = ifChecked ? 'fa-check-circle' : 'fa-circle';
        const liItem = `<li>
        <p class="text ${completed}">${toDo}</p>
        <i class="far ${statusIcon} co" action="complete" id="${id}"></i>
        <i class="far fa-trash-alt" action="delete" id="${id}"></i>
        </li>`;
        const position = "beforeend";
        list.insertAdjacentHTML(position, liItem);
    }

    static removeToDo(element){
        element.parentNode.parentNode.removeChild(element.parentNode);
        
        const curId = element.attributes.id.value;
        const todos = Store.getToDos();
        todos.forEach((todo, index) => {
            if(+todo.id === +curId){
                todos.splice(index, 1);
            }
        });

        localStorage.setItem('toDo', JSON.stringify(todos));
    }

    static completeToDo(element){
        const CHECK = "fa-check-circle";
        const UNCHECK = "fa-circle";
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle("checkedLine");

        const curId = element.attributes.id.value;
        const todos = Store.getToDos();
        todos.forEach((todo, index) => {
            if(+todo.id === +curId){
                todos[index].completed = todos[index].completed ? false : true;
            }
        });

        localStorage.setItem('toDo', JSON.stringify(todos));
    }

}

class Store{
    static getToDos(){
        let todos;
        if(localStorage.getItem('toDo') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('toDo'));
        }
        return todos;
    }

    static addToDoToList(toDo, id){

        const todos = Store.getToDos();

        todos.push({text: toDo, id: id, completed: false});

        localStorage.setItem('toDo', JSON.stringify(todos));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayToDo);

document.addEventListener("keyup", function(){
    if(event.keyCode == 13){
        const toDoItem = input.value;
        if(toDoItem){
            UI.addToDoToList(toDoItem);

            Store.addToDoToList(toDoItem);
            id++;
        }
        input.value = "";
    }
});
list.addEventListener("click", (event) => {
    
    const element = event.target;
    if(element.attributes.action){
        const elementAction = element.attributes.action.value;
        if(elementAction == "complete"){
            UI.completeToDo(element);
        }else if(elementAction == "delete"){
            UI.removeToDo(element);
        }
    }
    
});