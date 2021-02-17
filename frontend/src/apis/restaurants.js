import axios from 'axios';
import { restaurantsIndex } from '../urls/index'

export const fetchRestaurants = async () => {
    const res = await axios.get(restaurantsIndex).catch((e) => {
        console.error(e)
    })
    return res.data
}