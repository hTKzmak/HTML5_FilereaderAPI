// Работа с Drag and Drop

const dropArea = document.querySelector(".drop-area");

dropArea.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dropArea.classList.add("drop-area-over")
})

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("drop-area-over");
});

dropArea.addEventListener("dragover", (e) => {
    // отключаем стандартное поводение браузера, чтобы при сбросе файла, он не открывался в новой вкладке браузера!
    e.preventDefault();
});

dropArea.addEventListener("drop", (e) => {
    // возникает при отпускании перетаскиваемого файла в dropArea
    e.preventDefault();

    const fileName = document.querySelector(".seleted-file-name");
    const fileType = document.querySelector(".seleted-file-type");
    const fileSize = document.querySelector(".seleted-file-size");
    const ulList = document.querySelector("ul");

    dropArea.classList.remove("drop-area-over");
    const transferredFiles = e.dataTransfer.files;

    [...transferredFiles].forEach((transferredFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(transferredFile);

        reader.onload = function () {
            fileName.textContent = transferredFile.name;
            fileType.textContent = transferredFile.type;
            fileSize.textContent = `${(transferredFile.size / 1024).toFixed(1)} Кбайт`; //toFixed() преобразует число в строку, сохраняя указанное число десятичных знаков

            const fileObject = {
                'file_name': transferredFile.name,
                'file_type': transferredFile.type,
                'file_size': `${(transferredFile.size / 1024).toFixed(1)} Кбайт`, 
                'file_content': reader.result
            }


            //добавление данных о файле в LocalStorage с уникальным ключом
            let newKey = localStorage.length + 1;
            localStorage.setItem(newKey, JSON.stringify(fileObject));

            let link = document.createElement('a');
            link.download = transferredFile.name;
            link.textContent = ' Скачать'
            link.href = reader.result;

            const liValue = document.createElement("li");
            liValue.textContent = `${transferredFile.name}, ${transferredFile.type}, ${(transferredFile.size / 1024).toFixed(1)} Кбайт`;
            liValue.appendChild(link); // добавляем элемент a внутрь li
            ulList.appendChild(liValue);
        }
    });
});
