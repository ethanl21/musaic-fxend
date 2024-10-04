"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function HashToSearch() {
	const router = useRouter();

	useEffect(() => {
		// Check if the URL contains a hash starting with `#`
		if (window.location.hash.startsWith("#")) {
			// Replace the `#` with `?` to convert the hash into search parameters
			const searchParams = window.location.hash.replace("#", "?");

			// Create the new URL with the search params instead of the hash
			const newUrl =
				window.location.origin + window.location.pathname + searchParams;

			// Use router.replace to update the URL without reloading the page
			router.replace(newUrl);
		}
	}, [router]);

	return null;
}
