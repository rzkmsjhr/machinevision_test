import express from "express";
import {
    getPosts,
    getPostById,
    savePost,
    updatePost,
    deletePost,
    likePost,
    unLikePost
} from "../controllers/Posts.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/posts', verifyToken, getPosts);
router.get('/posts/:id', verifyToken, getPostById);
router.post('/posts', verifyToken, savePost);
router.patch('/posts/:id', verifyToken, updatePost);
router.delete('/posts/:id', verifyToken, deletePost);
router.post('/posts/:id/like', verifyToken, likePost);
router.post('/posts/:id/unlike', verifyToken, unLikePost);

export default router;