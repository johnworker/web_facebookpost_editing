window.addEventListener('load', function () {
    // 自動加載已保存的內容
    loadRemoteContent();

    // 保存變更
    document.getElementById('saveButton').addEventListener('click', function () {
        saveRemoteContent();
    });

    // 保存到遠端伺服器
    function saveRemoteContent() {
        const data = {
            post_header: document.querySelector('.post_header').innerHTML,
            post_images: document.querySelector('.post_images').innerHTML
        };

        fetch('https://johnworker.github.io/web_facebookpost_editing/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('變更已保存！');
        })
        .catch((error) => {
            console.error('Error saving content:', error);
            alert('保存內容時發生錯誤。');
        });
    }

    // 從遠端讀取內容
    function loadRemoteContent() {
        fetch('https://johnworker.github.io/web_facebookpost_editing/')
            .then(response => response.json())
            .then(data => {
                if (data.post_header) {
                    document.querySelector('.post_header').innerHTML = data.post_header;
                }
                if (data.post_images) {
                    document.querySelector('.post_images').innerHTML = data.post_images;
                }
                alert('已加載上次儲存的內容！');
            })
            .catch(error => {
                console.error('Error loading remote content:', error);
                alert('讀取內容時發生錯誤。');
            });
    }

    // 處理圖片替換和刪除
    function setupImageActions(img) {
        let lastTouchTime = 0;

        img.addEventListener('dblclick', function () { // 使用 dblclick 事件
            handleImageAction(img);
        });

        img.addEventListener('touchend', function (event) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastTouchTime;
            if (timeDifference < 300 && timeDifference > 0) {
                // 觸碰兩次
                handleImageAction(img);
            }
            lastTouchTime = currentTime;
        });
    }

    function handleImageAction(img) {
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
                    setupDragAndDrop(newImg); // 為新增圖片設置拖放功能
                };
                reader.readAsDataURL(files[i]);
            }
        };
    });

    // 設置拖放功能
    function setupDragAndDrop(img) {
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

        // 以下是針對移動設備的事件處理程序
        img.addEventListener('touchstart', function (event) {
            event.preventDefault();
            img.classList.add('dragging');
        });

        img.addEventListener('touchmove', function (event) {
            event.preventDefault();
            const touch = event.touches[0];
            const dragging = document.querySelector('.dragging');
            const overElement = document.elementFromPoint(touch.clientX, touch.clientY);
            if (dragging && overElement && overElement.tagName === 'IMG' && dragging !== overElement) {
                // 交換圖片位置
                const draggingSrc = dragging.src;
                dragging.src = overElement.src;
                overElement.src = draggingSrc;
            }
        });

        img.addEventListener('touchend', function () {
            const dragging = document.querySelector('.dragging');
            if (dragging) {
                dragging.classList.remove('dragging');
            }
        });
    }

    document.querySelectorAll('.post_images img').forEach(setupDragAndDrop);
});
