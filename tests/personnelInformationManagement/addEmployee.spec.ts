import test from "@playwright/test";
import { login } from "../../utils/login";
import { DashboardPage } from "../../pages/dashboardNavigationPage";
import { PersonnelInformationManagementPage } from "../../pages/dashboard/personal-information-management/personnelInformationManagementPage";

test("add employee", async ({ page }) => {
	const personnelInformationManagementPage =
		new PersonnelInformationManagementPage(page);
	const dashboardPage = new DashboardPage(page);

	await login(page);
	await dashboardPage.loadPersonnelInfoManagementPage();
	await personnelInformationManagementPage.clickAddEmployeeButton();
	await personnelInformationManagementPage.fillAddEmployeeForm(
		"John",
		"Smith",
		"12345",
		String(Math.floor(Math.random() * 10000) + 1),
	);
});
