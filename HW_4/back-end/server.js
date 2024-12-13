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
    const client = await pool.connect();
    const query = "INSERT INTO posttable (title, body, urllink) VALUES ($1, $2, $3) RETURNING *;";
    const values = [req.body.title, req.body.body, req.body.urllink];

    try {
        const result = await client.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ error: 'Failed to create post' });
    } finally {
        client.release();
    }
});


app.get('/api/posts', async (req, res) => {
    const client = await pool.connect();
    const query = "SELECT * FROM posttable;";

    try {
        const result = await client.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
    } finally {
        client.release();
    }
});


app.get('/api/posts/:id', async (req, res) => {
    const client = await pool.connect();
    const query = "SELECT * FROM posttable WHERE id = $1;";
    const values = [req.params.id];

    try {
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching post by id:', error.message);
        res.status(500).json({ error: 'Server error' });
    } finally {
        client.release();
    }
});


app.put('/api/posts/:id', async (req, res) => {
    const client = await pool.connect();
    const query = "UPDATE posttable SET title = $2, body = $3, urllink = $4 WHERE id = $1 RETURNING *;";
    const values = [req.params.id, req.body.title, req.body.body, req.body.urllink];

    try {
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating post:', error.message);
        res.status(500).json({ error: 'Failed to update post' });
    } finally {
        client.release();
    }
});


app.delete('/api/posts/:id', async (req, res) => {
    const client = await pool.connect();
    const query = "DELETE FROM posttable WHERE id = $1 RETURNING *;";
    const values = [req.params.id];

    try {
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).send('Post deleted successfully');
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ error: 'Server error' });
    } finally {
        client.release();
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

    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(400).json({ error: error.message });
    }
});

app.post('/auth/login', async (req, res) => {
    const client = await pool.connect();
    const query = "SELECT * FROM users WHERE email = $1;";
    const values = [req.body.email];

    try {
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'User is not registered' });
        }

        const validPassword = await bcrypt.compare(req.body.password, result.rows[0].password);
        if (!validPassword) {
            console.log('Password is incorrect');
            return res.status(401).json({ error: 'Password is incorrect' });
        }

        const token = jwt.sign({ id: result.rows[0].id }, secret, { expiresIn: 60 * 60 });
        res.status(201).cookie('jwt', token, { maxAge: 6000000, httpOnly: true }).json({ user_id: result.rows[0].id });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Server error' });
    } finally {
        client.release();
    }
});


app.get('/auth/authenticate', async (req, res) => {
    const token = req.cookies.jwt;
    let authenticated = false;
    try {
        if (token) {
            await jwt.verify(token, secret, (err) => {
                if (err) {
                    console.log('Token verify failed: ' + err.message);
                    res.send({ "authenticated": authenticated });
                } else {
                    authenticated = true;
                    res.send({ "authenticated": authenticated });
                }
            });
        } else {
            console.log('No token found');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: error.message });
    }

});

app.get('/auth/logout', async (req, res) => {
    console.log("Delete jwt request received");
    res.status(202).clearCookie('jwt').json({ cleared: true });
});
