fetch('https://booking-com.p.rapidapi.com/v2/hotels/search-by-coordinates?checkin_date=2024-05-25&room_number=1&checkout_date=2024-05-26&latitude=23.02579&adults_number=1&units=metric&filter_by_currency=INR&order_by=popularity&locale=en-gb&longitude=72.58727&page_number=0&children_number=2&include_adjacency=true&children_ages=5%2C0&class=5&price_filter=1', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '67e97149b7msh7f095fdb1e793cep17e98cjsn4f58f7f2c3bb',
    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log(data.results);
  for (a of data.results) {
    console.log(a.name)
    console.log(a.priceDetails.gross)
}
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
