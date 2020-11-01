import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { object, string } from 'yup'
import countries from '../../countries'
import ErrorDiv from './ErrorDiv'
import './PrefForm.module.css'
import Select from './Select'

const PrefForm = ({ user }) => {
  return (
    <Formik
      initialValues={{
        name: user.displayName || '',
        livingCountry: user.livingCountry,
        displayCountry: user.displayCountry
      }}
      validationSchema={object({
        name: string().min(2).required(),
        livingCountry: string().oneOf(countries).required(),
        displayCountry: string().oneOf(countries).required()
      })}
      onSubmit={(values) => {}}
    >
      <Form className='w-full max-w-md mx-auto space-y-3'>
        <div>
          <label htmlFor="name">Name: </label>
          <Field id="name" name="name" />
          <ErrorMessage name="name" component={ErrorDiv}/>
        </div>

        <div>
          <label htmlFor="livingCountry">Living Country: </label>
          <Select options={countries} name='livingCountry'/>
          <ErrorMessage name="livingCountry" component={ErrorDiv}/>
        </div>

        <div>
          <label htmlFor="displayCountry">Display Country: </label>
          <Select options={countries} name='displayCountries'/>
          <ErrorMessage name="displayCountry" component={ErrorDiv}/>
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 ml-auto rounded focus:outline-none focus:shadow-outline' type="submit">Done</button>
      </Form>
    </Formik>
  )
}

export default PrefForm
