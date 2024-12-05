const express = require('express');
const pool = require('./database');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// listen to port 3000

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);

app.post('/api/posts', async (req, res) => {
    try {
        console.log("Post request received");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable (title, body, urllink) VALUES($1, $2, $3) RETURNING *", [post.title, post.body, post.urllink]
        );
        res.json(newpost);
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        console.log("Get all posts request received");
        const allposts = await pool.query("SELECT * FROM posttable");
        res.json(allposts.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        console.log("Get post by id request received");
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posttable WHERE id = $1", [id]);
        res.json(post.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        console.log("Put request received");
        const { id } = req.params;
        const post = req.body;
        const updatepost = await pool.query(
            "UPDATE posttable SET (title, body, urllink) = ($2, $3, $4) WHERE id = $1", [id, post.title, post.body, post.urllink]
        );
        res.json(updatepost);

    } catch (error) {
        console.error(error.message);
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        console.log("Delete request received");
        const { id } = req.params;
        const deletepost = await pool.query("DELETE FROM posttable WHERE id = $1", [id]);
        res.json(deletepost);
    } catch (error) {
        console.error(error.message);
    }
});