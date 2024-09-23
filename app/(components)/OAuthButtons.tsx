import { Button } from "@/components/ui/button";
import {
	SiDiscord,
	SiGoogle,
	SiGithub,
	SiSpotify,
} from "@icons-pack/react-simple-icons";
import { signInOAuthAction } from "@/app/actions";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
	formAction: () => Promise<void>;
};
const OAuthButton = ({ formAction, children, ...props }: Props) => {
	return (
		<form
			action={async () => {
				"use server";

				await formAction();
			}}
		>
			<Button type="submit" {...props}>
				{children}
			</Button>
		</form>
	);
};

export const OAuthButtons = ({
	actionType,
}: {
	actionType: "signUp" | "signIn";
}) => {
	const signInWithDiscord = async () => {
		"use server";

		await signInOAuthAction("discord");
	};

	const signInWithGoogle = async () => {
		"use server";

		await signInOAuthAction("google");
	};

	const signInWithGithub = async () => {
		"use server";

		await signInOAuthAction("github");
	};

	const signInWithSpotify = async () => {
		"use server";

		await signInOAuthAction("spotify");
	};

	return (
		<>
			<OAuthButton
				className="bg-[#5865F2] hover:bg-[#3a44b6] relative w-full"
				formAction={signInWithDiscord}
			>
				<SiDiscord className="absolute left-2" />
				Sign {actionType === "signIn" ? "in" : "up"} with Discord
			</OAuthButton>
			<OAuthButton
				formAction={signInWithGoogle}
				className="relative bg-[#4285F4] hover:bg-[#2e61b3] w-full"
			>
				<SiGoogle className="absolute left-2"></SiGoogle>
				Sign {actionType === "signIn" ? "in" : "up"} with Google
			</OAuthButton>
			<OAuthButton
				formAction={signInWithGithub}
				className="relative bg-[#181717] hover:bg-[#464545] dark:bg-[#676565] dark:hover:bg-[#454444] w-full"
			>
				<SiGithub className="absolute left-2"></SiGithub>
				Sign {actionType === "signIn" ? "in" : "up"} with GitHub
			</OAuthButton>
			<OAuthButton
				formAction={signInWithSpotify}
				className="relative bg-[#1DB954] hover:bg-[#189a46] w-full"
			>
				<SiSpotify className="absolute left-2"></SiSpotify>
				Sign {actionType === "signIn" ? "in" : "up"} with Spotify
			</OAuthButton>
		</>
	);
};
