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
 import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
 import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { post } from '../../api-handler';
import useGlobal from '../store';
import { notifications } from "@mantine/notifications";

 function AuthenticationTitle() {
    const router = useRouter();
    const setEmployeeId = useGlobal((state: any) => state.setEmployeeId);
    const token = useGlobal((state: any) => state.token);
    const setToken = useGlobal((state: any) => state.setToken);
    const employeeId = useGlobal((state: any) => state.employeeId);
    const [ empId, setEmpId ] = useState<string>('');
    async function handleSignIn(){
      const resp = await post('user', {employee_id: empId});
      if(resp?.success){
        setEmployeeId(resp?.data?.employee_id);
        setToken(resp?.data?.token);
      }
      if(!resp?.success){
        notifications.show({
          title: 'Error',
          color: 'red',
          message: `${resp?.message}`
        });
      }
      // console.log(token, employeeId, 'DEBUG after setting');
    }
    useEffect(()=> {
      if(token && employeeId){
        console.log(token, employeeId, 'DEBUG token set');
        router.push('/home');
        notifications.show({
          title: 'Success',
          color: 'green',
          message: `Successfully logged in`
        });
      }
    },[token, employeeId]);

    return (
      <Container size={420} my={40}>
        <Title ta="center" fw={900}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet? 
          <Anchor size="sm" component="button" onClick={() => router.push('/login/create-account')}>
            Create account
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="Enter 5 digit employee id" required onChange={(e) => setEmpId(e.target.value)}/>
          {/* <PasswordInput label="Password" placeholder="Your password" required mt="md" /> */}
          <Button fullWidth mt="xl" onClick={handleSignIn}>
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }

  export default AuthenticationTitle;