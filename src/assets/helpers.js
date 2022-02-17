//  func filter eaters
export const filterEaters = (guests) => {
	if (guests) {
		return guests.filter((guest) => guest.eatsPizza === true);
	}
};

//generate request link to dietBook API
export const generateLink = (splited) => {
	let link = `https://gp-js-test.herokuapp.com/pizza/world-diets-book/`;
	for (let i = 0; i < splited.length; i++) {
		if(i === splited.length - 1){
			link = link + `${splited[i][0]}%20${splited[i][1]}`;
		} else {
			link = link + `${splited[i][0]}%20${splited[i][1]},`;
		}
	}
	return link;
};

//func which calc vegans
export const calcVegans = (dietGuests) => {
	let vegs = 0;
	if (dietGuests) {
		dietGuests.forEach((dg) => {
			if (dg.isVegan) {
				vegs++;
			}
		});
	}
	return vegs;
};

// func which order pizza in depency of the vegs
export const choosePizza = (vegs, dietGuests) => {
	if (vegs > dietGuests.length - vegs) {
		const random = Math.floor(Math.random() * 2);
		const pizza = random ? "vegan" : "cheese";
		return `https://gp-js-test.herokuapp.com/pizza/order/${pizza}/12`;
	} else {
		return `https://gp-js-test.herokuapp.com/pizza/order/meat/12`;
	}
};

export const exchangePizza = ([pizza, currency]) => {
	const pizzaLabel = pizza.price.split(" ")[1];
	const pizzaPrice = +pizza.price.split(" ")[0];
	if (pizzaLabel !== "BYN") {
		const currCourse = currency[pizzaLabel];
		const newPrice = pizzaPrice * currCourse;
		return {
			...pizza,
			price: +newPrice.toFixed(1)
		};
	} else {
		return {
			...pizza,
			price: +pizzaPrice.toFixed(1)
		};
	}
};


export function calcDegrees(eaters) {
	const deg = 360 / eaters.length;
	return deg;
}


export function createPizzaSlice(deg) {
	let slice = document.createElement("div");
	slice.classList.add("pizza_slice");
	slice.style.transform = `rotate(${deg}deg)`;
	return slice;
}
