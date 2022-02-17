// fetch all guests 1st func
export const fetchGuests = () => {
	return 	fetch("https://gp-js-test.herokuapp.com/pizza/guests")
				.then((response) => response.json())
				.then((fetchData) => {
					return fetchData.party
				})
				.catch((error) => {
					console.log(error);
				});
};

// 5 func request the dietBook and get diet data
export const fetchDietBook = async (dietLink) => {
  return fetch(dietLink)
      .then((response) => response.json())
      .then((dietBookData) => {
        return dietBookData.diet
      })
      .catch((error) => {
        console.log(error);
      });
};

// 9 func but need to request sync with a orderPizza func
export const fetchCurrency = async () => {
  return fetch("https://gp-js-test.herokuapp.com/pizza/currency")
      .then((response) => response.json())
      .then((currency) => {
        return currency
      })
      .catch((e) => console.log(e));
};

// 8 func request order pizza
export const orderPizza = async (pizzaLink) => {
  return fetch(pizzaLink)
      .then((response) => response.json())
      .then((pizzaData) => {
		  return pizzaData
      })
      .catch((e) => console.log(e));
};

export const currencyAndOrder = (orderUrl) => {
	const currencyUrl = "https://gp-js-test.herokuapp.com/pizza/currency"
	const requestArr = [orderUrl, currencyUrl]
	const requests = requestArr.map(url => fetch(url))

	return Promise.all(requests)
		.then(responses => Promise.all(responses.map(r => r.json())))
		.then(data => data)
		.catch(e => console.log(e))
}
    .catch((e) => console.log(e));
};
