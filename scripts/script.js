// Добавление списка файлов из LocalStorage
const ulList = document.querySelector("ul");

const submitBtn = document.querySelector("#submit");
const updateBtn = document.querySelector("#updateList");

const fileType = document.querySelector("#fileType");
const numberValue = document.querySelector("#numberValue");

function showFiles() {
    for (let i = 0; i < localStorage.length; i++) {
        const localStorageValue = JSON.parse(localStorage.getItem(`${i + 1}`));
        const file_name = localStorageValue['file_name'];
        const file_type = localStorageValue['file_type'];
        const file_size = localStorageValue['file_size'];
        const file_data = localStorageValue['file_content']
        const liValue = document.createElement("li");


        let link = document.createElement('a');
        link.download = file_name;
        link.textContent = 'Скачать'
        link.href = file_data;

        liValue.textContent = `${file_name}, ${file_type}, ${file_size}`;
        liValue.appendChild(link); // добавляем элемент a внутрь li
        ulList.appendChild(liValue);
    }
}

submitBtn.addEventListener("click", () => {

    // границы окрашиваются если в данных input пустое значение 
    fileType.style.border = (fileType.value == '') ? '2px solid #fc1e1f' : '2px solid #3b3f42';
    numberValue.style.border = (numberValue.value == '') ? '2px solid #fc1e1f' : '2px solid #3b3f42';

    if (fileType.value != '' && numberValue.value != '') {

        // нужен для того, чтобы убрать всё с ul
        ulList.textContent = '';

        // Работа фильтров
        for (let i = 0; i < localStorage.length; i++) {
            const localStorageValue = JSON.parse(localStorage.getItem(`${i + 1}`));
            const file_name = localStorageValue['file_name'];
            const file_type = localStorageValue['file_type'];
            const file_size = localStorageValue['file_size'];
            const file_data = localStorageValue['file_content']

            // Работает (указываем тип файла в виде png, text, html, и т.д.)
            if (localStorageValue['file_type'].includes(fileType.value) && localStorageValue['file_size'] < numberValue.value) {
                let link = document.createElement('a');
                link.download = file_name;
                link.textContent = 'Скачать'
                link.href = file_data;

                const liValue = document.createElement("li");
                liValue.textContent = `${file_name}, ${file_type}, ${file_size}`;
                liValue.appendChild(link); // добавляем элемент a внутрь li
                ulList.appendChild(liValue);
            }
        }
    }
})

updateBtn.addEventListener("click", () => {
    ulList.textContent = '';
    showFiles();
})

showFiles();
