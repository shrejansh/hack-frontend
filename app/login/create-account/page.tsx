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
import { post } from '../../../api-handler';

export default function CreateAccount(){
  const [ empId, setEmpId ] = useState<string>('');
  const router = useRouter();

  async function handleCreate(){

    const response = await post('create-user', {employee_id: empId});
    if(response?.success){
      notifications.show({
        color: 'green',
        title: 'New Account Created',
        message: 'You can login now'
      });
      router.push('/login');
    }
    if(!response?.success){
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Could not create new account'
      });
    }

  }

return (
    <Container size={420} my={40}>
        <Title ta="center" >
          Create Account
        </Title>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Employee ID" placeholder="employee ID" required onChange={(e) => setEmpId(e.target.value)}/>
          <Button fullWidth mt="xl" onClick={handleCreate}>
            Create Account
          </Button>
        </Paper>
      </Container>
)
}