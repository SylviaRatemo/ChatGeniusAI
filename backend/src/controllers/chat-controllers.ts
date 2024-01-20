import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
const OpenAI = require('openai').OpenAI;

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(500)
        .json({ message: "User not registered OR Token malfunctioned" });

    // grab chats of user
    const userChats = user.chats.map(({ role, content }) => ({ role, content }));
    const newUserMessage = { role: "user", content: message };
    const chats = [...userChats, newUserMessage];

    // send all chats with new one to OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAI(config);

    // get latest response
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    if (
      chatResponse.choices &&
      chatResponse.choices[0] &&
      chatResponse.choices[0].message &&
      chatResponse.choices[0].message.content
    ) {
      const responseMessage = {
        role: "assistant",
        content: chatResponse.choices[0].message.content,
      };
      user.chats.push(newUserMessage, responseMessage);
      user.markModified('chats');
      await user.save();
      return res.status(200).json({
        prompt: newUserMessage,
        response: responseMessage,
        chats: user.chats 
      });
    } else {
      console.error('Invalid chatResponse structure:', chatResponse);
      // Handle the case where the expected structure is not present
    }
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    // Assuming 'error' is an instance of the Error class
    return res.status(500).json({ message: "ERROR", cause: (error as Error).message });

  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: (error as Error).message });
  }
};
