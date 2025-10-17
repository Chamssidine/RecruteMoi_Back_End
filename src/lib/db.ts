
import type { Category, Job, Prompt, Metier } from './types';

const professions = {
  "Categories": [
    {
      "Fr": "Agriculture, marine, pêche",
      "En": "Agriculture, Marine, Fishing",
      "IconUrl": "https://picsum.photos/seed/1/100/100",
      "ImageUrl": "https://picsum.photos/seed/101/400/200",
      "Metiers": [
        { "Fr": "Agriculteurs salariés", "En": "Salaried Farmers", "Rome": "A1402" },
        { "Fr": "Éleveurs salariés", "En": "Salaried Breeders", "Rome": "A1403" },
        { "Fr": "Bûcherons, sylviculteurs salariés et agents forestiers", "En": "Loggers, Salaried Foresters, and Forest Agents", "Rome": "A1404" },
        { "Fr": "Conducteurs d'engins agricoles ou forestiers", "En": "Agricultural or Forestry Machinery Operators", "Rome": "A1405" },
        { "Fr": "Maraîchers, horticulteurs salariés", "En": "Salaried Market Gardeners and Horticulturists", "Rome": "A1406" },
        { "Fr": "Jardiniers salariés", "En": "Salaried Gardeners", "Rome": "A1407" },
        { "Fr": "Viticulteurs, arboriculteurs salariés", "En": "Salaried Viticulturists and Arboriculturists", "Rome": "A1408" },
        { "Fr": "Techniciens et agents d'encadrement d'exploitations agricoles", "En": "Agricultural Operations Technicians and Supervisors", "Rome": "A1409" },
        { "Fr": "Ingénieurs, cadres techniques de l'agriculture", "En": "Agricultural Engineers and Technical Executives", "Rome": "A1410" },
        { "Fr": "Pêcheurs, aquaculteurs salariés", "En": "Fishermen, Salaried Aquaculturists", "Rome": "A1411" },
        { "Fr": "Marins salariés", "En": "Salaried Seafarers", "Rome": "A1412" },
        { "Fr": "Cadres et maîtres d'équipage de la marine", "En": "Marine Executives and Crew Masters", "Rome": "A1413" }
      ]
    },
    {
      "Fr": "Bâtiment, travaux publics",
      "En": "Construction, Public Works",
      "IconUrl": "https://picsum.photos/seed/2/100/100",
      "ImageUrl": "https://picsum.photos/seed/102/400/200",
      "Metiers": [
        { "Fr": "Ouvriers non qualifiés des travaux publics, du béton et de l'extraction", "En": "Unskilled Public Works, Concrete, and Extraction Workers", "Rome": "B0102" },
        { "Fr": "Ouvriers non qualifiés du gros œuvre du bâtiment", "En": "Unskilled Major Building Construction Workers", "Rome": "B0202" },
        { "Fr": "Ouvriers qualifiés des travaux publics, du béton et de l'extraction", "En": "Skilled Public Works, Concrete, and Extraction Workers", "Rome": "B0103" },
        { "Fr": "Maçons", "En": "Masons", "Rome": "B0203" },
        { "Fr": "Professionnels du travail de la pierre et des matériaux associés", "En": "Stone and Associated Materials Professionals", "Rome": "B0204" },
        { "Fr": "Charpentiers (métal)", "En": "Metal Carpenters", "Rome": "B0205" },
        { "Fr": "Charpentiers (bois)", "En": "Wood Carpenters", "Rome": "B0206" },
        { "Fr": "Couvreurs", "En": "Roofers", "Rome": "B0207" },
        { "Fr": "Ouvriers non qualifiés du second œuvre du bâtiment", "En": "Unskilled Second-Work Building Workers", "Rome": "B0302" },
        { "Fr": "Plombiers, chauffagistes", "En": "Plumbers, Heating Engineers", "Rome": "B0303" },
        { "Fr": "Menuisiers et ouvriers de l'agencement et de l'isolation", "En": "Carpenters and Workers in Fitting and Insulation", "Rome": "B0304" },
        { "Fr": "Électriciens du bâtiment", "En": "Building Electricians", "Rome": "B0305" },
        { "Fr": "Ouvriers qualifiés de la peinture et de la finition du bâtiment", "En": "Skilled Painting and Finishing Workers in Construction", "Rome": "B0306" },
        { "Fr": "Conducteurs d'engins du bâtiment et des travaux publics", "En": "Construction and Public Works Machinery Operators", "Rome": "B0402" },
        { "Fr": "Géomètres", "En": "Surveyors", "Rome": "B0502" },
        { "Fr": "Techniciens et chargés d'études du bâtiment et des travaux publics", "En": "Building and Public Works Technicians and Study Managers", "Rome": "B0602" },
        { "Fr": "Dessinateurs en bâtiment et en travaux publics", "En": "Building and Public Works Draftsmen", "Rome": "B0603" },
        { "Fr": "Chefs de chantier, conducteurs de travaux (non cadres)", "En": "Site Supervisors, Project Managers (Non-Executives)", "Rome": "B0702" },
        { "Fr": "Architectes", "En": "Architects", "Rome": "B0802" },
        { "Fr": "Ingénieurs du bâtiment et des travaux publics, chefs de chantier et conducteurs de travaux (cadres)", "En": "Civil Engineers, Site Supervisors, and Project Managers (Executives)", "Rome": "B0902" }
      ]
    },
    {
      "Fr": "Électricité, électronique",
      "En": "Electricity, Electronics",
      "IconUrl": "https://picsum.photos/seed/3/100/100",
      "ImageUrl": "https://picsum.photos/seed/103/400/200",
      "Metiers": [
        { "Fr": "Ouvriers non qualifiés de l'électricité et de l'électronique", "En": "Unskilled Electrical and Electronic Workers", "Rome": "M1802" },
        { "Fr": "Ouvriers qualifiés de l'électricité et de l'électronique", "En": "Skilled Electrical and Electronic Workers", "Rome": "M1803" },
        { "Fr": "Techniciens en électricité et en électronique", "En": "Electricity and Electronics Technicians", "Rome": "M1804" },
        { "Fr": "Dessinateurs en électricité et en électronique", "En": "Electrical and Electronic Draftsmen", "Rome": "M1805" },
        { "Fr": "Agents de maîtrise et assimilés en fabrication de matériel électrique, électronique", "En": "Foremen and Similar in Electrical and Electronic Equipment Manufacturing", "Rome": "M1806" }
      ]
    },
    {
      "Fr": "Mécanique, travail des métaux",
      "En": "Mechanics, Metalworking",
      "IconUrl": "https://picsum.photos/seed/4/100/100",
      "ImageUrl": "https://picsum.photos/seed/104/400/200",
      "Metiers": [
        { "Fr": "Ouvriers non qualifiés des industries agro-alimentaires", "En": "Unskilled Workers in the Agri-food Industries", "Rome": "M1202" },
        { "Fr": "Régleurs", "En": "Setters", "Rome": "M1103" },
        { "Fr": "Ouvriers qualifiés travaillant par enlèvement de métal", "En": "Skilled Workers in Metal Removal", "Rome": "M1203" },
        { "Fr": "Chaudronniers, tôliers, traceurs, serruriers, métalliers, forgerons", "En": "Boilermakers, Sheet Metal Workers, Draftsmen, Locksmiths, Metalworkers, Blacksmiths", "Rome": "M1204" },
        { "Fr": "Tuyauteurs", "En": "Pipefitters", "Rome": "M1205" },
        { "Fr": "Soudeurs", "En": "Welders", "Rome": "M1206" },
        { "Fr": "Ouvriers non qualifiés métallerie, serrurerie, montage", "En": "Unskilled Workers in Metalworking, Locksmithing, Assembly", "Rome": "M1207" },
        { "Fr": "Monteurs, ajusteurs et autres ouvriers qualifiés de la mécanique", "En": "Mechanical Assemblers, Adjusters and Other Skilled Mechanical Workers", "Rome": "M1104" },
        { "Fr": "Agents qualifiés de traitement thermique et de surface", "En": "Skilled Workers in Heat Treatment and Surface Processing", "Rome": "M1105" },
        { "Fr": "Techniciens en mécanique et travail des métaux", "En": "Mechanical and Metalworking Technicians", "Rome": "M1106" },
        { "Fr": "Dessinateurs en mécanique et travail des métaux", "En": "Mechanical and Metalworking Draftsmen", "Rome": "M1107" },
        { "Fr": "Agents de maîtrise et assimilés en fabrication mécanique", "En": "Foremen and Similar in Mechanical Manufacturing", "Rome": "M1108" }
      ]
    },
    {
      "Fr": "Industries de process",
      "En": "Process Industries",
      "IconUrl": "https://picsum.photos/seed/5/100/100",
      "ImageUrl": "https://picsum.photos/seed/105/400/200",
      "Metiers": [
        { "Fr": "Ouvriers non qualifiés des industries chimiques et plastiques", "En": "Unskilled Workers in Chemical and Plastic Industries", "Rome": "M1002" },
        { "Fr": "Ouvriers non qualifiés des industries agro-alimentaires", "En": "Unskilled Workers in Agri-food Industries", "Rome": "M1003" },
        { "Fr": "Ouvriers non qualifiés en métallurgie, verre, céramique et matériaux de construction", "En": "Unskilled Workers in Metallurgy, Glass, Ceramics, and Construction Materials", "Rome": "M1004" },
        { "Fr": "Ouvriers non qualifiés du papier-carton et du bois", "En": "Unskilled Paper-Cardboard and Wood Workers", "Rome": "M1005" },
        { "Fr": "Autres ouvriers non qualifiés de type industriel", "En": "Other Unskilled Industrial Workers", "Rome": "M1006" },
        { "Fr": "Pilotes d'installation lourde des industries de transformation", "En": "Operators of Heavy Machinery in Manufacturing Industries", "Rome": "M1101" },
        { "Fr": "Autres ouvriers qualifiés des industries chimiques et plastiques", "En": "Other Skilled Workers in Chemical and Plastic Industries", "Rome": "M1007" },
        { "Fr": "Autres ouvriers qualifiés des industries agro-alimentaires (hors transformation des viandes)", "En": "Other Skilled Workers in Agri-food Industries (Excluding Meat Processing)", "Rome": "M1008" },
        { "Fr": "Autres ouvriers qualifiés en verre, céramique, métallurgie, matériaux de construction et énergie", "En": "Other Skilled Workers in Glass, Ceramics, Metallurgy, Construction Materials, and Energy", "Rome": "M1009" },
        { "Fr": "Ouvriers qualifiés des industries lourdes du bois et de la fabrication de papier-carton", "En": "Skilled Workers in Heavy Wood Industries and Paper-Cardboard Manufacturing", "Rome": "M1010" }
      ]
    },
    {
      "Fr": "Maintenance",
      "En": "Maintenance",
      "IconUrl": "https://picsum.photos/seed/6/100/100",
      "ImageUrl": "https://picsum.photos/seed/106/400/200",
      "Metiers": [
        { "Fr": "Ouvriers qualifiés de la maintenance en mécanique", "En": "Skilled Mechanical Maintenance Workers", "Rome": "M1312" },
        { "Fr": "Ouvriers qualifiés de la maintenance en électricité et en électronique", "En": "Skilled Electrical and Electronic Maintenance Workers", "Rome": "M1313" },
        { "Fr": "Mainteniciens en biens électrodomestiques", "En": "Home Appliance Maintenance Technicians", "Rome": "M1314" },
        { "Fr": "Ouvriers qualifiés polyvalents d'entretien du bâtiment", "En": "Skilled Multi-trade Building Maintenance Workers", "Rome": "M1412" },
        { "Fr": "Carrossiers automobiles", "En": "Automotive Bodyworkers", "Rome": "M1413" },
        { "Fr": "Mécaniciens et électroniciens de véhicules", "En": "Vehicle Mechanics and Electricians", "Rome": "M1414" },
        { "Fr": "Techniciens et agents de maîtrise de la maintenance et de l'environnement", "En": "Maintenance and Environmental Management Technicians and Supervisors", "Rome": "M1512" },
        { "Fr": "Techniciens experts", "En": "Expert Technicians", "Rome": "M1513" },
        { "Fr": "Agents de maîtrise en entretien", "En": "Maintenance Supervisors", "Rome": "M1514" }
      ]
    },
    {
      "Fr": "Transports, logistique et tourisme",
      "En": "Transportation, Logistics and Tourism",
      "IconUrl": "https://picsum.photos/seed/7/100/100",
      "ImageUrl": "https://picsum.photos/seed/107/400/200",
      "Metiers": [
        { "Fr": "Ouvriers non qualifiés de l'emballage et manutentionnaires", "En": "Unskilled Packaging Workers and Handlers", "Rome": "M1202" },
        { "Fr": "Ouvriers qualifiés du magasinage et de la manutention", "En": "Skilled Warehouse and Handling Workers", "Rome": "M1203" },
        { "Fr": "Responsables magasinage", "En": "Warehouse Managers", "Rome": "M1204" },
        { "Fr": "Conducteurs de véhicules légers", "En": "Light Vehicle Drivers", "Rome": "M1212" },
        { "Fr": "Conducteurs de transport en commun sur route", "En": "Road Public Transport Drivers", "Rome": "M1213" },
        { "Fr": "Conducteurs et livreurs sur courte distance", "En": "Short-Distance Drivers and Delivery Personnel", "Rome": "M1214" },
        { "Fr": "Conducteurs routiers", "En": "Road Drivers", "Rome": "M1215" },
        { "Fr": "Conducteurs sur rails et d'engins de traction", "En": "Rail and Traction Engine Drivers", "Rome": "M1216" },
        { "Fr": "Agents d'exploitation des transports", "En": "Transport Operations Agents", "Rome": "M1217" },
        { "Fr": "Contrôleurs des transports", "En": "Transport Controllers", "Rome": "M1218" },
        { "Fr": "Responsables logistiques (non cadres)", "En": "Logistics Managers (Non-executives)", "Rome": "M1222" },
        { "Fr": "Agents et hôtesses d'accompagnement", "En": "Escort Agents and Hostesses", "Rome": "M1223" },
        { "Fr": "Agents administratifs des transports", "En": "Administrative Transport Agents", "Rome": "M1224" },
        { "Fr": "Employés des transports et du tourisme", "En": "Transport and Tourism Employees", "Rome": "M1225" },
        { "Fr": "Techniciens des transports et du tourisme", "En": "Transport and Tourism Technicians", "Rome": "M1226" },
        { "Fr": "Cadres des transports", "En": "Transport Executives", "Rome": "M1227" },
        { "Fr": "Personnels navigants de l'aviation", "En": "Aviation Crew", "Rome": "M1228" },
        { "Fr": "Ingénieurs et cadres de la logistique, du planning et de l'ordonnancement", "En": "Logistics, Planning, and Scheduling Engineers and Executives", "Rome": "M1229" }
      ]
    },
    {
      "Fr": "Gestion, administration des entreprises",
      "En": "Business Management and Administration",
      "IconUrl": "https://picsum.photos/seed/8/100/100",
      "ImageUrl": "https://picsum.photos/seed/108/400/200",
      "Metiers": [
        { "Fr": "Secrétaires bureautiques et assimilés", "En": "Office Secretaries and Similar Roles", "Rome": "M1102" },
        { "Fr": "Employés de la comptabilité", "En": "Accounting Clerks", "Rome": "M1103" },
        { "Fr": "Agents d'accueil et d'information", "En": "Reception and Information Agents", "Rome": "M1104" },
        { "Fr": "Agents administratifs divers", "En": "Various Administrative Agents", "Rome": "M1105" },
        { "Fr": "Secrétaires de direction", "En": "Executive Secretaries", "Rome": "M1106" },
        { "Fr": "Techniciens des services administratifs", "En": "Administrative Services Technicians", "Rome": "M1107" },
        { "Fr": "Techniciens des services comptables et financiers", "En": "Accounting and Financial Services Technicians", "Rome": "M1108" },
        { "Fr": "Cadres administratifs, comptables et financiers (hors juristes)", "En": "Administrative, Accounting, and Financial Executives (excluding Lawyers)", "Rome": "M1109" },
        { "Fr": "Juristes", "En": "Lawyers", "Rome": "M1110" },
        { "Fr": "Cadres des ressources humaines et du recrutement", "En": "Human Resources and Recruitment Executives", "Rome": "M1111" },
        { "Fr": "Cadres dirigeants des grandes entreprises", "En": "Senior Executives of Large Companies", "Rome": "M1112" }
      ]
    },
    {
      "Fr": "Artisanat",
      "En": "Craftsmanship",
      "IconUrl": "https://picsum.photos/seed/9/100/100",
      "ImageUrl": "https://picsum.photos/seed/109/400/200",
      "Metiers": [
        { "Fr": "Ouvriers non qualifiés divers de type artisanal", "En": "Various Unskilled Artisanal Workers", "Rome": "M1002" },
        { "Fr": "Artisans et ouvriers qualifiés divers de type artisanal", "En": "Various Skilled Artisanal Craftsmen and Workers", "Rome": "M1003" }
      ]
    },
    {
      "Fr": "Informatique et télécommunications / Études et recherche",
      "En": "Information Technology and Telecommunications / Studies and Research",
      "IconUrl": "https://picsum.photos/seed/10/100/100",
      "ImageUrl": "https://picsum.photos/seed/110/400/200",
      "Metiers": [
        { "Fr": "Employés et opérateurs en informatique", "En": "Computer Employees and Operators", "Rome": "M2102" },
        { "Fr": "Techniciens de production, d'exploitation, d'installation, et de maintenance, support et services aux utilisateurs en informatique", "En": "IT Production, Operation, Installation, and Maintenance Technicians, Support and User Services", "Rome": "M2104" },
        { "Fr": "Ingénieurs et cadres d'étude, recherche et développement en informatique, chefs de projets informatiques", "En": "Computer Science Engineers and Executives in Study, Research and Development, IT Project Managers", "Rome": "M2105" },
        { "Fr": "Ingénieurs et cadres d'administration, maintenance en informatique", "En": "IT Administration and Maintenance Engineers and Executives", "Rome": "M2106" },
        { "Fr": "Ingénieurs et cadres des télécommunications", "En": "Telecommunications Engineers and Executives", "Rome": "M2107" }
      ]
    },
    {
      "Fr": "Études et recherche",
      "En": "Studies and Research",
      "IconUrl": "https://picsum.photos/seed/11/100/100",
      "ImageUrl": "https://picsum.photos/seed/111/400/200",
      "Metiers": [
        { "Fr": "ingénieurs et cadres d'étude, recherche et développement (industrie)", "En": "Engineers and Executives in Study, Research and Development (Industry)", "Rome": "M2202" },
        { "Fr": "Chercheurs (sauf industrie et enseignement supérieur)", "En": "Researchers (excluding Industry and Higher Education)", "Rome": "M2203" }
      ]
    },
    {
      "Fr": "Banque et Assurances",
      "En": "Banking and Insurance",
      "IconUrl": "https://picsum.photos/seed/12/100/100",
      "ImageUrl": "https://picsum.photos/seed/112/400/200",
      "Metiers": [
        { "Fr": "Employés de la banque et des assurances", "En": "Bank and Insurance Employees", "Rome": "M2302" },
        { "Fr": "Techniciens de la banque", "En": "Bank Technicians", "Rome": "M2303" },
        { "Fr": "Techniciens des assurances", "En": "Insurance Technicians", "Rome": "M2304" },
        { "Fr": "Cadres de la banque", "En": "Bank Executives", "Rome": "M2305" }
      ]
    },
    {
      "Fr": "Commerce",
      "En": "Commerce",
      "IconUrl": "https://picsum.photos/seed/13/100/100",
      "ImageUrl": "https://picsum.photos/seed/113/400/200",
      "Metiers": [
        { "Fr": "Employés de libre service", "En": "Self-Service Employees", "Rome": "M2402" },
        { "Fr": "Caissiers", "En": "Cashiers", "Rome": "M2403" },
        { "Fr": "Vendeurs en produits alimentaires", "En": "Food Products Salespersons", "Rome": "M2404" },
        { "Fr": "Vendeurs en ameublement, équipement du foyer, bricolage", "En": "Furniture, Home Equipment, and DIY Salespersons", "Rome": "M2405" },
        { "Fr": "Vendeurs en habillement et accessoires, articles de luxe, de sport, de loisirs et culturels", "En": "Clothing and Accessories, Luxury Goods, Sports, Leisure, and Cultural Items Salespersons", "Rome": "M2406" },
        { "Fr": "Vendeurs en gros de matériel et équipements", "En": "Wholesale Salespersons of Equipment and Supplies", "Rome": "M2407" },
        { "Fr": "Vendeurs généralistes", "En": "Generalist Salespersons", "Rome": "M2408" },
        { "Fr": "Télévendeurs", "En": "Telesales Operators", "Rome": "M2409" },
        { "Fr": "Attachés commerciaux", "En": "Sales Representatives", "Rome": "M2410" },
        { "Fr": "Représentants auprès des particuliers", "En": "Representatives for Individuals", "Rome": "M2411" },
        { "Fr": "Maîtrise des magasins", "En": "Store Management", "Rome": "M2412" },
        { "Fr": "Professions intermédiaires commerciales", "En": "Commercial Intermediate Professions", "Rome": "M2413" },
        { "Fr": "Cadres commerciaux, acheteurs et cadres de la mercatique", "En": "Commercial Executives, Buyers, and Marketing Executives", "Rome": "M2414" },
        { "Fr": "Ingénieurs et cadres technico-commerciaux", "En": "Technical and Commercial Engineers and Executives", "Rome": "M2415" },
        { "Fr": "Cadres des magasins", "En": "Store Executives", "Rome": "M2416" },
        { "Fr": "Agents immobiliers, syndics", "En": "Real Estate Agents, Trustees", "Rome": "M2417" }
      ]
    },
    {
      "Fr": "Hôtellerie, restauration, alimentation",
      "En": "Hotel Industry, Catering, Food",
      "IconUrl": "https://picsum.photos/seed/14/100/100",
      "ImageUrl": "https://picsum.photos/seed/114/400/200",
      "Metiers": [
        { "Fr": "Apprentis et ouvriers non qualifiés de l'alimentation (hors industries agro-alimentaires)", "En": "Apprentices and Unskilled Food Workers (excluding Agri-food Industries)", "Rome": "M2502" },
        { "Fr": "Bouchers", "En": "Butchers", "Rome": "M2503" },
        { "Fr": "Charcutiers, traiteurs", "En": "Pork Butchers, Caterers", "Rome": "M2504" },
        { "Fr": "Boulangers, pâtissiers", "En": "Bakers, Pastry Chefs", "Rome": "M2505" },
        { "Fr": "Aides de cuisine, apprentis de cuisine et employés polyvalents de la restauration", "En": "Kitchen Assistants, Apprentice Cooks and Multi-tasking Restaurant Employees", "Rome": "M2506" },
        { "Fr": "Cuisiniers", "En": "Cooks", "Rome": "M2507" },
        { "Fr": "Chefs cuisiniers", "En": "Head Chefs", "Rome": "M2508" },
        { "Fr": "Employés de l'hôtellerie", "En": "Hotel Employees", "Rome": "M2509" },
        { "Fr": "Serveurs de cafés restaurants", "En": "Café and Restaurant Waiters", "Rome": "M2510" },
        { "Fr": "Maîtres d'hôtel", "En": "Maîtres d'Hôtel", "Rome": "M2511" },
        { "Fr": "Maîtrise de l'hôtellerie", "En": "Hotel Management", "Rome": "M2512" },
        { "Fr": "Cadres de l'hôtellerie et de la restauration", "En": "Hotel and Restaurant Executives", "Rome": "M2513" }
      ]
    },
    {
      "Fr": "Services aux particuliers et aux collectivités",
      "En": "Services for Individuals and Communities",
      "IconUrl": "https://picsum.photos/seed/15/100/100",
      "ImageUrl": "https://picsum.photos/seed/115/400/200",
      "Metiers": [
        { "Fr": "Coiffeurs, esthéticiens", "En": "Hairdressers, Beauticians", "Rome": "M2602" },
        { "Fr": "Employés de maison et personnels de ménage", "En": "House Employees and Housekeeping Staff", "Rome": "M2603" },
        { "Fr": "Aides à domicile et aides ménagères", "En": "Home Helpers and Housekeepers", "Rome": "M2604" },
        { "Fr": "Assistantes maternelles", "En": "Childcare Assistants", "Rome": "M2605" },
        { "Fr": "Concierges", "En": "Concierges", "Rome": "M2606" },
        { "Fr": "Agents de sécurité et de surveillance", "En": "Security and Surveillance Agents", "Rome": "M2607" },
        { "Fr": "Agents d'entretien de locaux", "En": "Facilities Maintenance Workers", "Rome": "M2608" },
        { "Fr": "Agents de services hospitaliers", "En": "Hospital Services Staff", "Rome": "M2609" },
        { "Fr": "Ouvriers de l'assainissement et du traitement des déchets", "En": "Sanitation and Waste Treatment Workers", "Rome": "M2610" },
        { "Fr": "Employés des services divers", "En": "Various Service Employees", "Rome": "M2611" }
      ]
    },
    {
      "Fr": "Communication, information, art et spectacle",
      "En": "Communication, Information, Art and Entertainment",
      "IconUrl": "https://picsum.photos/seed/16/100/100",
      "ImageUrl": "https://picsum.photos/seed/116/400/200",
      "Metiers": [
        { "Fr": "Assistants de communication", "En": "Communication Assistants", "Rome": "M2702" },
        { "Fr": "Interprètes", "En": "Interpreters", "Rome": "M2703" },
        { "Fr": "Cadres de la communication", "En": "Communication Executives", "Rome": "M2704" },
        { "Fr": "Cadres et techniciens de la documentation", "En": "Documentation Executives and Technicians", "Rome": "M2705" },
        { "Fr": "Journalistes et cadres de l'édition", "En": "Journalists and Publishing Executives", "Rome": "M2706" },
        { "Fr": "Professionnels des spectacles", "En": "Entertainment Professionals", "Rome": "M2707" },
        { "Fr": "Photographes", "En": "Photographers", "Rome": "M2708" },
        { "Fr": "Graphistes, dessinateurs, stylistes, décorateurs et créateurs de supports de communication visuelle", "En": "Graphic Designers, Draftsmen, Stylists, Decorators, and Creators of Visual Communication Media", "Rome": "M2709" },
        { "Fr": "Artistes (musique, danse, spectacles)", "En": "Artists (Music, Dance, Shows)", "Rome": "M2710" },
        { "Fr": "Écrivains", "En": "Writers", "Rome": "M2711" },
        { "Fr": "Artistes plasticiens", "En": "Visual Artists", "Rome": "M2712" }
      ]
    },
    {
      "Fr": "Santé, action sociale, culturelle et sportive",
      "En": "Health, Social, Cultural, and Sports",
      "IconUrl": "https://picsum.photos/seed/17/100/100",
      "ImageUrl": "https://picsum.photos/seed/117/400/200",
      "Metiers": [
        { "Fr": "Aides-soignants", "En": "Nursing Assistants", "Rome": "M3102" },
        { "Fr": "Infirmiers", "En": "Nurses", "Rome": "M3103" },
        { "Fr": "Sages-femmes", "En": "Midwives", "Rome": "M3104" },
        { "Fr": "Médecins", "En": "Doctors", "Rome": "M3105" },
        { "Fr": "Dentistes", "En": "Dentists", "Rome": "M3106" },
        { "Fr": "Vétérinaires", "En": "Veterinarians", "Rome": "M3107" },
        { "Fr": "Pharmaciens", "En": "Pharmacists", "Rome": "M3108" },
        { "Fr": "Techniciens médicaux et préparateurs", "En": "Medical Technicians and Preparers", "Rome": "M3109" },
        { "Fr": "Spécialistes de l'appareillage médical", "En": "Medical Appliance Specialists", "Rome": "M3110" },
        { "Fr": "Autres professionnels para-médicaux", "En": "Other Paramedical Professionals", "Rome": "M3111" },
        { "Fr": "Psychologues, psychothérapeutes", "En": "Psychologists, Psychotherapists", "Rome": "M3202" },
        { "Fr": "Professionnels de l'orientation", "En": "Guidance Professionals", "Rome": "M3203" },
        { "Fr": "Educateurs spécialisés", "En": "Specialized Educators", "Rome": "M3204" },
        { "Fr": "Professionnels de l'action sociale", "En": "Social Work Professionals", "Rome": "M3205" },
        { "Fr": "Professionnels de l'animation socioculturelle", "En": "Socio-Cultural Animation Professionals", "Rome": "M3206" },
        { "Fr": "Sportifs et animateurs sportifs", "En": "Athletes and Sports Instructors", "Rome": "M3207" },
        { "Fr": "Surveillants d'établissements scolaires", "En": "School Establishment Monitors", "Rome": "M3208" }
      ]
    },
    {
      "Fr": "Enseignement, formation",
      "En": "Teaching and Training",
      "IconUrl": "https://picsum.photos/seed/18/100/100",
      "ImageUrl": "https://picsum.photos/seed/118/400/200",
      "Metiers": [
        { "Fr": "Professeurs des écoles", "En": "Primary School Teachers", "Rome": "M4102" },
        { "Fr": "Professeurs du secondaire", "En": "Secondary School Teachers", "Rome": "M4103" },
        { "Fr": "Directeurs d'établissement scolaire et inspecteurs", "En": "School Principals and Inspectors", "Rome": "M4104" },
        { "Fr": "Professeurs du supérieur", "En": "Higher Education Professors", "Rome": "M4105" },
        { "Fr": "Formateurs", "En": "Trainers", "Rome": "M4106" }
      ]
    }
  ]
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getProfessions = async (): Promise<typeof professions> => {
  await delay(50);
  return professions;
};

// The following functions are kept for potential future use but are not currently used
// as the primary data source is the static `professions` object.

let categories: {id: string, name: string, description: string, jobCount: number}[] = [
  { id: '1', name: 'Information Technology', description: 'Jobs related to computers, software, and networking.', jobCount: 2 },
  { id: '2', name: 'Healthcare', description: 'Jobs related to providing medical services.', jobCount: 1 },
  { id: '3', name: 'Sales', description: 'Jobs related to selling products or services.', jobCount: 1 },
];

let jobs: Job[] = [
  { 
    id: '1', 
    categoryId: '1', 
    title: 'Frontend Developer', 
    description: 'Builds user interfaces for web applications.',
    requiredSkills: ['React', 'TypeScript', 'CSS', 'Next.js'],
    softSkills: ['Communication', 'Teamwork', 'Problem-solving']
  },
  { 
    id: '2', 
    categoryId: '1', 
    title: 'Unity Developer', 
    description: 'Creates experiences using the Unity engine.',
    requiredSkills: ['Unity', 'C#', '3D Math', 'VR/AR'],
    softSkills: ['Creativity', 'Attention to Detail', 'Collaboration']
  },
  { 
    id: '3', 
    categoryId: '2', 
    title: 'Registered Nurse', 
    description: 'Provides patient care in a hospital setting.',
    requiredSkills: ['Patient Assessment', 'Medication Administration', 'Electronic Health Records'],
    softSkills: ['Empathy', 'Communication', 'Stamina']
  },
  { 
    id: '4', 
    categoryId: '3', 
    title: 'Sales Associate', 
    description: 'Assists customers and drives sales.',
    requiredSkills: ['Product Knowledge', 'POS Systems', 'Customer Service'],
    softSkills: ['Persuasion', 'Friendliness', 'Resilience']
  },
];

let prompts: Prompt[] = [
    { id: '1', jobId: '1', text: 'Tell me about a challenging project you worked on with React.' },
    { id: '2', jobId: '1', text: 'How do you ensure your CSS is maintainable and scalable?' },
    { id: '3', jobId: '2', text: 'Describe your experience with performance optimization in Unity.' },
];


// --- Categories ---
export const getCategories = async (): Promise<{id: string, name: string, description: string, jobCount: number}[]> => {
  await delay(50);
  const jobsByCategory = jobs.reduce((acc, job) => {
    acc[job.categoryId] = (acc[job.categoryId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return categories.map(c => ({...c, jobCount: jobsByCategory[c.id] || 0}));
};

export const getCategory = async (id: string): Promise<{id: string, name: string, description: string, jobCount: number} | undefined> => {
    await delay(50);
    return categories.find(c => c.id === id);
}

export const addCategory = async (data: Omit<{id: string, name: string, description: string, jobCount: number}, 'id' | 'jobCount'>): Promise<{id: string, name: string, description: string, jobCount: number}> => {
  await delay(100);
  const newCategory = { ...data, id: Date.now().toString(), jobCount: 0 };
  categories.push(newCategory);
  return newCategory;
};

export const updateCategory = async (id: string, data: Partial<Omit<{id: string, name: string, description: string, jobCount: number}, 'id' | 'jobCount'>>): Promise<{id: string, name: string, description: string, jobCount: number} | null> => {
    await delay(100);
    let categoryToUpdate = await getCategory(id);
    if (categoryToUpdate) {
        const updatedCategory = { ...categoryToUpdate, ...data };
        categories = categories.map(c => c.id === id ? updatedCategory : c);
        return updatedCategory;
    }
    return null;
}

export const deleteCategory = async (id: string): Promise<boolean> => {
    await delay(100);
    const initialLength = categories.length;
    categories = categories.filter(c => c.id !== id);
    // also delete associated jobs and prompts
    const jobsToDelete = jobs.filter(j => j.categoryId === id).map(j => j.id);
    jobs = jobs.filter(j => j.categoryId !== id);
    prompts = prompts.filter(p => !jobsToDelete.includes(p.jobId));
    return categories.length < initialLength;
}


// --- Jobs ---
export const getJobs = async (): Promise<Job[]> => {
    await delay(50);
    return jobs;
}

export const getJob = async (id: string): Promise<Job | undefined> => {
    await delay(50);
    return jobs.find(j => j.id === id);
}

export const addJob = async (data: Omit<Job, 'id'>): Promise<Job> => {
    await delay(100);
    const newJob: Job = { ...data, id: Date.now().toString() };
    jobs.push(newJob);
    return newJob;
}

export const updateJob = async (id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> => {
    await delay(100);
    let jobToUpdate = await getJob(id);
    if (jobToUpdate) {
        const updatedJob = { ...jobToUpdate, ...data };
        jobs = jobs.map(j => j.id === id ? updatedJob : j);
        return updatedJob;
    }
    return null;
}

export const deleteJob = async (id: string): Promise<boolean> => {
    await delay(100);
    const initialLength = jobs.length;
    jobs = jobs.filter(j => j.id !== id);
    // also delete associated prompts
    prompts = prompts.filter(p => p.jobId !== id);
    return jobs.length < initialLength;
}

// --- Prompts ---
export const getPromptsByJobId = async (jobId: string): Promise<Prompt[]> => {
    await delay(50);
    return prompts.filter(p => p.jobId === jobId);
}

export const addPrompt = async (data: Omit<Prompt, 'id'>): Promise<Prompt> => {
    await delay(100);
    const newPrompt: Prompt = { ...data, id: Date.now().toString() };
    prompts.push(newPrompt);
    return newPrompt;
}

export const deletePrompt = async (id: string): Promise<boolean> => {
    await delay(100);
    const initialLength = prompts.length;
    prompts = prompts.filter(p => p.id !== id);
    return prompts.length < initialLength;
}
