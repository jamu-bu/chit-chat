const { User, Chat } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('friends');
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id }).populate('friends');
        },
        chat: async (parent, { _id }) => {
            return Chat.findOne({ _id });
        },
        chatExists: async (parent, { user2 }, context) => {
            const user1 = context.user._id;

            return Chat.findOne({ $or: [
                { user1, user2 },
                {  user1: user2, user2: user1},
            ] })
        },
        // friendExists: async (parent, { user2 }, context) => {
        //     const user1 = context.user._id;

        //     return User.findOne({
        //         { _id: user1 },
        //         { friends._id: user 2 },
        //     })
        // },
        myFriend: async (parent, args, context) => {
            if (context.user) {
                const user = User.findOne({ _id: context.user._id });

                if (args.user2) {
                    const friend = user.find({
                        friends: args.user2
                    });
                    return friend;
                }
                
                return user;
            }
            throw AuthenticationError;
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('friends');
            }
            throw AuthenticationError;
          },
    },
    Mutation: {
        addUser: async (parent, { username, fullname, email, password, photo }) => {
            const user = await User.create({ username, fullname, email, password, photo });
            const token = signToken(user);
            return { token, user }; 
        },
        newChat: async (parent, { user2 }, context) => {

            const chat = await Chat.create({
                user1: { _id: context.user._id },
                user2: { _id: user2 },
            })

            return chat;
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        editUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $set: {
                            username: args.username,
                            fullname: args.fullname,
                            bio: args.bio,
                            photo: args.photo,
                        },
                    },
                    { new: true, runValidators: true },
                )
            }
        },
        addFriend: async (parent, args, context) => {
            if (context.user) {
                const user1 = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            friends: args.friend
                        },
                    },
                    { new: true, runValidators: true }
                );

                const user2 = await User.findOneAndUpdate(
                    { _id: args.friend },
                    {
                        $addToSet: {
                            friends: context.user._id
                        },
                    },
                    { new: true, runValidators: true }
                );

                return user1;
            }
        },
        saveMessage: async (parent, { _id, sender, textContent}, context) => {
            if (context.user) {
                return Chat.findOneAndUpdate(
                    { _id: _id },
                    { $push: { text:
                        { 
                            sender: sender,
                            textContent: textContent,
                        }
                    } }
                )
            }
        }
    }
}

module.exports = resolvers;
