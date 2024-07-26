
// 更改文章和圖片
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
            if (confirm('是否要替換這張圖片？')) {
                document.getElementById('imageUpload').click();
                document.getElementById('imageUpload').onchange = function (event) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        img.src = reader.result;
                    };
                    reader.readAsDataURL(event.target.files[0]);
                };
            } else if (confirm('是否要刪除這張圖片？')) {
                img.remove();
            }
        });
    });
});
