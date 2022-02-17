import React, {useContext, useEffect, useState} from 'react';
import {PaymentContext} from "../../App";
import './tableItem.css';

const TableItem = ({pay, eater, diet}) => {
	const [isPaid, setIsPaid] = useState(false)
	const [persPayment, setPersPayment] = useState(0)

	const {pizza} = useContext(PaymentContext)

	useEffect(() => {
		setIsPaid(false)
		setPersPayment(pizza.price / diet.length)
	}, [pizza])

	const handlePayment = () => {
		setIsPaid(true)
		pay(prevState => prevState + persPayment)
		setPersPayment(0)
	}

	return (
		<tr>
			<td className={eater.isVegan ? 'vegan' : ''}>{eater.name}</td>
			<td>{persPayment.toFixed(1)} BYN</td>
			<td className={'pay_td'}>
				<button disabled={isPaid} onClick={() => handlePayment()} className={'table_pay_btn'}>
					{isPaid ? "PAID" : "PAY"}
				</button>
			</td>
		</tr>
	);
};

export default TableItem;