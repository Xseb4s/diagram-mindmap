export const endpoint = "https://binel.nesstion.com/requestsHTTP";
export const excel = "https://binel.nesstion.com/excel/excel.php/excel";

export const ROUTES = {
    // login
    LOGIN: `${endpoint}/http_login.php/login`,
    // maps
    CREATEMAP:`${endpoint}/http_map.php/map`,
    READMAPID: (id) => `${endpoint}/http_map.php/map/${id}`,
    // survey
    CREATESURVEY:`${endpoint}/http_survey.php/survey`,
    // interact
    CREATEINTERACT:`${endpoint}/http_interaction.php/interaction`,
    READINTERACT:`${endpoint}/http_interaction.php/interaction`,
    READINTERACTID: (id) => `${endpoint}/http_interaction.php/interaction/${id}`,
    DELETEINTERACT: (id) => `${endpoint}/http_interaction.php/interaction/${id}`
}