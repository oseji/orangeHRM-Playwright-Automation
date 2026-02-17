import { Page, expect } from "@playwright/test";

export class DashboardPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	//locators
	dashboardHeader = () => this.page.getByRole("heading", { name: "Dashboard" });

	//actions
	async verifyDashboardPageHasLoaded() {
		await expect(this.page).toHaveURL(process.env.DASHBOARD_URL!);
		await expect(this.dashboardHeader()).toBeVisible();
	}
}
