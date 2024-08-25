"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../configs'
import { JsonForms } from '../../../configs/schema'
import { useUser } from '@clerk/nextjs'
//import { index } from 'drizzle-orm/pg-core'
import FormListItemResp from './_components/FormListItemResp'
import { eq } from 'drizzle-orm'

function Responses() {
    const {user}=useUser();
    const [formList,setFormList]=useState([]);
    useEffect(()=>{
        user&&getFormList();
    },[user])
    const getFormList=async()=>{
        const result=await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress))

        setFormList(result)
    }
  return (
    <div className='p-10'>
         <h2 className='font-bold text-2xl flex items-center justify-between'>Responses
      
      </h2>
      <div className='grid grid-cols-2  gap-5 lg:grid-cols-3'>
        {formList.map((form,index)=>(
           <FormListItemResp
           key={index}
           formRecord={form}
           jsonForm={JSON.parse(form.jsonform)}/>
        ))}
      </div>

    </div>
  )
}

export default Responses