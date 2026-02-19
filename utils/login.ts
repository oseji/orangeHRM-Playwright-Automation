import { Page, expect } from "@playwright/test";

export const login = async (page: Page) => {
	await page.goto(process.env.LANDING_PAGE_URL!);
	await page.getByPlaceholder("Username").fill(process.env.USER_NAME!);
	await page.getByPlaceholder("Password").fill(process.env.PASSWORD!);
	await page.getByRole("button", { name: "Login" }).click();

	await expect(page).toHaveURL(process.env.DASHBOARD_URL!);
	await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
};
