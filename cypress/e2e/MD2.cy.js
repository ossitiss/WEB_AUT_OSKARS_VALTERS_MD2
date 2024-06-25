import { AppointmentPage } from "../page_objects/appointment.page";
import { HistoryPage } from "../page_objects/history.page";
import { LoginPage } from "../page_objects/login.page";
import { MainPage } from "../page_objects/main.page";
import { AppointmentSummary } from "../page_objects/summary.page";

describe('MD2', () => {

  it('Make Appointment', () => {
    MainPage.visitMainPage;
    MainPage.pressMakeAppointment.click();

    //apmeklejums, lietotajvards, parole
    cy.get("[aria-describedby='demo_username_label']").invoke('val').then(username => {
      LoginPage.enterUsername.type(username);
    });
    cy.get("[aria-describedby='demo_password_label']").invoke('val').then(password => {
      LoginPage.enterPassword.type(password);
    });
    
    LoginPage.pressLoginButton.click();
    AppointmentPage.clickFacility.select("Tokyo CURA Healthcare Center");
    AppointmentPage.clickCheckbox.click();
    AppointmentPage.clickRadioButton.click();
    AppointmentPage.enterVisitDate.click();
    AppointmentPage.clickDate30.click();
    AppointmentPage.writeComment.type("CURA Healthcare Service");
    AppointmentPage.bookAppointmentBtn.click();
    //
    AppointmentSummary.checkFacility.should("have.text", "Tokyo CURA Healthcare Center");
    AppointmentSummary.checkReadMission.should("have.text", "Yes");
    AppointmentSummary.checkProgram.should("have.text", "Medicaid");
    AppointmentSummary.checkDate.should("have.text", "06/30/2024");
    AppointmentSummary.checkComment.should("have.text", "CURA Healthcare Service");
  });

  it.only('Make Appointment', () => {
    MainPage.visitMainPage;
    MainPage.pressMakeAppointment.click();

    //apmeklejums, lietotajvards, parole
    cy.get("[aria-describedby='demo_username_label']").invoke('val').then(username => {
      LoginPage.enterUsername.type(username);
    });
    cy.get("[aria-describedby='demo_password_label']").invoke('val').then(password => {
      LoginPage.enterPassword.type(password);
    });

    LoginPage.pressLoginButton.click();
    LoginPage.clickMenuButton.click();
    LoginPage.checkIfSidebarActive.should("have.class", "active");
    LoginPage.goToHistory.click();
    HistoryPage.checkIfNoAppoinment.should("have.text", "No appointment.");
  });
})