import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import './ContactForm.css'

const contactFormOptions = [
  { id: 'name', type: 'text', placeholder: 'Name', controlId: 'formName' },
  { id: 'email', type: 'email', placeholder: 'Email Address', controlId: 'formEmail' },
  { id: 'phone', type: 'tel', placeholder: 'Phone Number', controlId: 'formPhone' },
  { id: 'message', type: 'text', placeholder: 'Message', controlId: 'formMessage', asType: 'textarea' },
]

// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const ContactForm = () => {
  const [ formSubmit, setFormSubmit ] = useState( false )
  const [ submissionSuccess, setSubmissionSuccess ] = useState( false )

  const formik = useFormik( {
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },

    validationSchema: Yup.object().shape( {
      name: Yup.string()
        .min( 2, '*Names must have at least 2 characters' )
        .max( 100, "*Names can't be longer than 100 characters" )
        .required( '*Name is required' ),
      email: Yup.string()
        .email( '*Must be a valid email address' )
        .max( 100, '*Email must be less than 100 characters' )
        .required( '*Email is required' ),
      phone: Yup.string()
        .matches( phoneRegExp, '*Phone number is not valid' )
        .min( 10 )
        .required( '*Phone number is required' ),
      message: Yup.string()
        .min( 10, '*Too Short! Tell us more' )
        .required( '*Message is required' ),
    } ),

    onSubmit: values => {
      const postRequest = {
        name: values.name,
        from_email: values.email,
        to_email: 'YOUREMAIL@DOMAIN.TLD',
        phone: values.phone,
        subject: 'Contact Form: EmailTheForm',
        message: values.message,
      }

      // Make call to serverless code
      fetch( 'http://0.0.0.0:7071/api/EmailTheForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( postRequest ),
      } )
        .then( response => {
          setFormSubmit( true )
          if ( response.ok ) setSubmissionSuccess( true )
        } )
    },

  } )

  const renderContent = () => {
    // Display form
    if ( !formSubmit ) {
      return (
        <Form onSubmit={formik.handleSubmit}>

          {contactFormOptions.map( ( { id, type, placeholder, controlId, asType } ) => (

            <Form.Group key={id} controlId={controlId}>

              <Form.Control
                required
                name={id}
                type={type}
                placeholder={placeholder}
                as={asType}
                {...formik.getFieldProps( id )}
              />

              {formik.touched[ id ] && formik.errors[ id ] ? (
                <div className="error-message">{formik.errors[ id ]}</div>
              ) : null}

            </Form.Group>

          ) )}

          <Button type="submit" disabled={formik.isSubmitting}>Submit form</Button>

        </Form>
      )
    }

    // Response was sent
    if ( submissionSuccess ) {
      return (
        <Container>

          <h4 className="text-center">
            We will get back to you soon!
          </h4>

        </Container>
      )
    }

    // Failed to send response
    return (
      <Container>

        <h4 className="text-center fail">
          There was an error. Please try again!!!
        </h4>

      </Container>
    )
  }

  return (
    <div className="contact-form">{renderContent()}</div>
  )
}
