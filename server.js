// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const simpleGit = require('simple-git');

const app = express();
const PORT = 3000;
const git = simpleGit();

// 設置靜態文件目錄
app.use(express.static('public'));
app.use(bodyParser.json());

// 提供首頁
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 保存編輯後的HTML內容
app.post('/save', (req, res) => {
    const newContent = req.body.content;

    fs.writeFile(path.join(__dirname, 'public', 'index.html'), newContent, (err) => {
        if (err) {
            return res.status(500).send('保存失敗');
        }

        // 提交變更並推送到GitHub
        git.add('./*')
            .commit('更新 index.html')
            .push(['origin', 'main'], (err) => {
                if (err) {
                    return res.status(500).send('推送到GitHub失敗');
                }
                res.send('保存成功，已推送到GitHub');
            });
    });
});

app.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});
