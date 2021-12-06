import {categoryType} from "../types";
import axios from "axios";

export const fetch_Category_Per_sNumber = (input: string): Promise<categoryType> => {

    return new Promise((resolve, reject) => {
        axios.get(`/common/getCategory?g_owner=${input}`)
            .then(res => {
                resolve(res.data as categoryType);
            })
            .catch(err => {
                reject(err);
            })
    })

}
