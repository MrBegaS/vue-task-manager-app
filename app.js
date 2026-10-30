const app = {

    data() {

        return {

            darkMode: false,

            showMessage: false,

            messageType: "",

            filter: "alle",

            neueAufgabe: "",

            aufgaben: [

                {
                    text: "Weiterbildung zum Webentwickler absolvieren 🎓",
                    erledigt: true
                },

                {
                    text: "Portfolio-Projekt: Haarstudio ElbStyle entwickeln 💈",
                    erledigt: true
                },

                {
                    text: "Portfolio-Projekt: Vue Task Manager entwickeln",
                    erledigt: true
                },

                {
                    text: "Lebenslauf und Portfolio vorbereiten",
                    erledigt: true
                },

                {
                    text: "Kaffee trinken und Motivation sammeln ☕",
                    erledigt: true
                },

                {
                    text: "Den ersten Job als Frontend-Entwickler suchen",
                    erledigt: true
                },

                {
                    text: "Bewerbungen versenden",
                    erledigt: true
                },

                {
                    text: "☕ Einladung zum Vorstellungsgespräch",
                    erledigt: false,
                    interview: true
                },

                {
                    text: "Teil eines tollen Entwicklerteams werden ❤️",
                    erledigt: false,
                    team: true
                }

            ]

        };

    },

    mounted() {

        const gespeicherteAufgaben = JSON.parse(localStorage.getItem("aufgaben"));

        if (gespeicherteAufgaben) {

            this.aufgaben = gespeicherteAufgaben;

        }

        const dark = JSON.parse(localStorage.getItem("darkMode"));

        if (dark) {

            this.darkMode = dark;

            document.body.classList.add("dark");

        }

    },

    watch: {

        aufgaben: {

            handler(neueListe) {

                localStorage.setItem(
                    "aufgaben",
                    JSON.stringify(neueListe)
                );

            },

            deep: true

        },

        darkMode(neuerWert) {

            localStorage.setItem(
                "darkMode",
                JSON.stringify(neuerWert)
            );

        }

    },

    computed: {

        gefilterteAufgaben() {

            if (this.filter === "offen") {

                return this.aufgaben.filter(
                    aufgabe => !aufgabe.erledigt
                );

            }

            if (this.filter === "erledigt") {

                return this.aufgaben.filter(
                    aufgabe => aufgabe.erledigt
                );

            }

            return this.aufgaben;

        },

        nochTunAufgaben() {

            return this.aufgaben.filter(
                aufgabe => !aufgabe.erledigt
            );

        },

        erledigteAufgaben() {

            return this.aufgaben.filter(
                aufgabe => aufgabe.erledigt
            );

        },

        nochTunAnzahl() {

            return this.nochTunAufgaben.length;

        },

        erledigtAnzahl() {

            return this.erledigteAufgaben.length;

        }

    },

    methods: {

        aufgabeAnlegen() {

            const text = this.neueAufgabe.trim();

            if (!text) return;

            this.aufgaben.push({

                text: text,

                erledigt: false

            });

            this.neueAufgabe = "";

        },

        aufgabeEntfernen(index) {

            if (!confirm("Möchten Sie diese Aufgabe wirklich löschen?")) {
                return;
            }

            this.aufgaben.splice(index, 1);

            this.showMessage = false;

        },

        toggleAufgabe(aufgabe) {

            aufgabe.erledigt = !aufgabe.erledigt;

            if (aufgabe.interview && aufgabe.erledigt) {

                this.messageType = "interview";

                this.showMessage = true;

            } else if (aufgabe.team && aufgabe.erledigt) {

                this.messageType = "team";

                this.showMessage = true;

            } else if (aufgabe.interview || aufgabe.team) {

                this.showMessage = false;

                this.messageType = "";

            }

        },

        toggleDarkMode() {

            this.darkMode = !this.darkMode;

            document.body.classList.toggle(
                "dark",
                this.darkMode
            );

        }

    }

};

Vue.createApp(app).mount("#aufgabenApp");
