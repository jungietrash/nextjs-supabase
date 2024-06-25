"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { createTodo } from "../actions";

const FormSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required.",
	}),
});

export default function CreateForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {

		startTransition(async () => {

			const result = await createTodo(data.title);

			const {error} = JSON.parse(result);
	
			if(!error?.message){
				toast({
					title: "You are successfully create todo.",
					description: (
						<pre className="bg-slate-950 mt-2 p-4 rounded-md w-[340px]">
							<code className="text-white">{data.title} is created</code>
						</pre>
					),
				});
			}
			else{
				toast({
					title: "You failed to create todo.",
					description: (
						<pre className="bg-slate-950 mt-2 p-4 rounded-md w-[340px]">
							<code className="text-white">{data.title} is not created</code>
						</pre>
					),
				});
			}

			form.reset();
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-full"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="todo title"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="flex gap-2 w-full">
					Create
					<AiOutlineLoading3Quarters className={cn("animate-spin", {hidden: !isPending})} />
				</Button>
			</form>
		</Form>
	);
}
