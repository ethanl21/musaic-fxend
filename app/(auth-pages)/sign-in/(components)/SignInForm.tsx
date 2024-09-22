import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SiDiscord, SiGithub, SiGoogle, SiSpotify } from "@icons-pack/react-simple-icons";
import Link from "next/link";

export const LogInForm = ({ searchParams }: { searchParams: Message }) => {
	return (
		<>
			<div className="flex flex-col gap-2 min-w-72 max-w-72">
				<form className="flex-1 flex flex-col min-w-64 space-y-2.5">
					<h1>Sign in</h1>
					<small>
						Don't have an account?{" "}
						<Link
							className="text-foreground font-medium underline"
							href="/sign-up"
						>
							Sign up
						</Link>
					</small>
					<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
						<Label htmlFor="email">Email</Label>
						<Input name="email" placeholder="hello@example.com" required />
						<div className="flex justify-between items-center">
							<Label htmlFor="password">Password</Label>
							<Link
								className="text-xs text-foreground underline"
								href="/forgot-password"
							>
								Forgot Password?
							</Link>
						</div>
						<Input
							type="password"
							name="password"
							placeholder="Your password"
							required
						/>
						<SubmitButton pendingText="Signing In..." formAction={signInAction}>
							Sign in
						</SubmitButton>
						<FormMessage message={searchParams} />
					</div>
				</form>
				<Separator className="w-full mb-2" />
				<div className="flex flex-col justify-start items-stretch space-y-2">
					<Button className="bg-[#5865F2] hover:bg-[#3a44b6] relative">
						<SiDiscord className="absolute left-2" />
						Sign in with Discord
					</Button>
					<Button className="relative bg-[#4285F4] hover:bg-[#2e61b3]">
						<SiGoogle className="absolute left-2"></SiGoogle>
						Sign in with Google
					</Button>
					<Button className="relative bg-[#181717] hover:bg-[#464545] dark:bg-[#676565] dark:hover:bg-[#454444]">
						<SiGithub className="absolute left-2"></SiGithub>
						Sign in with GitHub
					</Button>
					<Button className="relative bg-[#1DB954] hover:bg-[#189a46]">
						<SiSpotify className="absolute left-2"></SiSpotify>
						Sign in with Spotify
					</Button>
				</div>
			</div>
		</>
	);
};
