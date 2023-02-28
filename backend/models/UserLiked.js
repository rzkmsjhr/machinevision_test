import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const UserLiked = db.define('user_liked',{
    userId:DataTypes.INTEGER,
    postId:DataTypes.INTEGER,
},{
    freezeTableName: true
});
UserLiked.removeAttribute('id');

export default UserLiked;

(async()=>{
    await db.sync();
})();