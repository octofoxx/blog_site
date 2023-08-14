const deleteBlog = async (event) => {
    event.preventDefault();
  
    let blogId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blog/${blogId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.assign(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  };
  
  // Function created that allows for a user to edit blog by redirecting them to the /create/:id page
  const editBlog = async (event) => {
    event.preventDefault();

    let blogId = event.target.getAttribute("data-id");
  
    document.location.assign(`/create/${blogId}`);
  };
  
  const editButton = document.querySelectorAll("#editBtn");
  
  for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", editBlog);
  }
  
  const deleteButton = document.querySelectorAll("#deleteBtn");
  
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deleteBlog);
  }