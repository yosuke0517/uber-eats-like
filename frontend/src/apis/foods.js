import axios from 'axios';
import {foodsIndex, restaurantsIndex} from '../urls/index'

export const fetchFoods = async (restaurantId) => {
    const res = await axios.get(foodsIndex(restaurantId)).catch((e) => {
        console.error(e)
    })
    return res.data
}