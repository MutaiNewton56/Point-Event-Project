document.addEventListener("DOMContentLoaded", () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchUsersData = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users data");
      }
      const imageData = await response.json();
      updateUsersData(imageData);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  const fetchToDoData = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo");
      if (!response.ok) {
        throw new Error("Failed to fetch to do data");
      }
      const toDoData = await response.json();
      displayToDoData(toDoData);
    } catch (error) {
      console.error("Error fetching to do data:", error);
    }
  };

  const updateUsersData = (imageData) => {
    const tableBody = document.getElementById("users");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Iterate through each comment and create a table row
    imageData.forEach((data) => {
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.email}</td>
        `;
      tableBody.appendChild(row);
    });
  };

  const displayToDoData = (toDoData) => {
    const tableBody = document.getElementById("toDo");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Iterate through each comment and create a table row
    toDoData.forEach((ToDo) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${ToDo.userId}</td>
              <td>${ToDo.id}</td>
              <td>${ToDo.title}</td>
              <td>${ToDo.completed}</td>
          `;
      tableBody.appendChild(row);
    });
  };

  const fetchInProgressData = async () => {
    try {
      const response = await fetch("http://localhost:3000/inprogress");
      if (!response.ok) {
        throw new Error("Failed to fetch InProgress data");
      }
      const inProgressData = await response.json();
      displayInProgressData(inProgressData);
    } catch (error) {
      console.error("Error fetching InProgress data:", error);
    }
  };

  const displayInProgressData = (inProgressData) => {
    const tableBody = document.getElementById("inProgress");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Iterate through each comment and create a table row
    inProgressData.forEach((data) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${data.userId}</td>
              <td>${data.id}</td>
              <td>${data.title}</td>
              <td>${data.completed}</td>
          `;
      tableBody.appendChild(row);
    });
  };

  const fetchCompleteData = async () => {
    try {
      const response = await fetch("http://localhost:3000/complete");
      if (!response.ok) {
        throw new Error("Failed to fetch complete data");
      }
      const completeData = await response.json();
      displayCompleteData(completeData);
    } catch (error) {
      console.error("Error fetching complete data:", error);
    }
  };

  const displayCompleteData = (completeData) => {
    const tableBody = document.getElementById("complete");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Iterate through each comment and create a table row
    completeData.forEach((complete) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${complete.userId}</td>
                <td>${complete.id}</td>
                <td>${complete.title}</td>
                <td>${complete.completed}</td>
            `;
      tableBody.appendChild(row);
    });
  };

  const fetchCommentsData = async () => {
    try {
      const response = await fetch("http://localhost:3000/comments");
      if (!response.ok) {
        throw new Error("Failed to fetch comments data");
      }
      const commentsData = await response.json();
      displayCommentsData(commentsData);
    } catch (error) {
      console.error("Error fetching comments data:", error);
    }
  };

  const displayCommentsData = (commentsData) => {
    const tableBody = document.getElementById("comments-list");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Iterate through each comment and create a table row
    commentsData.forEach((comment) => {
      const row = document.createElement("ul");
      row.innerHTML = `
                <li>${comment.content}</li>
            `;
      tableBody.appendChild(row);
    });
  };


  function handleCommentFormSubmit() {
    const textareaValue = document.getElementById('textAreaComment').value;
    console.log(textareaValue);
    postComments(textareaValue);
}

  const postComments = async (data) => {
    try {
        const response = await fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({imageId: 1, content: data})
        });

        if (!response.ok) {
            throw new Error("Failed to post data to the API");
        }

        const responseData = await response.json();
        console.log("Data posted successfully:", responseData);
    } catch (error) {
        console.error("Error posting data to the API:", error);
    }
};

  // Attach event listener to the button
  document
    .getElementById("textCommentButton")
    .addEventListener("click", handleCommentFormSubmit);

  // const handleCommentFormSubmit =
  //   const commentContent = document.getElementById('textcomment').getInputValue();
  //   try {
  //     const response = await fetch('http://localhost:3000/comments', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({imageId: 1, content: commentContent})
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to add comment');
  //     }
  //     const newComment = await response.json();

  //     addCommentToUI(newComment);

  //     commentForm.reset();
  //   } catch (error) {
  //     console.error('Error adding comment:', error);
  //   }
  // };

  const addCommentToUI = (comment) => {
    const commentsElement = document.querySelector("#comments-list");
    const commentElement = document.createElement("li");
    commentElement.textContent = comment.content;
    commentsElement.appendChild(commentElement);
  };

  fetchUsersData();
  fetchToDoData();
  fetchInProgressData();
  fetchCompleteData();
  fetchCommentsData();
});
