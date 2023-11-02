// Добавление списка файлов из LocalStorage
const ulList = document.querySelector("ul");

const submitBtn = document.querySelector("#submit");
const updateBtn = document.querySelector("#updateList");

const fileType = document.querySelector("#fileType");
const numberValue = document.querySelector("#numberValue");


submitBtn.addEventListener("click", () => {

    // нужен для того, чтобы убрать всё с ul
    ulList.textContent = '';

    // Работа фильтр
    for (let i = 0; i < localStorage.length; i++) {
        const localStorageValue = JSON.parse(localStorage.getItem(`${i + 1}`));
        const file_name = localStorageValue['file_name'];
        const file_type = localStorageValue['file_type'];
        const file_size = localStorageValue['file_size'];
        const file_data = localStorageValue['file_content']

        // Работает, но надо указать полный тип файла, по типу text/plain
        if (localStorageValue['file_type'] == fileType.value && localStorageValue['file_size'] <= numberValue.value) {
            let link = document.createElement('a');
            link.download = file_name;
            link.textContent = 'Скачать'
            link.href = file_data;

            link.addEventListener('click', () => {
                setTimeout(() => {
                    URL.revokeObjectURL(link.href);
                }, 100);
            });
            const liValue = document.createElement("li");
            liValue.textContent = `${file_name}, ${file_type}, ${file_size}`;
            liValue.appendChild(link); // добавляем элемент a внутрь li
            ulList.appendChild(liValue);
        }
    }
})

updateBtn.addEventListener("click", () => {
    ulList.textContent = '';

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

        link.addEventListener('click', () => {
            setTimeout(() => {
                URL.revokeObjectURL(link.href);
            }, 100);
        });

        liValue.textContent = `${file_name}, ${file_type}, ${file_size}`;
        liValue.appendChild(link); // добавляем элемент a внутрь li
        ulList.appendChild(liValue);
    }
})


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

    link.addEventListener('click', () => {
        setTimeout(() => {
            URL.revokeObjectURL(link.href);
        }, 100);
    });

    liValue.textContent = `${file_name}, ${file_type}, ${file_size}`;
    liValue.appendChild(link); // добавляем элемент a внутрь li
    ulList.appendChild(liValue);
}