"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '../../components/ui/dialog'
  import { Button } from '../../components/ui/button'
  import { Textarea } from '../../components/ui/Textarea'
  import {AiChatSession} from '../../configs/AiModal'
  import {JsonForms} from '../../configs/schema'
  import {db} from '../../configs/index'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'



  const PROMPT="On the basis of description please give form in json format with form title,form subheading, form field, form name, placeholder name, form label,field type and field required in json format"
function CreateForm() {
    const [openDialog,setOpenDialog]=useState(false)
    const [userInput,setUserInput]=useState();
    const [loading,setLoading]=useState(false);
    const route=useRouter();
    const {user}=useUser();

    const onCreateForm=async()=>{
       
        setLoading(true)

        try {
            const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
            const responseText = await result.response.text();
            console.log(responseText);
      
            if (responseText) {
              const resp = await db.insert(JsonForms)
                .values({
                  jsonform: responseText,
                  createdBy: user?.primaryEmailAddress?.emailAddress,
                  createdAt: moment().format('DD/MM/yyyy')
                })
                .returning({ id: JsonForms.id });
      
              console.log("New Form ID", resp[0].id);
      
              if (resp[0].id) {
                route.push('/edit_style/' + resp[0].id);
              }
            }
          } catch (error) {
            console.error("Error creating form:", error);
          } finally {
            setLoading(false);
            setOpenDialog(false); // Close dialog after form creation attempt
          }
        };
      
        return (
          <div>
            <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
            <Dialog open={openDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new form</DialogTitle>
                  <DialogDescription>
                    <Textarea
                      className='my-2'
                      onChange={(event) => setUserInput(event.target.value)}
                      placeholder="Write a description of your form"
                    />
      
                    <div className='flex gap-2 my-3 justify-end'>
                      <Button onClick={() => setOpenDialog(false)} variant="destructive">Cancel</Button>
                      <Button disabled={loading} onClick={onCreateForm}>
                        {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        );
      }
      
      export default CreateForm;