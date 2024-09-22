import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FormMessage, Message } from "@/components/form-message";
import { Button } from "@/components/ui/button";
import {
	SiDiscord,
	SiGithub,
	SiGoogle,
	SiSpotify,
} from "@icons-pack/react-simple-icons";

export const SignUpForm = ({ searchParams }: { searchParams: Message }) => {
	return (
		<>
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
					<Button className="bg-[#5865F2] hover:bg-[#3a44b6] relative">
						<SiDiscord className="absolute left-2" />
						Sign up with Discord
					</Button>
					<Button className="relative bg-[#4285F4] hover:bg-[#2e61b3]">
						<SiGoogle className="absolute left-2"></SiGoogle>
						Sign up with Google
					</Button>
					<Button className="relative bg-[#181717] hover:bg-[#464545] dark:bg-[#676565] dark:hover:bg-[#454444]">
						<SiGithub className="absolute left-2"></SiGithub>
						Sign up with GitHub
					</Button>
					<Button className="relative bg-[#1DB954] hover:bg-[#189a46]">
						<SiSpotify className="absolute left-2"></SiSpotify>
						Sign up with Spotify
					</Button>
				</div>
			</div>
		</>
	);
};
