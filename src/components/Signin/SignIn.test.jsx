import React from 'react'
import SignIn from './SignIn'
import renderer from 'react-test-renderer'
//import {users} from '../../../db.json'

it( 'render check' , ()=>{
    const tree = renderer.create(<SignIn/>)
    expect(tree).toMatchSnapshot()
} )