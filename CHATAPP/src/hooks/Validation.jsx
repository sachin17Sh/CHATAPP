const useValidation = ()=>{
    const validate = values => {
        let errors = {}
        if (!values.name) {
          errors.name = "Name must be entered"
        }
      
        if (!values.email) {
          errors.email = 'Email Address is mandatory';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.userName) {
          errors.userName = "Enter Valid User Name"
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!values.password) {
          errors.password = 'Please set a password';
        } else if (!passwordRegex.test(values.password)) {
          errors.password = 'Password must have minimum eight characters, one letter and one number';
        }
        return errors
      }
      return validate
}

export default useValidation;