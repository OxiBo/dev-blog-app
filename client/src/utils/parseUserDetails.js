export default current_user => {
  if (current_user) {
    
    const { age, avatar, occupation, gender } = current_user.bio;
    const userDetails = current_user.google
      ? { userName: current_user.google.name, email: current_user.google.email }
      : current_user.github
      ? { userName: current_user.github.name, email: current_user.github.email }
      : {
          userName: current_user.twitter.name,
          email: current_user.twitter.email
        };

    return { ...userDetails, age, avatar, occupation, gender };
  }
  return {};
};
