window.addEventListener('load', function () {
    // 加載已保存的內容
    if (localStorage.getItem('post-header')) {
        document.querySelector('.post-header').innerHTML = localStorage.getItem('post-header');
    }
    if (localStorage.getItem('post-images')) {
        document.querySelector('.post-images').innerHTML = localStorage.getItem('post-images');
    }

    // 保存變更
    document.getElementById('saveButton').addEventListener('click', function () {
        localStorage.setItem('post-header', document.querySelector('.post-header').innerHTML);
        localStorage.setItem('post-images', document.querySelector('.post-images').innerHTML);
        alert('變更已保存！');
    });
});