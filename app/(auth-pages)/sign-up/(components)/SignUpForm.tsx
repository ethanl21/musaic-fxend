import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FormMessage, Message } from "@/components/form-message";
import { OAuthButtons } from "@/app/(components)/OAuthButtons";
import { HashToSearch } from "@/app/(components)/HashToSearch";

export const SignUpForm = ({ searchParams }: { searchParams: Message }) => {
	return (
		<>
			<HashToSearch />
			<div className="flex flex-col gap-2 min-w-72 max-w-72">
				<form className="flex flex-col mx-auto w-full space-y-2.5">
					<h1>Sign Up</h1>
					<small>
						Already have an account?{" "}
						<Link
							className="text-primary font-medium underline"
							href="/sign-in"
						>
							Sign in
						</Link>
					</small>
					<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
						<Label htmlFor="email">Email</Label>
						<Input name="email" placeholder="hello@example.com" required />
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							name="password"
							placeholder="Your password"
							minLength={6}
							required
						/>
						<SubmitButton formAction={signUpAction} pendingText="Signing up...">
							Sign up
						</SubmitButton>
						<FormMessage message={searchParams} />
					</div>
				</form>
				<Separator className="w-full mb-2" />
				<div className="flex flex-col justify-start items-stretch space-y-2">
					<OAuthButtons actionType="signUp"></OAuthButtons>
				</div>
			</div>
		</>
	);
};
