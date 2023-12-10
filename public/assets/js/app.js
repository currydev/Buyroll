document.addEventListener('DOMContentLoaded', () => {
    const customerList = document.getElementById('customer-list');
  
    fetch('http://localhost:3001/api/customers')
      .then(response => response.json())
      .then(customers => {
        customers.forEach(customer => {
          const customerCard = document.createElement('div');
          customerCard.className = 'customer-card';
          customerCard.innerHTML = `
            <h3>${customer.firstName} ${customer.lastName}</h3>
            <p>Email: ${customer.email}</p>
          `;
          customerList.appendChild(customerCard);
        });
      });
  });
  