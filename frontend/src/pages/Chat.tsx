// import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import { IoMdSend } from "react-icons/io";
import ChatItem from "../components/chat/ChatItem";
// import { useNavigate } from "react-router-dom";
// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
// } from "../helpers/api-communicator";
// import toast from "react-hot-toast";
// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

const chatMessages = [
  {
    role: "user",
    content: "Hello, what is your name?",
  },
  {
    role: "assistant",
    content: "Hello! I'm ChatGPT, a virtual assistant created by OpenAI. I don't have a personal name, but you can call me ChatGPT. How can I assist you today?"
  },
  {
    role: "user",
    content: "Are you familiar with logging using morgan?",
  },
  {
    role: "assistant",
    content: "Yes, I'm familiar with Morgan. Morgan is a popular middleware for logging HTTP requests in Node.js applications. It provides a simple way to log information about incoming requests, including details like request method, status code, response time, and more."
  },
  {
    role: "user",
    content: "What are the benefits of using morgan?",
  },
  {
    role: "assistant",
    content: "Morgan, as a logging middleware in Node.js applications, offers simplicity and versatility. Its easy integration with Express.js, coupled with predefined log formats like 'combined' and 'dev,' allows for quick adoption and adherence to standard logging practices. The middleware provides valuable insights into each HTTP request, logging details such as request method, URL, response status code, and response time. A key advantage lies in its customization options, enabling developers to tailor log formats according to specific requirements. Morgan seamlessly integrates into the middleware chain, allowing for strategic placement in the request-response lifecycle. With support for streaming logs to different outputs, developers can efficiently manage and analyze logs. Overall, Morgan's widespread use, community support, and ability to enhance debugging and monitoring processes make it a favored choice for logging in Node.js applications."
  },
]

const Chat = () => {
  const auth = useAuth();

  // };
  // const handleDeleteChats = async () => {
  //   try {
  //     toast.loading("Deleting Chats", { id: "deletechats" });
  //     await deleteUserChats();
  //     setChatMessages([]);
  //     toast.success("Deleted Chats Successfully", { id: "deletechats" });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Deleting chats failed", { id: "deletechats" });
  //   }
  // };
  // useLayoutEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       toast.loading("Loading Chats", { id: "loadchats" });
  //       const data = await getUserChats();
  //       setChatMessages([...data.chats]);
  //       toast.success("Successfully loaded chats", { id: "loadchats" });
  //     } catch (error) {
  //       console.error("Error loading chats:", error);
  //       toast.error("Loading Failed", { id: "loadchats" });
  //     }
  //   };
  
  //   if (auth?.isLoggedIn && auth.user) {
  //     fetchChats();
  //   }
  // }, [auth]);

  // useEffect(() => {
  //   if (!auth?.user) {
  //     return navigate("/login");
  //   }
  // }, [auth]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name && (
              <>
                {auth.user.name[0]}
                {auth.user.name.split(" ")[1]?.[0]}
              </>
            )}

          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            //onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
          <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            //ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton 
          //onClick={handleSubmit} 
          sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
