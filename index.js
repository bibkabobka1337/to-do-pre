let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

// Функция загрузки задач из localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return items;
}

// Функция создания элемента задачи
function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    // Устанавливаем текст задачи
    textElement.textContent = item;

    // Обработчик для кнопки удаления
    deleteButton.addEventListener('click', function() {
        clone.remove();
        const items = getTasksFromDOM();
        saveTasks(items);
    });

    // Обработчик для кнопки копирования
    duplicateButton.addEventListener('click', function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        const items = getTasksFromDOM();
        saveTasks(items);
    });

    // Обработчик для кнопки редактирования
    editButton.addEventListener('click', function() {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    // Обработчик для снятия фокуса с редактируемого элемента
    textElement.addEventListener('blur', function() {
        textElement.setAttribute('contenteditable', 'false');
        const items = getTasksFromDOM();
        saveTasks(items);
    });

    return clone;
}

// Функция получения задач из DOM
function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
    const tasks = [];
    itemsNamesElements.forEach(element => {
        tasks.push(element.textContent);
    });
    return tasks;
}

// Функция сохранения задач в localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Инициализация: загрузка и отображение задач
items = loadTasks();
items.forEach(item => {
    const itemElement = createItem(item);
    listElement.append(itemElement);
});

// Обработчик отправки формы
formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskText = inputElement.value.trim();
    if (taskText) {
        const newItem = createItem(taskText);
        listElement.prepend(newItem);
        
        items = getTasksFromDOM();
        saveTasks(items);
        
        inputElement.value = '';
    }
});