import React from "react";
import CompanySettingsForm from "./company-settings-form";
import ManageSubscription from "./manage-subscription";

const ClientSettingsPage = () => {
  return (
    <section className="px-5">
      <CompanySettingsForm />
      <ManageSubscription />
    </section>
  );
};

export default ClientSettingsPage;
