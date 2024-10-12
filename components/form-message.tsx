export type Message =
	| { success: string }
	| {
			error_description: string;
			error: string;
	  }
	| { message: string };

export function FormMessage({ message }: { message: Message }) {
	if (
		"error" in message &&
		message.error_description && message.error_description.includes("Unverified email with spotify")
		// message.error_description.includes("Unverified email with spotify")
	) {
		message.error_description =
			"Check the email address associated with your Spotify account for a confirmation message, then try again.";
	}

	return (
		<div className="flex flex-col gap-2 w-full max-w-md text-sm">
			{"success" in message && (
				<div className="text-foreground border-l-2 border-foreground px-4">
					{message.success}
				</div>
			)}
			{"error" in message && (
				<div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
					{message.error_description}
				</div>
			)}
			{"message" in message && (
				<div className="text-foreground border-l-2 px-4">{message.message}</div>
			)}
		</div>
	);
}
