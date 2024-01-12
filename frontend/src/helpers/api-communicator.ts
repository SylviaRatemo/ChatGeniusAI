import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password }, { withCredentials: true });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  console.log(res.headers);
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password }, { withCredentials: true });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status/", { withCredentials: true });  
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message }, { withCredentials: true });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats", { withCredentials: true });
  if (res.status !== 200) {
    throw new Error("Unable to get chat");
  }
  const data = await res.data;
  console.log(data);
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete", { withCredentials: true });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  try {
    const res = await axios.get("/user/logout", { withCredentials: true });
    if (res.status !== 200) {
      throw new Error("Unable to logout");
    }
    const data = await res.data;
    // Clear authentication token on successful logout
    // Example: localStorage.removeItem('authToken');
    return data;
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
