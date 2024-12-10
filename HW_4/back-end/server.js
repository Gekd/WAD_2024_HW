const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const port = process.env.SERVER_PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const secret = process.env.SERVER_SECRET;
const maxAge = 60 * 60;

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

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
        res.status(400).send(error.message);
    }
});

// Annab "pool.query is not a function" errori kui db on tühi
app.get('/api/posts', async (req, res) => {
    try {
        console.log("Get all posts request received");
        const allposts = await pool.query("SELECT * FROM posttable");
        res.json(allposts.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// Töötab kui panna nt /posts/1
app.get('/api/posts/:id', async (req, res) => {
    try {
        console.log("Get post by id request received");
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posttable WHERE id = $1", [id]);
        res.json(post.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// Uuendades peab olema nii title kui ka body
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
        res.status(400).send(error.message);

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
        res.status(400).send(error.message);
    }
});


app.post('/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password, salt);
        const authUser = await pool.query(
            "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *", [email, bcryptPassword]
        );
        const token = await generateJWT(authUser.rows[0].id);
        res.status(201).cookie('jwt', token, { maxAge: 6000000, httpOnly: true }).json({ user_id: authUser.rows[0].id }).send;

    } catch (error) { res.status(400).send(error.message); }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'User is not registered' });
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }
        const token = await generateJWT(user.rows[0].id);
        res.status(201).cookie('jwt', token, { maxAge: 6000000, httpOnly: true }).json({ user_id: user.rows[0].id }).send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.get('/auth/authenticate', async (req, res) => {
    const token = req.cookies.jwt;
    let authenticated = false;
    try {
        if (token) {
            await jwt.verify(token, 'secret', (err) => {
                if (err) {
                    console.log(err.message);
                    res.send({ "authenticated": authenticated });
                } else {
                    authenticated = true;
                    res.send({ "authenticated": authenticated });
                }
            });
        } else {
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }

});

app.get('/auth/logout', async (req, res) => {
    console.log("Delete jwt request received");
    res.status(202).clearCookie('jwt').send('cookie cleared');
});
