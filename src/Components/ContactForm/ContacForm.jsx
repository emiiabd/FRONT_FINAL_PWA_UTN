import React, { useRef, useState } from "react";
import './ContacForm.css'
import MapAutocompleteComponent from "../MapAutoComplete/MapAutoComplete";
import ReCAPTCHA from "react-google-recaptcha";
import { ENVIROMENT, FORM_SCHEMA } from "../../Data/data";
import useForm from "../../Hooks/useForm";
import { useGlobalContext } from "../../Context/GlobalContext";
import { Alert } from "react-bootstrap";

const   ContacForm = ({ title, spanTitle}) => {

  const recaptchaRef = useRef(null);
  const { errorsValues } = useGlobalContext();
  //Schema
  const { getForm, getValidateSchema, validatesFormInputs } = useForm(['name', 'phone', 'location', 'typeOfWork', 'commentBox']);
  
  const contactSchema = getForm();
  const validationContact = getValidateSchema();
  

  const renderForm = [];
  for(const prop in contactSchema){
    if(prop == 'location'){
      renderForm.push(
        <MapAutocompleteComponent key={prop}/>
      );
    }
    else if(prop == 'commentBox'){
      renderForm.push(
        <div className="form-floating mb-3" key={prop}>
          <textarea
            name={prop}
            id={FORM_SCHEMA[prop].id}
            placeholder={FORM_SCHEMA[prop].labelText}
            className={FORM_SCHEMA[prop].className}
          />
          <label htmlFor={FORM_SCHEMA[prop].id}>{FORM_SCHEMA[prop].labelText}</label>
        </div>
      );
    }
    else if(prop == 'typeOfWork'){
      renderForm.push(
        <div className="form-floating mb-3" key={prop}>
          <select
            className={FORM_SCHEMA[prop].className}
            id={FORM_SCHEMA[prop].id}
          >
              {FORM_SCHEMA[prop].options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            <label htmlFor={FORM_SCHEMA[prop].id}>{FORM_SCHEMA[prop].labelText}</label>
        </div>
      )
    }
    else {
      renderForm.push(
        <div className="form-floating mb-3" key={prop}>
          <input
            type={FORM_SCHEMA[prop].type}
            name={prop}
            id={FORM_SCHEMA[prop].id}
            placeholder={FORM_SCHEMA[prop].labelText}
            className={FORM_SCHEMA[prop].className}
            required
          />
          <label htmlFor={FORM_SCHEMA[prop].id}>{FORM_SCHEMA[prop].labelText}</label>
        </div>
      );
    }
  };

  const handleOnSubmitContactForm = (e, ReCaptcha) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    validatesFormInputs(validationContact, formData, ReCaptcha);
    
    console.log(errorsValues)
    
  }

  return (
    <>
    <form action="" onSubmit={(e) => handleOnSubmitContactForm(e, recaptchaRef.current.getValue())} className="form text-center">
      <div className="pb-4">
        {
          title &&<h3>{title}</h3>
        }
        {
          spanTitle &&<span>{spanTitle}</span>
        }
      </div>
      {/* Inputs */}
      {renderForm}
      {/* ReCAPTCHA */}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={ENVIROMENT.G_CAPTCHA_API_KEY}
        className="mb-3 d-flex justify-content-center"
        hl="es"
      />
      {
        errorsValues.map((i, index) => {
          if(i){
            return <Alert key={index} variant='danger' className="text-center mb-3 p-1 form-floating">{i}</Alert>
          }
        })
      }
      <button type="submit" className="btn btnSubmit w-50 btn-primary mb-3">
        Pedir Cotizacion
      </button>
    </form>
    </>
  );
};

export default ContacForm;
