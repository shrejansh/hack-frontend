'use client'

import { useEffect, useState } from "react"
import { get } from "../../api-handler";
import useStore from "../store";
import { Card, Grid, Text } from "@mantine/core";

export default function HomePage(){
    const [ data, setData ] = useState<any>([]);
    const token = useStore((state: any) => state.token);
    useEffect(()=> {
        async function getData() {
            const resp = await get('challenge');
            setData(resp?.data);
        }
        
        getData();
    },[]);
    console.log(data, token, 'DEBUG something')
    return (
    <>
    <Grid grow>
        {data?.map((e)=> (
            < Grid.Col span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="xl" mt="md" fw={700}>{e.name}</Text>
                <Text size="md" fw={400} mt="sm" c="dimmed" truncate='end'>{e.description}</Text>
            </Card>
            </Grid.Col>
        ))}
    </Grid>
    </>)
}