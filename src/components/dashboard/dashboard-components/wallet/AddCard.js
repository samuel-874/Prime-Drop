import { useFlutterwave } from "flutterwave-react-v3";

 export   function  AddCard(){
// const Flutterwave = require('flutterwave-node-v3');

 /*    const { flutterwave } = useFlutterwave({
        public_key: process.env.REACT_APP_FLUTTERW_AVE_PUBLIC_KEY,
        secret_key: process.env.REACT_APP_FLUTTERWAVE_SECRET_KEY,
      });
      
      const handleAddCard = async () => {
        const response = await flutterwave.charge.card({
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
      }; */

      // Install with: npm i flutterwave-node-v3

/* const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const payload = {
    card_number: '4556052704172643',
    cvv: '899',
    expiry_month: '01',
    expiry_year: '23',
    currency: 'NGN',
    amount: '7500',
    email: 'user@example.com',
    fullname: 'Flutterwave Developers',
    tx_ref: 'YOUR_PAYMENT_REFERENCE',
    redirect_url: 'https://example_company.com/success',
    enckey: process.env.FLW_ENCRYPTION_KEY
}
flw.Charge.card(payload)
    .then(response => console.log(response)); */
      return (
        <div>
          h1
        </div>
      );
      
 }