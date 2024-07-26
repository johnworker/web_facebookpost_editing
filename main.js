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
    document.querySelectorAll('.post_images').forEach(function (img) {
        img.addEventListener('click', function () {
            const action = prompt('輸入 "換" 來替換圖片，輸入 "刪" 來刪除圖片:');
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
            }
        });
    });
});
