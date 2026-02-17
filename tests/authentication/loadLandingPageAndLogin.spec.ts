import test from "@playwright/test";
import { LandingPage } from "../../pages/landingPage";

test("Load landing page and login", async ({ page }) => {
	const landingPage = new LandingPage(page);

	await landingPage.loadLoginPageAndLogin(
		process.env.USER_NAME!,
		process.env.PASSWORD!,
	);
});
