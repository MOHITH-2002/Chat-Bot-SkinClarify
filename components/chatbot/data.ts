export type DiseaseKey =
  | "acne/rosacea"
  | "actinic_keratosos/basal_cell_carcinoma"
  | "eczema"
  | "melanma/nevi/moles"
  | "psoriasis/lichen"
  | "tinea_ringworm/candidiasis"
  | "urticaria/hives"
  | "nail_fungus";

export type DiseaseInfo = {
  description: string;
  symptoms: string;
  causes: string;
  "treatement-1": string;
  "treatement-2": string;
};

export const diseaseData: Record<DiseaseKey, DiseaseInfo> = {
    "acne/rosacea": { 
        "description":"Acne, also known as acne vulgaris, is a long-term skin disease that occurs when hair follicles are clogged with dead skin cells and oil from the skin.[10] It is characterized by blackheads or whiteheads, pimples, oily skin, and possible scarring.",
        "symptoms": "Scars and Pigmentation",
        "causes": "Risk factors for the development of acne, other than genetics, have not been conclusively identified. Possible secondary contributors include hormones, infections, diet and stress",
        "treatement-1": "https://www.medicinenet.com/acne/article.htm#what_is_acne",
        "treatement-2": "https://www.aad.org/public/diseases/acne-and-rosacea/rosacea/how-to-treat-the-redness"
    },
    "actinic_keratosos/basal_cell_carcinoma": {
        "description": "Actinic keratosis (AK) is a pre-cancerous[2] area of thick, scaly, or crusty skin.[3][4] These growths are more common in fair-skinned people and those who are frequently in the sun.[5] They are believed to form when skin gets damaged by ultraviolet (UV) radiation from the sun or indoor tanning beds, usually over the course of decades.",
        "symptoms": "Actinic keratoses (AKs) most commonly present as a white, scaly plaque of variable thickness with surrounding redness",
        "causes": "The most important cause of AK formation is solar radiation, through a variety of mechanisms. ",
        "treatement-1": "https://www.skincancer.org/skin-cancer-information/actinic-keratosis/actinic-keratosis-treatment-options",
        "treatement-2": "https://www.skincancer.org/skin-cancer-information/basal-cell-carcinoma/bcc-treatment-options"
    },
    "eczema": {
        "description": "Dermatitis, also known as eczema, is a group of diseases that results in inflammation of the skin.[1] These diseases are characterized by itchiness, red skin and a rash.[1] In cases of short duration, there may be small blisters, while in long-term cases the skin may become thickened.[1] The area of skin involved can vary from small to the entire body." ,
        "symptoms": "The symptoms of atopic dermatitis vary from person to person, the most common symptoms are dry, itchy, red skin. Typical affected skin areas include the folds of the arms, the back of the knees, wrists, face and hands. Perioral dermatitis refers to a red bumpy rash around the mouth.",
        "causes": "The cause of dermatitis is unknown but is presumed to be a combination of genetic and environmental factors.",
        "treatement-1": "https://www.medicalnewstoday.com/articles/14417.php",
        "treatement-2": "https://nationaleczema.org/eczema/treatment/"
    },
    "melanma/nevi/moles": {
        "description": "Melanoma, also known as malignant melanoma, is a type of cancer that develops from the pigment-containing cells known as melanocytes.[1] Melanomas typically occur in the skin, but may rarely occur in the mouth, intestines, or eye." ,
        "symptoms": "Early signs of melanoma are changes to the shape or color of existing moles or, in the case of nodular melanoma, the appearance of a new lump anywhere on the skin. At later stages, the mole may itch, ulcerate or bleed. Early signs of melanoma are summarized by the mnemonic ABCDEF Asymmetry Borders (irregular with edges and corners) Color (variegated) Diameter (greater than 6 mm (0.24 in), about the size of a pencil eraser) Evolving over time Funny looking",
        "causes": "Melanomas are usually caused by DNA damage resulting from exposure to ultraviolet light from the sun. Genetics also plays a role.",
        "treatement-1": "https://www.cancer.org/cancer/melanoma-skin-cancer/treating/by-stage.html",
        "treatement-2": "https://www.melanoma.org/understand-melanoma/melanoma-treatment"
    },
    "psoriasis/lichen": {
        "description": "Psoriasis is a long-lasting autoimmune disease characterized by patches of abnormal skin.[6] These skin patches are typically red, dry, itchy, and scaly.[3] On people with darker skin the patches may be purple in colour." ,
        "symptoms": "Plaque psoriasis typically appears as raised areas of inflamed skin covered with silvery-white scaly skin. These areas are called plaques and are most commonly found on the elbows, knees, scalp, and back.",
        "causes": "The cause of psoriasis is not fully understood, but a number of theories exist.",
        "treatement-1": "https://www.medicinenet.com/psoriasis/article.htm",
        "treatement-2": "https://www.mayoclinic.org/diseases-conditions/psoriasis/diagnosis-treatment/drc-20355845"
    },
    "tinea_ringworm/candidiasis": {
        "description": "Candidiasis is a fungal infection due to any type of Candida (a type of yeast).[2] When it affects the mouth, it is commonly called thrush.[2] Signs and symptoms include white patches on the tongue or other areas of the mouth and throat.[3] Other symptoms may include soreness and problems swallowing" ,
        "symptoms": "Signs and symptoms of candidiasis vary depending on the area affected.[17] Most candidal infections result in minimal complications such as redness, itching, and discomfort, though complications may be severe or even fatal if left untreated in certain populations.",
        "causes": "Candida yeasts are generally present in healthy humans, frequently part of the human body's normal oral and intestinal flora, and particularly on the skin; however, their growth is normally limited by the human immune system and by competition of other microorganisms, such as bacteria occupying the same locations in the human body.",
        "treatement-1": "https://www.cdc.gov/fungal/diseases/candidiasis/thrush/index.html",
        "treatement-2": "https://www.drugs.com/health-guide/candidiasis.html"
    },
    "urticaria/hives": {
        "description": "Hives, also known as urticaria, is a kind of skin rash with red, raised, itchy bumps.[1] They may also burn or sting.[2] Often the patches of rash move around.[2] Typically they last a few days and do not leave any long-lasting skin changes." ,
        "symptoms": "Welts (raised areas surrounded by a red base) from hives can appear anywhere on the surface of the skin. Whether the trigger is allergic or not, a complex release of inflammatory mediators, including histamine from cutaneous mast cells, results in fluid leakage from superficial blood vessels.",
        "causes": "Hives can also be classified by the purported causative agent. Many different substances in the environment may cause hives, including medications, food and physical agents. In perhaps more than 50% of people with chronic hives of unknown cause, it is due to an autoimmune reaction.[6]",
        "treatement-1": "https://www.webmd.com/skin-problems-and-treatments/guide/hives-urticaria-angioedema",
        "treatement-2": "https://acaai.org/allergies/types-allergies/hives-urticaria"
    },
    "nail_fungus": {
        "description": "A nail disease or onychosis is a disease or deformity of the nail. Although the nail is a structure produced by the skin and is a skin appendage, nail diseases have a distinct classification as they have their own signs and symptoms which may relate to other medical conditions. Some nail conditions that show signs of infection or inflammation may require medical assistance." ,
        "symptoms": "You may have nail fungus if one or more of your nails are: Thickened, Whitish to yellow-brown discoloration, Brittle, crumbly or ragged, Distorted in shape, A dark color, caused by debris building up under your nail, Smelling slightly foul",
        "causes": "Fungal nail infections are caused by various fungal organisms (fungi). The most common cause is a type of fungus called dermatophyte. Yeast and molds also can cause nail infections.",
        "treatement-1": "https://www.mayoclinic.org/diseases-conditions/nail-fungus/symptoms-causes/syc-20353294",
        "treatement-2": "https://www.healthline.com/health/fungal-nail-infection#prevention"
    }
    
}
