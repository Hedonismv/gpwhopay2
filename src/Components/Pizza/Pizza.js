import React, {useContext} from 'react';
import './pizza.css';
import {PaymentContext} from "../../App";

const Pizza = ({guests, eaters, slices}) => {

	const {isLoaded} = useContext(PaymentContext)

	return (
		<div className={`content ${isLoaded ? '' : 'hide'}`} id="content_block">
			<div className="pizza_container" id="pizza_visible">
				<div className="pizza_content">
					<div className="basil">
						<div className="leaf"/>
					</div>
					<div className="onions"/>
					<div className="olives"/>
					<div className="pepperonis"/>
					<div className="slices" id="pizza">
						{slices.map(slice =>
							<div key={slice.degree} className={'pizza_slice'} style={{transform: `rotate(${slice.degree}deg)`}}/>
						)}
					</div>
				</div>
			</div>
			<div className={'content_info'}>
				<span>Total participants: {guests.length}</span>
				<span>Pizza lovers: {eaters.length}</span>
			</div>
		</div>
	);
};

export default Pizza;