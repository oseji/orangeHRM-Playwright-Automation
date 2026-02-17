import test from "@playwright/test";
import { LandingPage } from "../../pages/landingPage";

test("login with valid credentials", async ({ page }) => {
	const landingPage = new LandingPage(page);

	await landingPage.loadLoginPageAndLogin(
		"valid credentials",
		process.env.USER_NAME!,
		process.env.PASSWORD!,
	);
});
