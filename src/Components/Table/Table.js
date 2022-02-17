import React, {useContext, useEffect, useState} from 'react';
import './table.css';
import TableItem from "../TableItem/TableItem";
import {PaymentContext} from "../../App";

const Table = ({diet, pizza}) => {
	const [collected, setCollected] = useState(0)
	const [toCollect, setToCollect] = useState(0)

	const {isLoaded} = useContext(PaymentContext)

	useEffect(() => {
		setCollected(0)
		setToCollect(0)
	}, [diet])

	useEffect(() => {
		if(pizza.price){
			setToCollect(pizza.price - collected)
		}
	}, [collected, pizza])


	return (
		<div className={`table_container ${isLoaded ? '' : 'hide'}`}>
			<table>
				<thead>
					<tr>
						<td>Name</td>
						<td>Share to pay</td>
						<td>Pay</td>
					</tr>
				</thead>
				<tbody>
					{diet.map((eater, index) =>
						<TableItem eater={eater} diet={diet} key={eater.name + index} pay={setCollected}/>
					)}
				</tbody>
				<tfoot>
					<tr>
						<td>Total Order</td>
						<td>{pizza.price} BYN</td>
						<td></td>
					</tr>
					<tr>
						<td>Money to collect</td>
						<td>{(toCollect.toFixed(1) < 0 ? 0 :toCollect.toFixed(1))} BYN</td>
						<td></td>
					</tr>
					<tr>
						<td>Money collected</td>
						<td>{collected.toFixed(1)} BYN</td>
						<td></td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default Table;