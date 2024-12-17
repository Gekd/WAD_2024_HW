<template>
  <div class="contact-container">
    <div class="contact-box">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach us at:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:contact@example.com">contact@example.com</a></li>
        <li><strong>Phone:</strong> <a href="tel:+3721234567890">+372 123 456 7890</a></li>      
      </ul>
    </div >
  </div>
</template>

<script>
export default {
  name: 'ContactView',
};
</script>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  min-height: calc(100vh - 190px);
  padding: 60px 20px; 
  background-color: #f0f0f0;
  box-sizing: border-box;  
  border-radius: 24px;
}

.contact-box {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 400px;
  width: 100%;
  margin-top: 20px;  
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px; 
}

p {
  color: #666;
  margin-bottom: 15px;
  font-size: 16px;  
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  color: #444;
  font-size: 16px; 
}

strong {
  color: #007bff;
  font-weight: bold;
}

@media (max-height: 600px) {
  .contact-container {
    align-items: center;
    padding: 20px;
  }

  .contact-box {
    margin-top: 0;
  }
}
</style>