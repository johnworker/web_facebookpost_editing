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
    document.querySelectorAll('.post_images img').forEach(function (img) {
        img.addEventListener('click', function () {
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
                const newWidth = prompt('輸入新的寬度（例如：300px 或 50%）:');
                const newHeight = prompt('輸入新的高度（例如：300px 或 50%）:');
                const newPosition = prompt('輸入新的擺放位置（例如：left, right, center）:');
                if (newWidth) img.style.width = newWidth;
                if (newHeight) img.style.height = newHeight;
                if (newPosition) img.style.float = newPosition;
            }
        });
    });

    // 新增圖片功能
    document.getElementById('addImageButton').addEventListener('click', function () {
        const imageUpload = document.getElementById('imageUpload');
        imageUpload.click();
        imageUpload.onchange = function (event) {
            const reader = new FileReader();
            reader.onload = function () {
                const newImg = document.createElement('img');
                newImg.src = reader.result;
                newImg.contentEditable = true;
                document.querySelector('.post_images').appendChild(newImg);

                // 添加事件監聽器到新增的圖片
                newImg.addEventListener('click', function () {
                    const action = prompt('輸入 "換" 來替換圖片，輸入 "刪" 來刪除圖片，輸入 "調" 來調整圖片屬性:');
                    if (action === '換') {
                        imageUpload.click();
                        imageUpload.onchange = function (event) {
                            const reader = new FileReader();
                            reader.onload = function () {
                                newImg.src = reader.result;
                            };
                            reader.readAsDataURL(event.target.files[0]);
                        };
                    } else if (action === '刪') {
                        newImg.remove();
                    } else if (action === '調') {
                        const newWidth = prompt('輸入新的寬度（例如：300px 或 50%）:');
                        const newHeight = prompt('輸入新的高度（例如：300px 或 50%）:');
                        const newPosition = prompt('輸入新的擺放位置（例如：left, right, center）:');
                        if (newWidth) newImg.style.width = newWidth;
                        if (newHeight) newImg.style.height = newHeight;
                        if (newPosition) newImg.style.float = newPosition;
                    }
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        };
    });
});
