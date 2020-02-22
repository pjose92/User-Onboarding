import React, { useState, useEffect } from "react";
import { withFormik, Form as MyForm, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

//========= Create Your Formik Form need to creat a form: ===================
// Name
// Email
// Password
// Terms of Service (checkbox)
// A Submit button to send our form data to the server.

// ========= need to Implement Form Validation and Error Messaging ==================
//  Using Yup, set up at least two different validations for 
// each field along with custom error codes that will display 
// on screen when validation fails.

//=============== need to make a POST request ==============

// Craft a POST request using axios that sends your form data to the 
// following endpoint: https://reqres.in/api/users
//  Verify using a console.log() that you are receiving 
//  a successful response back

// ============Need to Display Returned Data to Screen=================

//  Set up a state property called users that is initialized with an empty array

//  Every time you make a POST request, and get that new user data back, 
//  update your users state with the new user added to the array

//  Render users in your app. This can be done in the Form component, 
//  or you can pass the array down to another component 
//  and render the users there

const Form = ({ values, errors, touched, status }) => {
    console.log("Hello I am status", status);
    const [users, setUsers] = useState([]);

    
      useEffect(() => {
        if (status) {
          const { name, email, password } = status;
          const newUser = { name, email, password };
          setUsers([...users, newUser]);
        }
      }, [status]);


    return (
        <div className="column" style={{ maxWidth: "450px", margin: "0 auto" }}>
            <h2 className="header">
                <div className="content">
                    USER ONBOARDING
                    <div className="sub header">This is the place to get onboard</div>
                </div>
            </h2>
            <MyForm className="largeForm">
                <div>
                    {/* Nmae field starts here */}
                    <div className={`${touched.name && errors.name && `error`} field`}>
                        <div 
                        className={`fluid ${touched.name &&
                                    errors.name &&
                                    `error`} input`}
                                    >
                            <Field type="text" name="name" placeholder="Name Here" />
                        </div>
                        {touched.name && errors.name && (
                        <p style={{ color: "#9f3a38" }}>{errors.name}</p>
                        )}
                    </div>
                    {/* email field starts here  */}
                    <div className={`${touched.email && errors.email && `error`} field`}>
                        <div 
                            className={`fluid ${touched.email &&
                                    errors.email &&
                                    `error`} input`}>
                            <Field type="email" name="email" placeholder="Email Address"/>
                        </div>
                        {touched.email && errors.email && (
                         <p style={{ color: "#9f3a38" }}>{errors.email}</p>
                        )}
                    </div>
                    {/* Password field starts here  */}
                    <div
                        className={`${touched.password &&
                        errors.password &&
                        `error`} field`}
                        >
                    <div
                        className={`fluid ${touched.password &&
                        errors.password &&
                        `error`} input`}
                        >
                    <Field type="password" name="password" placeholder="enter your password"/>
                    </div>
                        {touched.password && errors.password && (
                        <p style={{ color: "#9f3a38" }}>{errors.password}</p>
                        )}
                    </div>
                    {/* confirm password starts here  */}
                    <div
                        className={`${touched.confirmPassword &&
                        errors.confirmPassword &&
                        `error`} field`}
                        >
                    <div
                        className={`fluid ${touched.confirmPassword &&
                        errors.confirmPassword &&
                        `error`} input`}
                        >
                    <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm your password"
                        />
                    </div>
                        {touched.confirmPassword && errors.confirmPassword && (
                        <p style={{ color: "#9f3a38" }}>{errors.confirmPassword}</p>
                        )}
                    </div>
                    {/* accept terms and condition field */}
                    <div className="field">
                        <div className="checkbox">
                            <Field
                                id="acceptTerms"
                                className="hidden"
                                type="checkbox"
                                name="acceptTerms"
                                checked={values.acceptTerms}
                              />
                              <label htmlFor="acceptTerms">
                                  Accept terms and conditions
                              </label>
                        </div>
                    </div>
                        {touched.acceptTerms && errors.acceptTerms && (
                        <p style={{ color: "#9f3a38" }}>{errors.acceptTerms}</p>
                        )}
                    <button type="submit" className="button" >Get Onboard!</button>
                </div>
            </MyForm>
            {/* borded users starts here  */}
            <div
                className="column"
                style={{ maxWidth: "450px", margin: "0 auto", marginTop: 30 }}
                >
            <h2 className="ui header">
                <div className="content">BOARDED USERS</div>
             </h2>
            <div role="list" className="list">
                {users &&
                users.map((user, index) => {
            return (
                <div role="listitem" className="item" key={index}>
                 <div className="content">
                    <div className="header">{user.name}</div>
                    {user.email}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
        </div>
    )
}

const FormWithFormik = withFormik({
    mapPropsToValues(props) {
      return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        confirmPassword: props.confirmPassword || "",
        acceptTerms: props.acceptTerms || false
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name Is Required"),
      email: Yup.string()
        .email("You must enter a valid email address")
        .required("Email address is required"),
      password: Yup.string().required("You must enter a valid password"),
      confirmPassword: Yup.string().test(
        "passwords-match",
        "Passwords must match",
        function(value) {
          return this.parent.password === value;
        }
      ),
      acceptTerms: Yup.boolean()
        .required(
          "Read and Accept Terms and Conditions"
        )
        .test(
          "is-true",
          "Must Agree To Terms to Continue",
          value => value === true
        )
    }),
    handleSubmit(values, { setStatus, resetForm }) {
      axios
        .post("https://reqres.in/api/users", values)
        .then(a => {
          setStatus(a.data);
          resetForm();
        })
        .catch(err => console.log(err));
    }
  })(Form);
  
  export default FormWithFormik;