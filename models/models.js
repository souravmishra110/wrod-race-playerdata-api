import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    no_of_games_played: { type: Number, default: 0 },
    score_sum: { type: Number, default: 0 },
    max_level_reached: { type: Number, default: 0 },
    max_score: { type: Number, default: 0 },
});

const User = mongoose.model("User", UserSchema);

export default User;