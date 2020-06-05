module.exports = function (sequelize, DataTypes) {
    const Workout = sequelize.define("Workout", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      }
    });

    Workout.associate = function(models){
        Workout.hasMany(models.Activity);
    }
    return Workout;
  };