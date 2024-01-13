'use client'
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../../../firebase';
import { initializeApp } from 'firebase/app';
import LocalVariables from '../../../config';
import 'dotenv/config';

export default function CreateAccount(){
  const [ empId, sedEmpId ] = useState<string>('');
  const [ password, setPassword ]  = useState<string>('');

  async function handleCreate(){
    try{
      console.log('DEBUG entered');
    const response = await fetch(`${process.env.URL || LocalVariables.ENDPOINT}/create-user` , {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        // "Access-Control-Allow-Origin": process.env.URL || LocalVariables.ENDPOINT
        // 'Access-Control-Allow-Origin': true,
      },
      body: JSON.stringify({employee_id: empId}),
    });
    
    console.log(await response.json(),'DEBUG response');
  }catch(e: any){
    console.log('Error occurred', e.message);
  }

  }

return (
    <Container size={420} my={40}>
        <Title ta="center" >
          Create Account
        </Title>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Employee ID" placeholder="5 digit emplyee ID" required />
          {/* <PasswordInput label="Password" placeholder="Your password" required mt="md" /> */}
          
          <Button fullWidth mt="xl" onClick={handleCreate}>
            Create Account
          </Button>
        </Paper>
      </Container>
)
}