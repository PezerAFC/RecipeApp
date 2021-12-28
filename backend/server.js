const http = require('http');
const express = require('express');
const port = process.env.PORT || 8081;
const appRoutes = require('./routes/appRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/', appRoutes);
const db = require("./models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("Cannot connect to database!", err);
    process.exit();
});

http.createServer(app).listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})