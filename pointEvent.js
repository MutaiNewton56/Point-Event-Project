// write your code here

document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch image data and comments
    const fetchUsersData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        const imageData = await response.json();
        console.log(imageData)
        // Update UI with image data
        updateUsersData(imageData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };
  
    const fetchToDoData = async () => {
      try {
        const response = await fetch('http://localhost:3000/to do');
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch to do data');
        }
        const imageData = await response.json();
        // Update UI with image data
        updateToDoData(imageData)
      } catch (error) {
        console.error('Error fetching to do data:', error);
      }
    };

    const fetchInProgressData = async () => {
        try {
          const response = await fetch('http://localhost:3000/InProgress');
          console.log(response)
          if (!response.ok) {
            throw new Error('Failed to fetch in progress data');
          }
          const imageData = await response.json();
          // Update UI with image data
          updateInProgressData(imageData)
        } catch (error) {
          console.error('Error fetching in progress:', error);
        }
      };

      const fetchCompleteData = async () => {
        try {
          const response = await fetch('http://localhost:3000/complete');
          console.log(response)
          if (!response.ok) {
            throw new Error('Failed to fetch complete data');
          }
          const imageData = await response.json();
          // Update UI with image data
          updateCompleteData(imageData)
        } catch (error) {
          console.error('Error fetching complete data:', error);
        }
      };

      const fetchCommentsData = async () => {
        try {
          const response = await fetch('http://localhost:3000/comments');
          console.log(response)
          if (!response.ok) {
            throw new Error('Failed to fetch comments data');
          }
          const imageData = await response.json();
          // Update UI with image data
          updateCommentsData(imageData)
        } catch (error) {
          console.error('Error fetching comments data:', error);
        }
      };
   
  
    const updateCommentsData = (imageData) => {
      // Display comments
      const commentsElement = document.querySelector('#comments-list');
      commentsElement.innerHTML = ''; 
      console.log(imageData)
      // commentsElement.innerHTML = ''; 
      imageData.forEach(comment => {
        const commentElement = document.createElement('li');
        commentElement.textContent = comment.content;
        commentsElement.appendChild(commentElement);
      });
  
    };
  
    // Function to handle comment form submission
    const handleCommentFormSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(commentForm);
      const commentContent = formData.get('comment');
      try {
        const response = await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({imageId: 1, content: commentContent})
        });
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        const newComment = await response.json();
        // Add new comment to UI
        addCommentToUI(newComment);
        // Clear comment form
        commentForm.reset();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
  
    // Function to add new comment to UI
    const addCommentToUI = (comment) => {
      const commentsElement = document.querySelector('#comments-list');
      const commentElement = document.createElement('li');
      commentElement.textContent = comment.content;
      commentsElement.appendChild(commentElement);
    };
  
    // Fetch image data when the page loads
    fetchToDoData();
    fetchInProgressData();
    fetchCompleteData();
    fetchCommentsData();
  
    // Event listeners
  
    const commentForm = document.querySelector('#comment-form');
    commentForm.addEventListener('submit', handleCommentFormSubmit);
  });