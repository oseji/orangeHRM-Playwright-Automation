import test from "@playwright/test";
import { login } from "../../utils/login";
import { DashboardPage } from "../../pages/dashboardNavigationPage";

test("logout of an account", async ({ page }) => {
	const dashboardPage = new DashboardPage(page);

	await login(page);
	await dashboardPage.logoutOfAccount();
});
