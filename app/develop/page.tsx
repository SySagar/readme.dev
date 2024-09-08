"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, Button, Label } from "@groovy-box/ui";

export default function page() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="main flex flex-row min-w-full px-20">

      <div className="form-view flex flex-1 flex-col gap-52">

      <Text className="text-5xl">Create Your  Story</Text>

      <div className="form-body flex flex-col gap-4">

      <form className="form flex flex-col gap-3 p-3" onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
     
     <div className="field">
     <Label htmlFor="firstName">
  Your Name:
</Label>
      <input {...register("firstName")} placeholder="Your name" />
     
     </div>
     <div className="field">
     <Label htmlFor="description">
  Description:
</Label>
<textarea {...register("description")} placeholder="Briefly describe about yourself" />
     
     </div>
      <select {...register("category", { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
     
      <p>{data}</p>
      {/* <input type="submit" /> */}
      <div className="w-full flex justify-center">
      <Button variant={'default'} type="submit" className="max-w-24">
        submit
      </Button>
      </div>
    </form>

      </div>
      </div>
    <div className="preview  flex flex-1  border-2">

    </div>
      </div>
    </div>
  );
}
