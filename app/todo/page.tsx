import React from "react";
import CreateForm from "./components/CreateForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SignOut from "./components/SignOut";
import { deleteTodoById, readTodo, updateTodoById } from "./actions";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Page() {

	const { data : todoa} = await readTodo();
	// const { data } = await readUserSession();

	// if(!data.session) {
	// 	return redirect('/auth-server-action');
	// }

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="space-y-5 w-96">
				<CreateForm />
				{todoa?.map((todo, index) => {
					const deleteTodo = deleteTodoById.bind(null, todo.id);
					const updateTodo = updateTodoById.bind(null, todo.id, !todo.completed );
					return (
						<div key={index} className="flex items-center gap-6">
							<h1
								className={cn({
									"line-through": todo.completed,
								})}
							>
								{todo.title}
							</h1>

							<form action={deleteTodo}>
								<Button>delete</Button>
							</form>
							<form action={updateTodo}>
								<Button>Update</Button>
							</form>
						</div>
					);
				})}
			</div>
		</div>
	);
}
