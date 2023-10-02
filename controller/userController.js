// authController.js
const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");

require("dotenv").config();

// register user here
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExit = await User.findOne({ email });
    console.log(14, userExit);
    if (!userExit) {
      const user = new User({ username, email, password });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    } else {
      return res.statu(400).json({ message: "User already exit" });
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// loign user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    //   const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    console.log(user);

    const token = jwt.sign({ userId: user._id,isAdmin:user.isAdmin }, process.env.JWT, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};

// get all user
const getAlluser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users: users });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

// delete all user
const deleteuser = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const user = await User.findByIdAndDelete({ _id: userId });
    res.status(200).json({ message: "user Deleted Succefully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// udpate all user score for particular test
const updateScore = async (req, res) => {
  try {
    const { userId, excerciseId, score, name, difficulty } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) return res.status(404).json({ message: "user not found" });

    const index = user.scores.findIndex((u) => {
      return u.excerciseId == excerciseId;
    });

    console.log(index);
    if (index !== -1) {
      user.scores[index].score = score;

      await user.save();
    } else {
      const newScore = {
        excerciseId: excerciseId,
        score: score,
        difficulty: difficulty,
        name: name,
      };

   
      user.scores.push(newScore);
      console.log(user)
      await user.save();
    }

    res.status(200).json({ message: "Score Updated Succeffuly" });
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findOne({ _id: id });
    const newUser = {
      username: user.username,
      email: user.email,
      scores: user.scores,
    };
    res.status(200).json({ userDetails: newUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
const updateUserDetails = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: "User not Found" });
    const updatedUser = await findOneAndUpdate(
      ({ _id: userId }, { $set: { name: name } }, { new: true })
    );
    res
      .status(200)
      .json({ message: "User Updated Succesfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
const getAllPastTest = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });

    if (user) {
      res.status(200).json({ allTest: user.scores });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const resetTestInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { scores: [] } },
      { new: true }
    );

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const leaderBoardPosition = async (req, res) => {
  try {
    const users = await User.find({});
    const userDetails = await User.aggregate([
      {
        $unwind: "$scores",
      },
      {
        $group: {
          _id: "$_id",

          totalScore: { $sum: "$scores.score" },
        },
      }
    ]);

    const mergedArray = users.map((user) => {
      const userScore = userDetails.find((score) => score._id.equals(user._id));
      return {
        _id: user._id,
        username: user.username,
        isAdmin:user.isAdmin,
        totalScore: userScore ? userScore.totalScore : 0 
      };
    });
    
       

    
    
   
    res.status(200).json({ userList: mergedArray });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  register,
  login,
  getAlluser,
  updateScore,
  deleteuser,
  getUser,
  updateUserDetails,
  getAllPastTest,
  resetTestInfo,
  leaderBoardPosition,
};
