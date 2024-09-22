import { Message } from "@/components/form-message";
import { LogInForm } from "./(components)/SignInForm";

export default function Login({ searchParams }: { searchParams: Message }) {
	return <LogInForm searchParams={searchParams}></LogInForm>;
}
