import React, { useContext, useState } from 'react';
import { useFlutterwave } from 'flutterwave-react-v3';
import { UserContext } from '../../DashBoard';
import axios from "axios";


    const CreditCardForm = () => {

        const { REACT_APP_FLUTTER_WAVE_PUBLIC_KEY, REACT_APP_FLUTTER_WAVE_SECRET_KEY, REACT_APP_AUTH_BASE_URL } = process.env;
        
        const userInfo = useContext(UserContext);
    

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expirationDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({
        cardNumber: '',
        cardName: '',
        expirationDate: '',
        cvv: '',
    });



    



    const handleInputChange = (e) => {
        const { name, value } = e.target;


        if (name === 'cardNumber' && value.length <= 16) {
            setFormData({
            ...formData,
            [name]: value, // Allow only numbers
            });
        } else if (name === 'cardName' ) {
            setFormData({
            ...formData,
            [name]: value, // No restrictions on cardName and CVV
            });
        } else if (name === 'expirationDate' && value.length <= 5 ) {
            if(value.length === 2 && formData.expirationDate.length === 1){
                setFormData({
                    ...formData,
                    [name]: value + '/',
                });
            }else{
                setFormData({
                    ...formData,
                    [name]: value ,
                });
            }
            
            // Allow only numbers and '/', restrict to MM/YY format
            

        }else if(name === 'cvv' && value.length <= 3){
            setFormData({
                ...formData,
                [name]: value, // No restrictions on cardName and CVV
            });
        }
    }
        

    const { flutterwave } = useFlutterwave({
        public_key: REACT_APP_FLUTTER_WAVE_PUBLIC_KEY,
        secret_key: REACT_APP_FLUTTER_WAVE_SECRET_KEY,
      });
      
    
    const handleAddCard = async () => {
        const response = await flutterwave.charge({
          amount: 0,
          currency: "NGN",
          payment_method: "card",
          card_token: "",
          customer: {
            email: "johndoe@example.com",
            phone_number: "08001234567",
          },
        });
      
        if (response.status === "success") {
          // Card token created successfully
          const cardToken = response.data.card_token;
          // Save the card token in your database
        } else if (response.status === "error") {
          // There was an error creating the card token
          const errorMessage = response.message;
          alert(errorMessage);
        }
      };






    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Invalid card number';
        }

        if (!formData.cardName) {
        newErrors.cardName = 'Card name is required';
        }

        if (!formData.expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expirationDate = 'Invalid expiration date (MM/YY)';
        }

        if (!formData.cvv.match(/^\d{3,4}$/)) {
            newErrors.cvv = 'Invalid CVV';
        }

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === '')) {
            const { cardName,cardNumber,expirationDate,cvv } = formData
            const payload = {
                    "card_number":cardNumber,
                    "expiry_month":expirationDate.substring(0,2),
                    "expiry_year":expirationDate.substring(3),
                    "cvv":cvv
                  }
             axios({
                url:`${REACT_APP_AUTH_BASE_URL}/card/add`,
                method:'POST',
                data:{...payload},
                headers:{'Authorization':`Bearer ${userInfo.token}`, 'Content-Type':'application/json'},
             }).then((response)=>{
                console.log(response)
             }).catch((error)=>{
                console.log(error)
             })
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Credit Card Information</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                Card Number
            </label>
            <input
                type="number"
                id="cardNumber"
                name="cardNumber"
                className={`w-full p-2 border tracking-widest ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                } rounded`}
                onChange={handleInputChange}
                value={formData.cardNumber}
            />
            {errors.cardNumber && <p className="text-red-500 mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="mb-4">
            <label htmlFor="cardName" className="block text-gray-700 font-medium mb-2">
                Name on Card
            </label>
            <input
                type="text"
                id="cardName"
                name="cardName"
                className={`w-full p-2 border ${
                errors.cardName ? 'border-red-500' : 'border-gray-300'
                } rounded`}
                onChange={handleInputChange}
                value={formData.cardName}
            />
            {errors.cardName && <p className="text-red-500 mt-1">{errors.cardName}</p>}
            </div>
            <div className="flex mb-4">
            <div className="w-1/2 mr-2">
                <label htmlFor="expirationDate" className="block text-gray-700 font-medium mb-2">
                Expiration Date
                </label>
                <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    className={`w-full p-2 border ${
                        errors.expirationDate ? 'border-red-500' : 'border-gray-300'
                    } rounded`}
                    placeholder="MM/YY"
                    onChange={handleInputChange}
                    value={formData.expirationDate}
                />
                {errors.expirationDate && <p className="text-red-500 mt-1">{errors.expirationDate}</p>}
            </div>
            <div className="w-1/2 ml-2">
                <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
                CVV
                </label>
                <input
                    type="number"
                    id="cvv"
                    name="cvv"
                    className={`w-full p-2 border ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                    } rounded`}
                    onChange={handleInputChange}
                    value={formData.cvv}
                />
                {errors.cvv && <p className="text-red-500 mt-1">{errors.cvv}</p>}
            </div>
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
            Submit
            </button>
        </form>
        </div>
    );
    };

export default CreditCardForm;
