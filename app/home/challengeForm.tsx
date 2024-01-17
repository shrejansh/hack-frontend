import { Badge, Button, Container, Input, Pill, Textarea } from "@mantine/core";
import { get, post } from "../../api-handler";
import { useEffect, useState } from "react";
import useGlobal from "../store";
import { notifications } from "@mantine/notifications";

export default function ChallengeForm(props: any){
    const { setVisible } = props;
    const employeeId = useGlobal((state: any) => state.employeeId);
    const [ name, setName ] = useState<string>('');
    const [ description, setDescription ] = useState<string>(''); 
    const [ tags, setTags ] = useState<any>([]);
    const [ selectedTags, setSelectedTags ] = useState<any>([]);

    useEffect(()=> {
        async function fetchTags(){
            const records = await get('tags');
            console.log(records, 'DEBUG data');
            if(records?.success){
                console.log(records?.data, 'DEBUG data');
                setTags(records?.data);
            }
        }
        fetchTags();
    },[])

    async function handleCreate(event: any){
        event.preventDefault();
        if(name?.length > 0 && description?.length > 0){
            const resp = await post('challenge', {name, description ,employee_id: employeeId, tags: selectedTags});
            if(resp?.success){
                notifications.show({
                    title: 'Success',
                    color: 'green',
                    message: `${resp?.message}`
                });
                setVisible(false);
            }else{
                notifications.show({
                    title: 'Error',
                    color: 'red',
                    message: `Failed at creating new challenge`
                });
            }
            
        }
    }

    function handleTagSelection(id: number){
        if(selectedTags.includes(id)){
            const temp = selectedTags.filter((e: number) => e != id);
            setSelectedTags(temp);
        }else{
            setSelectedTags([...selectedTags, id]);
        }
    }

    return(
        <div style={{ padding: 20 }}>
            <>
            <Input.Wrapper label="Challenge Name" style={{ marginBottom: 20 }} required>
                <Input onChange={(e) => setName(e.target.value)} placeholder="Challenge #1" />
            </Input.Wrapper>
            <Textarea
                label="Challenge Description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Challenge #1 Description"
                style={{ marginBottom: 20, minHeight: 50 }}
                required
                autosize
                />
            <Container my={16}>
            {tags?.map((e) => (
                <Badge
                key={e.id}
                onClick={() => handleTagSelection(e.id)} 
                color={selectedTags.includes(e.id) ? 'blue': 'gray'}
                size="md" 
                mx={8}>
                    {e.name}
                </Badge>
            ))}
            </Container>
            <Button type="submit" onClick={(e) => handleCreate(e)} style={{ width: '100%' }}>Create</Button>
            </>
        </div>
    )
}