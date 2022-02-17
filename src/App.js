import React, {createContext, useEffect, useState} from "react";
import "./styles.css";
import {
    filterEaters,
    generateLink,
    calcVegans,
    choosePizza,
    exchangePizza, calcDegrees
} from "./assets/helpers";
import {currencyAndOrder, fetchDietBook, fetchGuests} from "./fetch/fetch";
import Table from "./Components/Table/Table";
import Pizza from "./Components/Pizza/Pizza";

export const PaymentContext = createContext()

export default function App() {

    const [guests, setGuests] = useState([]); // All guests
    const [eaters, setEaters] = useState([]); // filtered guests
    const [dietGuests, setDietGuests] = useState([]); // Eaters vs Vegan or not flag
    const [pizzaData, setPizzaData] = useState() // from Promise.all (pizza,currency)
    const [pizza, setPizza] = useState([]) // pizza with converted price
    const [isLoaded, setLoaded] = useState(false) // content manage
    const [loading, setLoading] = useState(false) // for styling
    const [slices, setSlices] = useState([])

    const generateSlice = () => {
        const degrees = calcDegrees(dietGuests)
        let deg = degrees;
        let degObject = [{degree: deg}]
        const count = dietGuests.length / 2
        for (let i = 0; i < count; i++) {
            if(i > 0){
                degObject = [...degObject, {degree: deg}]
                deg = deg + degrees;
            }else{
                deg = deg + degrees;
            }
        }
        setSlices(degObject)
    }



    const loadHandler = () => {
        setLoaded(false)
        setLoading(true)
        fetchGuests().then(r => setGuests(r))
    }

    const filterObj = () => {
        const sorted = filterEaters(guests)
        setEaters(sorted)
    }

    const generateLinkAndFetchDietBook = () => {
        if(eaters.length){
            const names = eaters.map((eater) => {
                return eater.name.split(" ");
            });
            const dietLink = generateLink(names)
            fetchDietBook(dietLink).then(dietPeople => setDietGuests(dietPeople))
        }
    }

    const orderAndCalc = () => {
        if(dietGuests.length){
            const vegs = calcVegans(dietGuests)
            generateSlice()
            const pizzaLink = choosePizza(vegs, dietGuests)
            currencyAndOrder(pizzaLink).then(data => setPizzaData(data))
        }
    }

    const exchange = () => {
        if(pizzaData){
            const pizza = exchangePizza(pizzaData) // READY PIZZA
            setPizza(pizza)
            setLoaded(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        exchange()
    }, [pizzaData])


    useEffect(() => {
        orderAndCalc()
    }, [dietGuests])

    useEffect(() => {
        generateLinkAndFetchDietBook()
    },[eaters])

    useEffect(() => {
        filterObj()
    },[guests])


    return (
        <PaymentContext.Provider value={{dietGuests, isLoaded, loading, pizza}}>
            <div className="App">
                <button id={`download_btn`} className={loading ? 'loading' : ''} onClick={() => loadHandler()}><span>Load</span></button>
                {loading
                  ? <div className={'loading_block'}>
                        <h1>Loading...</h1>
                    </div>
                  : null
                }
                <Table diet={dietGuests} pizza={pizza}/>
                <Pizza guests={guests} eaters={eaters} slices={slices}/>
            </div>
        </PaymentContext.Provider>
    );
}
