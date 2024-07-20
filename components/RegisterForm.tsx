'use client'
import {registerSchema} from '@/lib/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {registerAction} from '@/app/actions/auth-action'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {

  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password:"",
      password2:"",
      name:""
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null);
    startTransition( async () => {
      const response =  await registerAction(values)
      if(response?.error){
        setError(response.error)
        
      }else{
        router.push('/dashboard')
      }
    });
  }

  return (
    <div className='max-w-52'>
      <h1 className='p-8 font-bold'>Registro de Uarios</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} type='text' />
              </FormControl>
            
                <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} type='email' />
              </FormControl>
            
                <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type='password' />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirma el Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirma el password" {...field} type='password' />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        {
          error && <FormMessage>{error}</FormMessage>
        }
        <Button type="submit" disabled={isPending}>Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default RegisterForm