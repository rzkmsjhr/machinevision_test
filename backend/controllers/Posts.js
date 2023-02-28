import { Posts, Users } from "../models/index.js";
import UserLiked from "../models/UserLiked.js";
import path from "path";
import fs from "fs";

export const getPosts = async(req, res)=>{
    try {
        const response = await Posts.findAll({
            include: [{
              model: Users,
              as: "users",
             }]
          })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostById = async(req, res)=>{
    try {
        const response = await Posts.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const savePost = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const refreshToken = req.cookies.refreshToken;
    const caption = req.body.caption;
    const tags = req.body.tags;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/post_images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/post_images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            const user = await Users.findAll({
                where:{
                    refresh_token: refreshToken
                }
            });
            const userId = user[0].id;
            await Posts.create({userId: userId, caption: caption, tags: tags, image: fileName, url: url});
            res.status(201).json({msg: "Posted Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updatePost = async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    const post = await Posts.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!post) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = post.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/post_images/${post.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/post_images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const caption = req.body.caption;
    const tags = req.body.tags;
    const url = `${req.protocol}://${req.get("host")}/post_images/${fileName}`;
    
    try {
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        const userId = user[0].id;
        await Posts.update({userId: userId, caption: caption, tags: tags, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Post Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = async(req, res)=>{
    const post = await Posts.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!post) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/post_images/${post.image}`;
        fs.unlinkSync(filepath);
        await Posts.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Post Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    const userId = user[0].id;
    const postId = req.params.id;
    const currentLikeCount = await Posts.findAll({
        where:{
            id : req.params.id
        }
    });
    if(!currentLikeCount) return res.status(404).json({msg: "No Data Found"});
    const currentLike = currentLikeCount[0].likes;
    const totalLike = currentLike + 1;

    try {
      await UserLiked.create({ postId: postId, userId: userId });
      await Posts.update({likes: totalLike},{
        where:{
            id: req.params.id
        }
    });
      res.status(200).json({msg: "Post Liked"});
    } catch (error) {
    console.log(error.message);
    res.status(500);
    }
}

export const unLikePost = async (req, res) => {
    const postId = req.params.id;
    const refreshToken = req.cookies.refreshToken;
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    const userId = user[0].id;
    const currentLikeCount = await Posts.findAll({
        where:{
            id : req.params.id
        }
    });
    if(!currentLikeCount) return res.status(404).json({msg: "No Data Found"});
    const currentLike = currentLikeCount[0].likes;
    const totalLike = currentLike - 1;
    
    try {
        await Posts.update({likes: totalLike},{
            where:{
                id: req.params.id
            }
        });
        await UserLiked.destroy({
            where:{
                postId, userId
            }
        });
        res.status(200).json({msg: "Post Unliked"});;
    } catch (error) {
        console.log(error.message);
        res.status(500);
    }
  }