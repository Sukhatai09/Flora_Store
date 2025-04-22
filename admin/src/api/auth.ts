import axios from 'axios';
import { BASE_URL,Addmin} from './endpoint.api';

export const AddminOnly = async () => {
    return await axios.get(`${BASE_URL}${Addmin}`, {
        withCredentials: true,
    });
}