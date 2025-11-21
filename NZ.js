// ==HollyRoot==
// @name         NZUA — hide bad grades
// @namespace    nzua
// @version      1.0
// @match        https://nz.ua/schedule/grades-statement*
// @grant        none
// @run-at       document-idle
// ==HollyRoot==

( function () {
    const subjects = [
        "Друга іноземна мова (французька)",
        "Українська мова",
        "Українська література"
    ];

    // Убираем: Н, Н/О, 1–4 (только как отдельная оценка, не часть 10)
    const bad = /(^|[,\s])(Н\/О|Н|[1-4](?=\s*(?:,|$|\()))(\s*\([^)]*\))?(?=[,\s]|$)/giu;

    function cleanRow(row) {
        const td = row.cells[2];
        if (!td) return;

        let txt = td.innerText;

        txt = txt.replace(bad, "");
        txt = txt.replace(/,\s*,+/g, ",");
        txt = txt.replace(/^\s*,|,\s*$/g, "");
        txt = txt.replace(/\s{2,}/g, " ");

        td.innerText = txt.trim();
    }

    function processGrades() {
        document.querySelectorAll(".marks-report tbody tr").forEach(row => {
            const subj = row.cells[1]?.innerText.trim();
            if (subjects.includes(subj)) cleanRow(row);
        });
    }

    processGrades();

    const tbody = document.querySelector(".marks-report tbody");
    if (tbody) {
        new MutationObserver(processGrades)
            .observe(tbody, { childList: true, subtree: true, characterData: true });
    }
})();
