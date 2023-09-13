import axios from "axios";


export const sendVerificationMail = (email) => {
    if (email != null) {
        axios.post(`http://localhost:8080/api/v1/spatch/verification/send?email=${email}`).then(
            (response) => {
                if (response.status < 400) {
                    console.log(response)
                    window.location.assign("/signup/confirmation/verify_email")
                } else if (response.status === 401) {
                    return response
                } else {
                    console.log(`error form service`)
                    return;
                }
            }
        )
    }
}


export const ValidateMail =  () => {
debugger
  const query = new URLSearchParams(window.location.search);
  const { REACT_APP_BASE_URL } = process.env;
    if(query === ''){
        window.location.assign(`/404?error=no-auth`)
    }
  const encodedValue = query.get('token');
  const decodedValue = atob(encodedValue);
  const otp = decodedValue.substring(64, 70);
  const email = decodedValue.substring(70);

  if (otp !== undefined && email !== undefined) {
    if (otp.trim() !== '' && email.trim() !== '') {
  
        axios.post(`${REACT_APP_BASE_URL}/verification/verify?email=${email}&otp=${otp}`
        ).then(()=>{
            window.location.assign(`/signup/completion?token=${encodedValue}&status=success`);
        }).catch((error)=>{
              console.log('error : ' + error.response.data)
              console.log('error request : ' + error.request)  
        }) 
      }}
};


  export const validateForm = (field, fieldName) => {
    if(field === undefined || field === ''){
      return `${fieldName} is required.`
    } 
      if (fieldName === 'fullname') {
        const fullName = field.trim();
        if (fullName === '') {
          return 'Fullname cannot be Empty';
        } else if (!fullName.includes(' ')) {
          return ['Enter a valid fullname', 'fullname'];
        } else {
          return undefined;
        }
      } else if (fieldName === 'password') {
        if (field === '') {
          return 'Password cannot be Empty';
        } else if (field[0].length < 6) { 
          return 'Password must be 6 characters or more';
        } else {
          return undefined; // Error for passwords less than 6 characters
        }
      } else if (fieldName === 'mobile no.') {
        if (field.length === 0) {
          return 'Mobile no. is required';
        } else if (field.length !== 10) {
          return 'Mobile no. is invalid';
        } else {
          return undefined;
        }
      } else if (fieldName === 'email') {
         
        if (field === '' || field === undefined) {
          return 'Field is required';
        } else if (!/^\S+@\S+\.com$/.test(field)) {
          return 'Invalid email address';
        } else {
          return undefined;
        }
      } else if(fieldName === 'otp'){
        if(field === '' || field === undefined){
          return `Please enter otp!`
        }else if(field.length !== 6){
          return `Otp should be six characters`
        }else {
          return undefined
        }
      }
      
    };
  

export const completeRegistartion = async( data,email )=>{

         axios.post(`http://localhost:8080/api/v1/spatch/verification/verification_mobile?email=${email}`,data).then((response)=>{
        if(response.status < 400){
                localStorage.setItem('number',data.phoneNo)
                window.location.assign('/signup/confirmation/phone')
        }else if(response.status === 404 && response.data.message === `User with email :${email}was not found`){
                alert(`No account tied to provided email`)
        }else if(response.status === 401 && response.data.message === `Email has not been verified`){
                alert(`Account has not yet been verified`)
        }else if(response.status === 403 && response.data.message === `User has completed profile already`){
                window.location.assign('/')
        }else{
            alert(`An error occured in the server please contact our custormer care`)
        }
    }).catch((e)=>{
        alert(e)
        console.log(e)
    })
}

    export const resendMobileOtp  = async (number) => {
      try{
        await  axios.post(`http://localhost:8080/api/v1/spatch/verification/resend_mobile`)
        window.location.assign(`${window.location.href}/status=resent`)
      }catch(error){
        if(error.response.data.message && error.response.status === 403){
            alert(error.response.data.message)
            setTimeout(()=>{
                window.location.assign('/dashboard')
            })
          }else if(error.response.status === 401 && error.response.data.message){
            alert(error.response.data.message)
          }else if( error.response.status === 403){
              window.location.assign('/404?error=user-not-found')
        }
      
      }
    }


    export const validateMobileNo = (mobile,otp) => {
        axios.post(`http://localhost:8080/api/v1/spatch/verification/verify_mobile`,{mobile,otp}).then(
            (response)=>{
                if(response.status < 400){
                    window.location.assign('/signup/confirmation/verify_mobile')
                }
            }).catch((error)=>{
                
                console.log(error)
            })            
    }



    export const sendResetPasswordOtp = async ( email ) => {
      let response;
      try{
        response = await axios.post(`http://localhost:8080/api/v1/spatch/user/reset_password/send?email=${email}`)
        window.location.assign(`/password-reset/confirmation?user=${email}`)
      }catch(error){
          alert(error)
      }
    }

    export const validateResetPasswordOtp = async ( email, otp ) =>{
      let response;
      try{
        response = await axios.post(`http://localhost:8080/api/v1/spatch/user/reset_password/verify?email=${email}&otp=${otp}`)
        window.location.assign(`/password-reset/completion?user=${email}`)
      }catch(error){
          alert(error.response.data.message)
      }
    }

    export const resetPassword = async (data) => {
      let response;
      try{
        response = await axios.post(`http://localhost:8080/api/v1/spatch/user/reset_password`,data)
        window.location.assign(`/signup/confirmation/welcome_back`)
      }catch(error){
        alert(error.response.data.message)
      }
    }




