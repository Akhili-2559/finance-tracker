require("dotenv").config();

const app = require("./app");

require("./config/db");

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});