'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

const formSchema = z.object({
  title: z.string().trim().min(1),
})

export function Search() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  function handleSubmitClick(data: z.infer<typeof formSchema>) {
    router.push(`/barbershops?title=${data.title}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitClick)}
        className="flex gap-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Buscar Barbearias" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon size={18} />
        </Button>
      </form>
    </Form>
  )
}
