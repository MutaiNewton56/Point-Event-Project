
document.addEventListener('DOMContentLoaded', () => {
   
    const fetchUsersData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        const imageData = await response.json();
        console.log(imageData)
        
        updateUsersData(imageData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };
  
  const fetchToDoData = async () => {
      try {
          const response = await fetch('http://localhost:3000/to do');
          if (!response.ok) {
              throw new Error('Failed to fetch to do data');
          }
          const ToDoData = await response.json();
          displayToDoData(ToDoData);
      } catch (error) {
          console.error('Error fetching to do data:', error);
      }
  };
  
  const displayToDoData = (commentsData) => {
      const tableBody = document.getElementById('table-body');
  
      // Clear existing table rows
      tableBody.innerHTML = '';
  
      // Iterate through each comment and create a table row
      ToDoData.forEach(ToDo => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${ToDo.id}</td>
              <td>${ToDo.title}</td>
              <td>${ToDo.body}</td>
          `;
          tableBody.appendChild(row);
      });
  };
  
  const fetchInProgressData = async () => {
      try {
          const response = await fetch('http://localhost:3000/InProgress');
          if (!response.ok) {
              throw new Error('Failed to fetch InProgress data');
          }
          const InProgressData = await response.json();
          displayInProgressData(InProgressData);
      } catch (error) {
          console.error('Error fetching InProgress data:', error);
      }
  };
  
  const displayInProgressData = (InProgressData) => {
      const tableBody = document.getElementById('table-body');
  
      // Clear existing table rows
      tableBody.innerHTML = '';
  
      // Iterate through each comment and create a table row
      commentsData.forEach(comment => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${InProgress.id}</td>
              <td>${InProgress.title}</td>
              <td>${InProgress.body}</td>
          `;
          tableBody.appendChild(row);
      });
    };
  
    
    const fetchCompleteData = async () => {
        try {
            const response = await fetch('http://localhost:3000/complete');
            if (!response.ok) {
                throw new Error('Failed to fetch complete data');
            }
            const completeData = await response.json();
            displayCompleteData(completeData);
        } catch (error) {
            console.error('Error fetching complete data:', error);
        }
    };
    
    const displayCompleteData = (commentsData) => {
        const tableBody = document.getElementById('table-body');
    
        // Clear existing table rows
        tableBody.innerHTML = '';
    
        // Iterate through each comment and create a table row
        completeData.forEach(complete => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${complete.id}</td>
                <td>${complete.title}</td>
                <td>${complete.body}</td>
            `;
            tableBody.appendChild(row);
        });
    };
    
    const fetchCommentsData = async () => {
        try {
            const response = await fetch('http://localhost:3000/comments');
            if (!response.ok) {
                throw new Error('Failed to fetch comments data');
            }
            const commentsData = await response.json();
            displayCommentsData(commentsData);
        } catch (error) {
            console.error('Error fetching comments data:', error);
        }
    };
    
    const displayCommentsData = (commentsData) => {
        const tableBody = document.getElementById('table-body');
    
        // Clear existing table rows
        tableBody.innerHTML = '';
    
        // Iterate through each comment and create a table row
        commentsData.forEach(comment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${comment.id}</td>
                <td>${comment.title}</td>
                <td>${comment.body}</td>
            `;
            tableBody.appendChild(row);
        });
    };
    
  
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
        
        addCommentToUI(newComment);
       
        commentForm.reset();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
  
    const addCommentToUI = (comment) => {
      const commentsElement = document.querySelector('#comments-list');
      const commentElement = document.createElement('li');
      commentElement.textContent = comment.content;
      commentsElement.appendChild(commentElement);
    };
  
    fetchUsersData();
    fetchToDoData();
    fetchInProgressData();
    fetchCompleteData();
    fetchCommentsData();
  
    const commentForm = document.querySelector('#comment-form');
    commentForm.addEventListener('submit', handleCommentFormSubmit);
  });