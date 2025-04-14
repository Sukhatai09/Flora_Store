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
    checkLoginStatus: () => Promise<void>;
    refresh: (id:string) => Promise<void>;

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
            await AsyncStorage.setItem('customer', JSON.stringify(customer));
            set({ token, customer, isLoggedIn: true });
        } catch (error) {
            console.error('Login error:', error);
        }
    },
    logout: async () => {
        await axios.get(`${API_URL}/logout`);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('customer');
        set({ token: null, customer: null, isLoggedIn: false });
    },
    refresh: async (id) => {
        try{
            const oldUser = await AsyncStorage.getItem('customer');
            
            if (oldUser) {
                const user = JSON.parse(oldUser);
                const res = await axios.get(`${API_URL}/user/${id}` )
                
                await AsyncStorage.setItem('customer', JSON.stringify(res.data)); // เพิ่มตรงนี้
                set({ customer: res.data });
            }
        }catch(error) {
            console.error('Refresh error:', error);
        }
    },
    checkLoginStatus: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const customer = await AsyncStorage.getItem('customer');
            if (token && customer) {
                set({ token, customer: JSON.parse(customer), isLoggedIn: true });
            } else {
                set({ token: null, customer: null, isLoggedIn: false });
            }
        } catch (error) {
            console.error('Check login status error:', error);
        }
    },

}));