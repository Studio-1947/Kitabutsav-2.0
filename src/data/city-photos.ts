/**
 * One landmark photo per partner city, for the Partners page "city by city" cards.
 * All are from Wikimedia Commons under Creative Commons licences that allow reuse with credit;
 * the credit line is shown on each photo. The first six came with the Kitab Utsav 1.0 site; the
 * rest were added in November 2026. Keys match the partner city names in lower case.
 */
export interface CityPhoto { src: string; alt: { hi: string; en: string }; author: string; license: string; licenseUrl: string; source: string; focus?: string }

export const cityPhotos: Record<string, CityPhoto> = {
  bareilly: { src: "/cities/bareilly.webp", alt: { hi: "बरेली की छतों पर सूर्यास्त", en: "Sunset over the rooftops of Bareilly" }, author: "Abhimanyu7793", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Bareilly_Sunset.jpg" },
  bhopal: { src: "/cities/bhopal.webp", alt: { hi: "भोपाल की बड़ी झील पर नावें", en: "Boats on the Upper Lake, Bhopal" }, author: "Sgbot321", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Upper_Lake,_Bhopal,_M.P.jpg" },
  chandigarh: { src: "/cities/chandigarh.webp", alt: { hi: "चंडीगढ़ में ली कार्बूज़िये का विधान भवन", en: "Le Corbusier's Palace of Assembly, Chandigarh" }, author: "duncid", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Palace_of_Assembly_Chandigarh_2006.jpg" },
  indore: { src: "/cities/indore.webp", alt: { hi: "इन्दौर का राजवाड़ा", en: "Rajwada palace, Indore" }, author: "Bernard Gagnon", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Rajwada_Palace,_Indore.jpg" },
  mumbai: { src: "/cities/mumbai.webp", alt: { hi: "शाम को रोशन गेटवे ऑफ़ इंडिया, मुम्बई", en: "The Gateway of India lit up in the evening, Mumbai" }, author: "SriSriChinmaya", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Gateway_of_India_in_the_evening,_Mumbai,_India.jpg" },
  patna: { src: "/cities/patna.webp", alt: { hi: "पटना के बुद्ध स्मृति पार्क का स्तूप", en: "The stupa at Buddha Smriti Park, Patna" }, author: "Shivamsetu", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Buddha_Smriti_Park_Patna.jpg" },
  jaipur: { src: "/cities/jaipur.jpg", alt: { hi: "जयपुर का हवा महल", en: "Hawa Mahal, Jaipur" }, author: "Chainwit.", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:East_facade_Hawa_Mahal_Jaipur_from_ground_level_(July_2022)_-_img_01.jpg", focus: "50% 40%" },
  "new delhi": { src: "/cities/new-delhi.jpg", alt: { hi: "नई दिल्ली का इंडिया गेट", en: "India Gate, New Delhi" }, author: "Nikhilb239", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:India_Gate,_New_Delhi_from_West.jpg", focus: "62% 40%" },
  jalandhar: { src: "/cities/jalandhar.jpg", alt: { hi: "जालंधर का देवी तालाब मंदिर", en: "Devi Talab Mandir, Jalandhar" }, author: "Shivamsetu", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Devi_Talab_Mandir,_Jalandhar,_Punjab,_19_September_2017_(cropped).jpg", focus: "50% 45%" },
  ranchi: { src: "/cities/ranchi.jpg", alt: { hi: "राँची का जगन्नाथ मंदिर", en: "Jagannath Temple, Ranchi" }, author: "Divya Prakash Bhardwaj", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:IMGJagannathpur_Temple.jpg", focus: "50% 35%" },
};
