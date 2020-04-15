export default (posts, sortBy, findByTitle) => {
  //   console.log(posts);
  //   console.log(sortBy);
  //   console.log(findByTitle);
  const originalPosts = [...posts];

  if (findByTitle) {
    return originalPosts.filter(({ title }) => {
      return title.toLowerCase().includes(findByTitle.toLowerCase());
    });
  }
  return originalPosts.sort((a, b) => {
    if (sortBy === "newest") {
      //   console.log(new Date(a.createdAt).getTime());
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "title") {
      //   console.log(b.title.localeCompare(a.title))
      return a.title.localeCompare(b.title);
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    } else if (sortBy === "author") {
      return a.user.name.localeCompare(b.user.name);
    }
  });
};
