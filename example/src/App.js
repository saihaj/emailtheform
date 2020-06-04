import React from 'react'

import Layout from './Layout'
import { ContactForm } from './ContactForm'

const App = () => (
  <div className="App">
    <Layout title="Contact">
      <h6>
        NOTE: In order for this to work make sure that the function is running
      </h6>
      <p>
        Want to get in touch? Fill out the form below to send us a
        message and we will get back to you!
      </p>
      
      <ContactForm />

    </Layout>
  </div>

)

export default App
