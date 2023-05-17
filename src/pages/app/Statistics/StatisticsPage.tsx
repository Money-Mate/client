import StatisticsReport from "./Cards/StatisticsReport";

//  KATEGORIEN
// wobei will user unterstützung? Checkboxes mit heading und Erklärungsdropdown und ggf Slider?

// 4. 30-50-20 regel: 30% für Leben, Wohnen, Essen, 50% für Spaß/ freiwillige Ausgaben, 20% für Sparen+ Investitionen
// 4.a nach eigenen Bedürfnissen justierbar mit Slider Range für 3 component total100%?

// 5. Notgroschen: 3 Monatsnettogehälter gespart -> = extra Konto in unserer app? -> brauchen wir dann noch section other konten für kontoübersicht?
// EInnahmen : 6 x 3
// Extrakonto

//wurden alle budgets eingehalten?
// schulden vermeiden: sind alle konten positiv? sonst !
// Saldo negativ? sonst !

function FinancialOptionsPage() {
  return (
    <div className="h-full items-center bg-mm-background text-mm-text-dark mx-5 rounded-lg overflow-x-hidden">
        <StatisticsReport />
    </div>
  );
}

export default FinancialOptionsPage;
