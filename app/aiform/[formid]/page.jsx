"use client"
import React, { useEffect, useState } from 'react'
import { JsonForms } from '../../../configs/schema'
import { eq } from 'drizzle-orm'
import { db } from '../../../configs'
import FormUi from '../../edit_style/_components/FormUi'
import Image from 'next/image'
import Link from 'next/link'

function LiveAiForm({params}) {
    const [record, setRecord] = useState();
    const [jsonForm, setJsonForm] = useState([]);

    useEffect(() => {
        if (params) {
            GetFormData();
        }
    }, [params]);

    const GetFormData = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.id, Number(params?.formid)));
        console.log(result);
        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform));
    }

    return (
        <div className='p-10 flex justify-center items-center'
        style={{
            backgroundImage:record?.background
        }}>
        {record&& <FormUi
                            jsonForm={jsonForm}
                            onFieldUpdate={() => console.log}
                            deleteField={() => console.log}
                            selectedStyle={record?.style}
                            selectedTheme={record?.theme}
                            editable={false}
                            formId={record.id}
                            enableSignIn={record?.enableSignIn}
            />}
            <Link className='flex gap-2 items-center bg-black text-white px-3 py-1 
            rounded-full fixed bottom-5 left-5 cursor-pointer'
            href={'/'}>
                <Image src={'/logo.png'} width={26} height={26}/>
                Build your own AI form
            </Link>
        </div>
    );
}

export default LiveAiForm;
