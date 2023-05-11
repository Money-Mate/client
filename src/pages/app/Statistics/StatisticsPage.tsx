import React from 'react'
import StatisticsReport from './StatisticsReport'

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
    <div className="max-w-full">
    <div className="m-3 flex min-h-screen w-full flex-col items-center bg-mm-background text-mm-text-dark">
     <StatisticsReport />
    </div>
  </div>
  )
}

export default FinancialOptionsPage