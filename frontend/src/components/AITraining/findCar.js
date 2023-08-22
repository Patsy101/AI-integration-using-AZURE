//import { carStock } from "./car-stock.";

const carStock = [
    {
        id:"1",
        model: "Mazda",
        color: "blue",
    },
    {
        id:"2",
        model: "Toyota",
        color: "yellow",
    },
    {
        id:"3",
        model: "Honda",
        color: "red",
    }
];

const findCar = (tags) => {
    if(!tags.includes("car")) {
        return {error: "No car found"};
    }

    let matchingCars = [];

    carStock.some((e) => {
        if(Object.values(e).some((i) => {
            return tags.includes(i);
        })) {
            matchingCars.push(e);
            return true;
        }
        else { return false; }
    });
    if (matchingCars.length>0){
        return matchingCars;
    }
    else return {error: 'we have no matching cars'};
};


export default findCar;