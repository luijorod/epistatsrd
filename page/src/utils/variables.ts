export const colors = [
  "#1F77B4",
  "#FF7F0E",
  "#2CA02C",
  "#D62728",
  "#9467BD",
  "#8C564B",
  "#E377C2",
  "#7F7F7F",
  "#BCBD22",
  "#17BECF",
  "#AEC7E8",
  "#FFBB78",
  "#98DF8A",
  "#FF9896",
  "#C5B0D5",
  "#C49C94",
  "#F7B6D2",
  "#C7C7C7",
  "#DBDB8D",
  "#9EDAE5",
  "#FFED6F",
  "#B5CF6B",
  "#FFC48C",
  "#A8DBA8",
  "#79BD9A",
  "#3B8686",
  "#0B486B",
  "#004D40",
  "#CFF09E",
  "#A3A500",
  "#F0E442",
  "#6D904F",
  "#66C2A4",
  "#FC8D62",
  "#8DA0CB",
];

export const datasetVars = {
  colera: {
    dateFormatString: "%Y-%U",
    dateVar: "fecha",
    vars: [
      { value: "casos_sospechosos", label: "Casos Sospechosos" },
      { value: "incidencia", label: "Incidencia Acumulada" },
      { value: "defun_nuevas", label: "Defunciones Nuevas" },
    ],
  },
  covid: {
    dateFormatString: "%d/%m/%Y",
    dateVar: "fecha",
    vars: [
      { value: "casos_nuevos", label: "Casos Nuevos" },
      { value: "casos_acum", label: "Casos Acumulados" },
      { value: "incidencia", label: "Incidencia" },
      { value: "positividad", label: "Tasa de Positividad" },
      { value: "recuperados", label: "Recuperados" },
      { value: "defun_nuevas", label: "Defunciones Nuevas" },
      { value: "defun_acum", label: "Defunciones Acumuladas" },
      { value: "procesadas", label: "Muestras Procesadas" },
    ],
  },
  dengue: {
    dateFormatString: "%Y-%U",
    dateVar: "fecha",
    vars: [
      { value: "casos_probables", label: "Casos Probables" },
      { value: "incidencia", label: "Incidencia Acumulada" },
      { value: "defun_nuevas", label: "Defunciones Nuevas" },
    ],
  },
  leptospirosis: {
    dateFormatString: "%Y-%U",
    dateVar: "fecha",
    vars: [
      { value: "casos_sospechosos", label: "Casos Sospechosos" },
      { value: "incidencia", label: "Incidencia Acumulada" },
      { value: "defun_nuevas", label: "Defunciones Nuevas" },
    ],
  },
  malaria: {
    dateFormatString: "%Y-%U",
    dateVar: "fecha",
    vars: [
      { value: "casos_confirmados", label: "Casos Confirmados" },
      { value: "incidencia", label: "Incidencia Acumulada" },
      { value: "defun_nuevas", label: "Defunciones Nuevas" },
    ],
  },
  mmi: {
    dateFormatString: "%Y-%U",
    dateVar: "fecha",
    vars: [
      { value: "maternas", label: "Muertes Maternas" },
      { value: "infantiles", label: "Muertes Infantiles" },
    ],
  },
};

export const datasets = [
  { value: "colera", label: "Cólera" },
  { value: "covid", label: "COVID-19" },
  { value: "dengue", label: "Dengue" },
  { value: "leptospirosis", label: "Leptospirosis" },
  { value: "malaria", label: "Malaria" },
  { value: "mmi", label: "Mortalidad Materna e Infantil" },
];

export const provincias = [
  { value: "Distrito Nacional", label: "Distrito Nacional", color: "#1F77B4" },
  { value: "Santo Domingo", label: "Santo Domingo", color: "#FF7F0E" },
  { value: "Azua", label: "Azua", color: "#2CA02C" },
  { value: "Baoruco", label: "Baoruco", color: "#D62728" },
  { value: "Barahona", label: "Barahona", color: "#9467BD" },
  { value: "Dajabón", label: "Dajabón", color: "#8C564B" },
  { value: "Duarte", label: "Duarte", color: "#E377C2" },
  { value: "El Seibo", label: "El Seibo", color: "#7F7F7F" },
  { value: "Elías Piña", label: "Elías Piña", color: "#BCBD22" },
  { value: "Espaillat", label: "Espaillat", color: "#17BECF" },
  { value: "Hato Mayor", label: "Hato Mayor", color: "#AEC7E8" },
  { value: "Hermanas Mirabal", label: "Hermanas Mirabal", color: "#FFBB78" },
  { value: "Independencia", label: "Independencia", color: "#98DF8A" },
  { value: "La Altagracia", label: "La Altagracia", color: "#FF9896" },
  { value: "La Romana", label: "La Romana", color: "#C5B0D5" },
  { value: "La Vega", label: "La Vega", color: "#C49C94" },
  {
    value: "María Trinidad Sánchez",
    label: "María Trinidad Sánchez",
    color: "#F7B6D2",
  },
  { value: "Monseñor Nouel", label: "Monseñor Nouel", color: "#C7C7C7" },
  { value: "Monte Cristi", label: "Monte Cristi", color: "#DBDB8D" },
  { value: "Monte Plata", label: "Monte Plata", color: "#9EDAE5" },
  { value: "Pedernales", label: "Pedernales", color: "#FFED6F" },
  { value: "Peravia", label: "Peravia", color: "#B5CF6B" },
  { value: "Puerto Plata", label: "Puerto Plata", color: "#FFC48C" },
  { value: "Samaná", label: "Samaná", color: "#A8DBA8" },
  { value: "San Cristóbal", label: "San Cristóbal", color: "#79BD9A" },
  { value: "San José de Ocoa", label: "San José de Ocoa", color: "#3B8686" },
  { value: "San Juan", label: "San Juan", color: "#0B486B" },
  {
    value: "San Pedro de Macorís",
    label: "San Pedro de Macorís",
    color: "#004D40",
  },
  { value: "Sánchez Ramírez", label: "Sánchez Ramírez", color: "#CFF09E" },
  { value: "Santiago", label: "Santiago", color: "#A3A500" },
  {
    value: "Santiago Rodríguez",
    label: "Santiago Rodríguez",
    color: "#F0E442",
  },
  { value: "Valverde", label: "Valverde", color: "#6D904F" },
];