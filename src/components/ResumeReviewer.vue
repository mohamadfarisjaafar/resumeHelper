<template>
    <div class="resume-reviewer-container">
      <h1>Resume Reviewer</h1>
  
      <!-- Resume Input -->
      <textarea v-model="resumeText" placeholder="Paste your resume here..." rows="10" cols="50"></textarea>
  
      <!-- Submit Button -->
      <button @click="getResumeFeedback">Review Resume</button>
  
      <!-- Resume Feedback -->
      <div v-if="feedback">
        <h2>Feedback</h2>
        <pre>{{ feedback }}</pre>
      </div>
  
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="loading">Loading...</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        resumeText: '',
        feedback: '',
        isLoading: false,
      };
    },
    methods: {
      async getResumeFeedback() {
        if (!this.resumeText.trim()) {
          alert('Please paste a resume!');
          return;
        }
  
        this.isLoading = true;
  
        try {
          const response = await fetch('http://localhost:3000/review-resume', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resume: this.resumeText }),
          });
  
          const data = await response.json();
          this.feedback = data.feedback;
        } catch (error) {
          console.error('Error:', error);
          alert('Error reviewing the resume!');
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-family: monospace;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  pre {
    background-color: #f4f4f4;
    padding: 10px;
  }
  
  .loading {
    font-size: 20px;
    color: blue;
    margin-top: 20px;
  }
  </style>
  