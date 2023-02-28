import Users from "./UserModel.js";
import Posts from "./PostModel.js";

Users.hasMany(Posts, { foreignKey: "userId", as: "posts" });
Posts.belongsTo(Users, { foreignKey: "userId", as: "users" });

export { Users, Posts };