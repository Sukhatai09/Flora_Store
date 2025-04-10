import {create} from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contants from 'expo-constants';

const API_URL = Contants.expoConfig?.extra?.API_URL ;

interface Customer {
    customer_id:  String;   
    first_name:   String;
    last_name:    String;
    email:        String;   
    phone_number: String; 
    image_url:    String;
    address:      String;
}
interface AuthStore {
    customer: Customer | null;
    isLoggedIn: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;

}

export const useAuthStore = create<AuthStore>((set) => ({
    customer: null,
    isLoggedIn: false,
    token: null,
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const customer = response.data.user;
            const token = response.data.token;
            await AsyncStorage.setItem('token', token);
            set({ token, customer, isLoggedIn: true });
        } catch (error) {
            console.error('Login error:', error);
        }
    },
    logout: async () => {
        await axios.get(`${API_URL}/logout`);
        await AsyncStorage.removeItem('token');
        set({ token: null, customer: null, isLoggedIn: false });
    },
}));