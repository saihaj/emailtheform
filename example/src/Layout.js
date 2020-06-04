/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { string } from 'prop-types'
import { Container, Jumbotron } from 'react-bootstrap'

const Layout = ( { title, bgColor, txtColor, ...props } ) => (
  <>
    {title && (

    <Jumbotron
      style={{
        backgroundColor: bgColor,
        color: txtColor,
      }}
    >
      <div className="site-heading">
        <h1 className="text-center">{title}</h1>
      </div>

    </Jumbotron>
    )}

    <Container>
      {props.children}
    </Container>

  </>
)

Layout.propTypes = {
  title: string,
  bgColor: string,
  txtColor: string,
}

Layout.defaultProps = {
  title: null,
  bgColor: '#FFF',
  txtColor: '#000',
}

export default Layout
