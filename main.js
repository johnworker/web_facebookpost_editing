window.addEventListener('load', function () {
    // 加載已保存的內容
    if (localStorage.getItem('post_header')) {
        document.querySelector('.post_header').innerHTML = localStorage.getItem('post_header');
    }
    if (localStorage.getItem('post_images')) {
        document.querySelector('.post_images').innerHTML = localStorage.getItem('post_images');
    }

    // 保存變更
    document.getElementById('saveButton').addEventListener('click', function () {
        localStorage.setItem('post_header', document.querySelector('.post_header').innerHTML);
        localStorage.setItem('post_images', document.querySelector('.post_images').innerHTML);
        alert('變更已保存！');
    });

    // 處理圖片替換和刪除
    function setupImageActions(img) {
        img.addEventListener('dblclick', function () {
            const action = prompt('輸入 "換" 來替換圖片，輸入 "刪" 來刪除圖片，輸入 "調" 來調整圖片屬性:');
            if (action === '換') {
                const imageUpload = document.getElementById('imageUpload');
                imageUpload.click();
                imageUpload.onchange = function (event) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        img.src = reader.result;
                    };
                    reader.readAsDataURL(event.target.files[0]);
                };
            } else if (action === '刪') {
                img.remove();
            } else if (action === '調') {
                const newWidth = prompt('輸入新的寬度（例如：150px 或 50%）:');
                const newHeight = prompt('輸入新的高度（例如：150px 或 50%）:');
                const newPosition = prompt('輸入新的擺放位置（例如：left, right, center）:');
                if (newWidth) img.style.width = newWidth;
                if (newHeight) img.style.height = newHeight;
                if (newPosition) img.style.float = newPosition;
            }
        });
    }

    document.querySelectorAll('.post_images img').forEach(setupImageActions);

    // 新增圖片功能
    document.getElementById('addImageButton').addEventListener('click', function () {
        const imageUpload = document.getElementById('imageUpload');
        imageUpload.click();
        imageUpload.onchange = function (event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = function () {
                    const newImg = document.createElement('img');
                    newImg.src = reader.result;
                    newImg.contentEditable = true;
                    newImg.style.width = '200px'; // 固定寬度
                    newImg.style.height = '200px'; // 固定高度

                    // 獲取選擇的 section
                    const sectionId = document.getElementById('sectionSelector').value;
                    const targetSection = document.querySelector(`#${sectionId} .post_images .row:last-child`);

                    if (targetSection) {
                        targetSection.appendChild(newImg);
                    } else {
                        // 如果最後一個 row 不存在，創建一個新的 row
                        const newRow = document.createElement('div');
                        newRow.classList.add('row');
                        newRow.appendChild(newImg);
                        document.querySelector(`#${sectionId} .post_images`).appendChild(newRow);
                    }

                    setupImageActions(newImg);
                };
                reader.readAsDataURL(files[i]);
            }
        };
    });

    // 調整圖片順序功能
    document.querySelectorAll('.post_images img').forEach(function (img) {
        img.setAttribute('draggable', true);

        img.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', event.target.id);
            event.target.classList.add('dragging');
        });

        img.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        img.addEventListener('drop', function (event) {
            event.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging && dragging !== img) {
                // 交換圖片位置
                const draggingSrc = dragging.src;
                dragging.src = img.src;
                img.src = draggingSrc;
            }
        });

        img.addEventListener('dragend', function () {
            img.classList.remove('dragging');
        });
    });
});
