import test from "@playwright/test";
import { LandingPage } from "../../pages/landingPage";

test("login with invalid credentials", async ({ page }) => {
	const landingPage = new LandingPage(page);

	await landingPage.loadLoginPageAndLogin(
		"invalid credentials",
		"invalidUser",
		process.env.PASSWORD!,
	);
});
