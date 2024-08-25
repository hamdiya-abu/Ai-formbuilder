import React, { useRef, useState } from 'react';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import FieldEdit from '../_components/FieldEdit';
import { db } from '../../../configs';
import { userResponses } from '../../../configs/schema';
import moment from 'moment';
import { toast } from 'sonner';
import { SignInButton, useUser } from '@clerk/nextjs';
import { Button } from '../../../components/ui/button';

function FormUi({ jsonForm, selectedTheme, onFieldUpdate, deleteField,editable=true ,formId=0,enableSignIn=false}) {
  const [formData,setFormData]=useState();
  let formRef=useRef();
  const {user,isSignedIn}=useUser();
  const handleInputChange=(event)=>{
    
    const {name,value}=event.target;
    setFormData({
      ...formData,
      [name]:value
    })

  }
  const handleSelectChange=(name,value)=>{
    
    
    setFormData({
      ...formData,
      [name]:value
    })

  }
  const onFormSubmit=async(event)=>{
    event.preventDefault()
    console.log(formData);

    const result=await db.insert(userResponses)
    .values({
      jsonResponse:formData,
      createdAt:moment().format('DD/MM/yyyy'),
      formRef:formId
    })
    if (result){
      formRef.reset();
      toast('Response Submitted Succesfully')
    }
    else{
      toast('Error saving form!')
    }
  }
  const handleCheckboxChange=(fieldName,itemName,value)=>{
    const list=formData?.[fieldName]?formData?.[formName]:[];
    if(value){
      list.push({
        formLabel:itemName,
        value:value
      })
      setFormData({
        ...formData,
        [fieldName]:list
      })
    }else{
      const result =list.filter((item)=>item.formLabel==itemName);
      setFormData({
        ...formData,
        [fieldName]:result
      })
    }
    //console.log(formData)
  }
  return (
    <form
    ref={(e)=>formRef=e}
    onSubmit={onFormSubmit}
    className="border p-5 md:w-[600px] rounded-lg" data-theme={selectedTheme}>
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">{jsonForm?.formSubheading}</h2>

      {jsonForm?.formFields?.map((field, index) => (
        <div key={index} className='flex items-center gap-2'>
          {field.fieldType === 'select' ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.formLabel}</label>
              <Select required={field?.fieldRequired} 
              onValueChange={(v)=>handleSelectChange(field.formName,v)} >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholderName} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, idx) => (
                    <SelectItem key={idx} value={item.value || item}>
                      {item.label || item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === 'radio' ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.formLabel}</label>
              <RadioGroup required={field?.fieldRequired}>
                {field.options.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.value || item} id={item.value || item}
                    onClick={()=>handleSelectChange(field.formName,item)} />
                    <Label htmlFor={item.value || item}>{item.label || item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === 'checkbox' ? (
            <div className='my-3 w-full'>
              <label className="text-xs text-gray-500">{field.formLabel}</label>
              {field?.options ? field?.options?.map((item, idx) => (
                <div key={idx} className='flex gap-2 items-center'>
                  <Checkbox onCheckChange={(v)=>handleCheckboxChange(field.formLabel,item,v)} />
                  <h2>{item.label || item}</h2>
                </div>
              )) : (
                <div className='gap-2 flex'>
                
                <Checkbox required={field?.fieldRequired}  />
                  <h2>{field.formLabel}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.formLabel}</label>
              <Input
                type={field.fieldType}
                placeholder={field.placeholderName}
                name={field.formName}
                className="bg-transparent"
                required={field?.fieldRequired}
                onChange={(e)=>handleInputChange(e)}
              />
            </div>
          )}
         {editable&& <div>
            <FieldEdit
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>}
        </div>
      ))}
      {!enableSignIn?
      <button type='submit' className='btn btn-primary'>Submit</button>:
    
      isSignedIn?
      <button type='submit' className='btn btn-primary'>Submit</button>:
      <Button>
        <SignInButton mode='modal'>Sign In before Submit</SignInButton>
      </Button>
    }
    </form>
  );
}

export default FormUi;
