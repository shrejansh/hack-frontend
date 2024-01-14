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
import { notifications } from '@mantine/notifications';
import LocalVariables from '../../../config';
import { useRouter } from 'next/navigation';
import 'dotenv/config';

export default function CreateAccount(){
  const [ empId, setEmpId ] = useState<string>('');
  const [ password, setPassword ]  = useState<string>('');
  const router = useRouter();

  async function handleCreate(){
    try{
      console.log(JSON.stringify({employee_id: empId}), 'DEBUG entered');
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
    if(response.ok){
      const resp = await response.json();
      notifications.show({
        color: 'green',
        title: 'New Account Created',
        message: 'You can login now'
      })
      router.push('/login')
      console.log(resp,'DEBUG response');
    }
   
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
          <TextInput label="Employee ID" placeholder="5 digit emplyee ID" required onChange={(e) => setEmpId(e.target.value)}/>
          {/* <PasswordInput label="Password" placeholder="Your password" required mt="md" /> */}
          
          <Button fullWidth mt="xl" onClick={handleCreate}>
            Create Account
          </Button>
        </Paper>
      </Container>
)
}