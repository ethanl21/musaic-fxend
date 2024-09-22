import { Message } from "@/components/form-message";
import { ForgotPasswordForm } from "./(components)/ForgotPasswordForm";

export default function ForgotPassword({
	searchParams,
}: {
	searchParams: Message;
}) {
	return (
		<>
			<ForgotPasswordForm searchParams={searchParams} />
		</>
	);
}
