// Fetch and display friends
fetch('/api/friends')
    .then(response => response.json())
    .then(friends => {
        const friendsList = document.getElementById('friendsList');
        friends.forEach(friend => {
            friendsList.innerHTML += `<div>${friend.name}</div>`; // Adjust according to your data structure
        });
    });

// Fetch and display orders
fetch('/api/orders')
    .then(response => response.json())
    .then(orders => {
        const ordersList = document.getElementById('ordersList');
        orders.forEach(order => {
            ordersList.innerHTML += `<div>Order ID: ${order.id}</div>`; // Adjust according to your data structure
        });
    });