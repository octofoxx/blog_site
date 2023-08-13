const router = require('express').Router();
const { Blog } = require('../../models/allModels');
const withAuth = require('../../utils/auth');

//create a new blog
router.post("/", withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const blog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(blog);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

//edit a blog based on its id
router.put("/:id", withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: "No blog with this id exists" });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a blog based on its id
router.delete("/:id", withAuth, async (req, res) => {
    console.log(req.params.id);
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: "No blog with this id exists" });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;