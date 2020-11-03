import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { number, object, string } from 'yup'
import countries from '../../countries'
import { firestore } from '../../firebase'
import ErrorDiv from './ErrorDiv'
import './PrefForm.module.css'
import Select from './Select'
import { LoadingOutlined } from '@ant-design/icons'

async function setUserData (user, data) {
  if (user.isAnonymous) return
  const userRef = firestore.doc(`users/${user.uid}`)
  try {
    await userRef.set({ ...data })
  } catch (error) {
    throw Error(error)
  }
}

const PrefForm = ({ user, userInfo }) => {
  const [error, setError] = useState(false)

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: userInfo.name || user.displayName || '',
        livingCountry: userInfo.livingCountry,
        displayCountry: userInfo.displayCountry,
        age: userInfo.age || ''
      }}
      validationSchema={object({
        name: string().min(2).required(),
        livingCountry: string().oneOf(countries, 'That is not a valid country').required().label('Living Country'),
        displayCountry: string().oneOf(countries, 'That is not a valid country').required().label('Display Country'),
        age: number().integer().min(18, 'You must be at least 18 years old').required().label('Age')
      })}
      onSubmit={async (values) => {
        try {
          await setUserData(user, values)
        } catch (error) {
          setError(error)
          setTimeout(() => setError(false), 2500)
        }
      }}
    >
      {formik =>
        <Form className='flex-1 space-y-3'>
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
            <Select options={countries} name='displayCountry'/>
            <ErrorMessage name="displayCountry" component={ErrorDiv}/>
          </div>

          <div>
            <label htmlFor="age">Age: </label>
            <Field id="age" name="age" />
            <ErrorMessage name="age" component={ErrorDiv}/>
          </div>
          {error && <ErrorDiv>{error.message}</ErrorDiv>}
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-1/5 block ml-auto rounded focus:outline-none focus:shadow-outline' disabled={formik.isSubmitting} type="submit">{formik.isSubmitting ? <LoadingOutlined spin style={{ color: 'red' }}/> : 'Done'}</button>
        </Form>
      }
    </Formik>
  )
}

export default PrefForm
