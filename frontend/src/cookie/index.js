export const getUser = () => {
  try {
    const userString = localStorage.getItem("user");
    // console.log('calling userString in the getUser', userString);
    if (!userString) {
      return null;
    }
    const user = JSON.parse(userString);
    // console.log('calling user after parsing the string in get user', user);
    return user;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};
