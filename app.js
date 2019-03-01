const express = require("express");
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 4500;
app.use(compression());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(express.static('dist', {
    dotfiles: "deny",
    etag: true,
    extensions: ["js", "css", "json", "png", "html"],
    index: false,
    maxAge: "1d",
    lastModified: true,
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set("x-timestamp", Date.now());
    }
}));

app.listen(port);