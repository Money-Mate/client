import React, { useState } from "react";

const FinancialHealthCard: React.FC = () => {
  const [trackHabits, setTrackHabits] = useState(false);

  const handleTrackHabitsChange = () => {
    setTrackHabits(!trackHabits);
  };

  // evtl ohne schuldenmöglichkeit

//  KATEGORIEN
// wobei will user unterstützung? Checkboxes mit heading und Erklärungsdropdown und ggf Slider?
  // tracken?
  // 1. Schulden? tracken -> wenn ja 50-30-20 rule, 20 in Schuldentilgung
  // 1a. bestehen Krediten?
  // 1b. oder Dispo?

  // 2. Eigene Budgets setzen:
  // -> hier BudgetCRUD?
  // 2a.  Alarmiere mich, wenn ich mein Budget überschreite (per farbe?)

  // 3. Goals/Wishlist Tracker  -->  Auch für Abbezahlung Schulden, Kredite, Dispo ?
        // -> hier CRUD?

  // 4. 30-50-20 regel: 30% für Leben, Wohnen, Essen, 50% für Spaß/ freiwillige Ausgaben, 20% für Sparen
    // 4.a nach eigenen Bedürfnissen justierbar mit Slider Range für 3 component total100%?

  // 5. Notgroschen: 3 Monatsnettogehälter gespart -> = extra Konto in unserer app? -> brauchen wir dann noch section other konten für kontoübersicht?

  // 6. weniger ausgeben als man verdient - ist schon in einkommen/ausgaben last 6 months drin..







  // --> AUSWERTUNG DISPLAYEN
  // via Dashbord? UserDashboard? Neues Dashboard Finanzgesundheit/Auswertung/Statistik?
  // + Report (statistik der letzten monate+ alles was getracked werden soll?, meiste einnahmen von/ausgaben für?),? PDFd download feature? 
  // Alert/Coloring??



  // --> DATENSTRUKTUR - jeweils ein fetch?
// financialHealthSettings: {
//   trackHabits: boolean,
//   trackHabitsSettings: {
//     schulden: boolean,

// },
// }




  return (
    <div className="mb-4 w-full rounded-md bg-mm-foreground p-4 shadow-lg">
      <h2 className="mb-2 text-lg font-bold text-mm-text-white">
        Financial Health Habits
      </h2>
      <div className="flex flex-col">
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            Dispo vermeiden - Alarmiere mich, wenn mein Konto unter 0€ fällt
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            Kredit vermeiden
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            Budgets setzen: Alarmiere mich, wenn ich mein Budget überschreite
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            30-50-20 rule: 30% of my income goes to needs, 50% to wants, 20% to
            savings
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            Alarmiere mich, wenn ich mein Budget überschreite
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            checked={trackHabits}
            onChange={handleTrackHabitsChange}
          />
          <p className="text-sm text-mm-text-white">
            Alarmiere mich, wenn ich mein Budget überschreite
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthCard;
