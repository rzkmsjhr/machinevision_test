import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Posts = db.define('posts',{
    userId:DataTypes.INTEGER,
    caption: DataTypes.STRING,
    tags: DataTypes.STRING,
    likes:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    image: DataTypes.STRING,
    url: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Posts;

(async()=>{
    await db.sync();
})();