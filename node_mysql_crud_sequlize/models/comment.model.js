module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    name: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
    },
  });

  return Comment;
};
