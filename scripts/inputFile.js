// Работа с кнопкой inputFile 
const inputFile = document.querySelector("#inputFile");

inputFile.addEventListener("change", (e) => {
    const fileName = document.querySelector(".seleted-file-name");
    const fileType = document.querySelector(".seleted-file-type");
    const fileSize = document.querySelector(".seleted-file-size");
    const ulList = document.querySelector("ul");
    // сохраним в переменную files значение свойства files
    const files = e.target.files;
    const selectedFile = files[0];


    //Проверка на размер файла
    if ((selectedFile.size / 1024 / 1024) >= 10) {
        return null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);

    reader.onload = function () {
        fileName.textContent = selectedFile.name;
        fileType.textContent = selectedFile.type;
        fileSize.textContent = `${(selectedFile.size / 1024).toFixed(1)} Кбайт`; //toFixed() преобразует число в строку, сохраняя указанное число десятичных знаков

        const fileObject = {
            'file_name': fileName.textContent,
            'file_type': fileType.textContent,
            'file_size': fileSize.textContent,
            'file_content': reader.result
        }


        //добавление данных о файле в LocalStorage с уникальным ключом
        let newKey = localStorage.length + 1;
        localStorage.setItem(newKey, JSON.stringify(fileObject));

        let link = document.createElement('a');
        link.download = fileName.textContent;
        link.textContent = ' Скачать'
        link.href = reader.result;
        const liValue = document.createElement("li");
        liValue.textContent = `${fileName.textContent}, ${fileType.textContent}, ${fileSize.textContent}`;
        liValue.appendChild(link); // добавляем элемент a внутрь li
        ulList.appendChild(liValue);
    }
})
