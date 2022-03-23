const express = require("express");
const Blogs = require("../schemas/blogs")
const router = express.Router();


router.get("/blogs", async (req, res, next) => {
    try {
        const blogs = await Blogs.find({}).sort("-borderDate");
        res.json({ blogs });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get("/blogs/:boardId", async (req, res) => {
    //주소에boardId가 파라미터값으로 가져옴
    const { boardId } = req.params;
    const blogs = await Blogs.findOne({ boardId });
    //detail 값으로 넘겨줌
    res.json({ blogs });
  });

  router.delete("/blogs/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const isBorder = await Blogs.find({ boardId });
    if (isBorder.length > 0) {
      await Blogs.deleteOne({ boardId });
    }
    res.send({ result: "success" });
  });

  router.patch("/blogs/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const { name, title, comment, borderDate } = req.body;
     isBorder = await Blogs.find({ boardId });
    if (isBorder.length) {
      await Blogs.updateOne({ boardId }, { $set:  { name,  title, comment, borderDate } });
    }
    res.send({ result: "success" });
  });

router.post("/blogs", async (req, res) => {
    const { name, title, password, comment, borderDate } = req.body;
    let boardId = await Blogs.find({}).sort("-boardId").limit(1); 
    if (boardId.length === 0) { boardId = 1 } 
    else { boardId = boardId[0]['boardId'] + 1; }
    const createBlogs = await Blogs.create({ boardId, name, title, password, comment, borderDate });
    res.send({ result: "success" });
});


module.exports = router;