import { Button, Modal, Text } from "@mantine/core";
import useGlobal from "../store";
import { useEffect, useState } from "react";
import ChallengeForm from "./challengeForm";
import { useRouter } from 'next/navigation'

export default function Header(){
    const router = useRouter();
    const employeeId = useGlobal((state: any) => state.employeeId);
    const token = useGlobal((state: any) => state.token);
    const setToken = useGlobal((state: any) => state.setToken);
    const setEmployeeId = useGlobal((state: any) => state.setEmployeeId);
    const [ visible, setVisible ] = useState<boolean>(false);

    useEffect(()=> {
        if(token?.length === 0){
            router.push('/login');
        }
    }, [token])
    return(
        <>
        <Modal opened={visible} onClose={() => setVisible(false)} title="New Challenge">
            <ChallengeForm setVisible={setVisible}/>
        </Modal>
        <div style={{ paddingBottom: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            {employeeId ? (
                <Text fw={900} style={{ fontSize: 36 }}>Welcome {employeeId}</Text>
            ): null}
            <Button type="submit" onClick={() => {
                setToken('');
                setEmployeeId('');
            }}>Logout</Button>
        </div>
        </>
    )
}