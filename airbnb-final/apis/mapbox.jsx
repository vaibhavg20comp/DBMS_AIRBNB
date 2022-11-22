import axios from "axios";

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers:{
        Authorization:'Client-ID YxhIksDK9G2iUQOteuiLI4nbHj8EGNxCtYeip5Acu_E'
    }
})