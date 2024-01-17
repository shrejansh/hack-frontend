import { Grid, Card, Text, Modal, Container, Badge } from "@mantine/core";
import { useEffect, useState } from "react";
import { ActionIcon } from '@mantine/core';
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { post, get } from "../../api-handler";
import useGlobal from "../store";
import moment from "moment";

export default function Challenges(props: any){
    const { data, setContentVisible } = props;
    const employeeId = useGlobal((state: any) => state.employeeId);
    const [visible, setVisible ] = useState<boolean>(false);
    const [ selected, setSelected ] = useState<any>({});
    const [ upvoted, setUpvoted ] = useState<boolean>(false);
    const [numUpvotes, setNumUpvotes] = useState<number>(0);
    const [ refresh, setRefresh ] = useState<boolean>(false);

    useEffect(()=> {
        async function handleUpvoteExists(){
            const resp = await get(`upvote?employee_id=${employeeId}&idea_id=${selected?.id}`);
            if(resp?.success){
                setUpvoted(resp?.data?.upvoted);
            }
            const anotherResp = await get('challenge');
            
            if(anotherResp?.success){
                const temp = anotherResp?.data;
                const selectedChallenge = temp.filter((e: any) => e?.id === selected?.id);
                console.log(selectedChallenge[0]?.upvotes, 'DEBUG challenge');
                setNumUpvotes(selectedChallenge[0]?.upvotes);
            }
        }

        handleUpvoteExists();
    },[selected, upvoted])

    async function handleUpvote(){
        const resp = await post('upvote', { upvote: !upvoted, employee_id: employeeId, idea_id: selected?.id });
        setUpvoted(!upvoted);
        // setRefresh(!refresh);
    }

    console.log(data, 'DEBUG whate happen')
    return(
        <>
        <Modal opened={visible} onClose={() => {setVisible(false);setContentVisible(false);}} title={selected?.name}>
            <Card>
                <Text>
                    {selected?.desc}
                </Text>
                <Container>
                    {selected?.tags?.map((e) => (
                        <Badge key={e} 
                        // color="red"
                        size="md" 
                        mt={16}
                        mx={8}>{e}</Badge>
                    ))}
                </Container>
                {/* <ActionIcon variant="filled" aria-label="Upvote" mt={16} style={{ alignSelf: 'flex-start'}} > */}
                <Container mt={16} style={{ display: 'flex', flexDirection: 'row', float: 'right',  alignContent: 'center', alignItems: 'center' }}>
                  {upvoted ? <BiSolidUpvote onClick={handleUpvote} /> : <BiUpvote onClick={handleUpvote}/>}
                <Text ml={8}>{numUpvotes}</Text>
                </Container>
                {/* </ActionIcon> */}
            </Card>
        </Modal>
        <Grid style={{ width: '70%' }}>
            {data?.map((e: { id: string, name: string, desc: string, upvotes: number, createdAt: string })=> (
                <Grid.Col key={e.id} span={12} >
                    <Card onClick={() => {setSelected(e); setVisible(true); setContentVisible(true);}} shadow="sm" padding="lg" radius="md" withBorder>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                                <Text size="xl" mt="md" fw={700}>{e.name}</Text>
                                <Text size="md" fw={400} mt="sm" c="dimmed" truncate='end'>{e.desc}</Text>
                                <Text fw={700} c='gray' >{moment(e?.createdAt).format('DD/MM/y hh:mm')}</Text>
                            </div>
                            <Text size="xl" fw={900} c='blue' style={{ textAlign: 'center', alignSelf: 'center' }}>{e?.upvotes}</Text>
                        </div>
                    </Card>
                </Grid.Col>
            ))}
        </Grid>
        </>
    )
}