'use client'

import { useEffect, useState } from "react"
import { get } from "../../api-handler";
import useStore from "../store";
import { Card, Grid, Text, Affix, Button, Modal, Select } from "@mantine/core";
import Challenges from "./challenges";
import ChallengeForm from "./challengeForm";
import Header from "./header";

export default function HomePage(){
    const [ data, setData ] = useState<any>([]);
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ contentVisible, setContentVisible ] = useState<boolean>(false);
    const [ sortBy, setSortBy ] = useState<string | null>('');
    const token = useStore((state: any) => state.token);
    useEffect(()=> {
        async function getData() {
            const resp = await get(`challenge?sortBy=${sortBy}`);
            setData(resp?.data);
        }
        
        getData();
    },[sortBy]);
    console.log(data, token, 'DEBUG something')
    return (
    <div style={{ padding: 50 }}>
        <Modal opened={visible} onClose={() => setVisible(false)} title="New Challenge">
            <ChallengeForm setVisible={setVisible}/>
        </Modal>
    <Header />
    <Select mb={24} label="Sort by" placeholder="Default" data={['upvotes', 'createdAt']} value={sortBy} onChange={setSortBy}/>
    <Challenges data={data} setContentVisible={setContentVisible}/>
    {visible || contentVisible ? null : (
        <Affix position={{ bottom: 50, right: 50 }}><Button onClick={() => setVisible(true)}>Create Challenge</Button> </Affix>
    )}
    </div>)
}