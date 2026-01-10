// Comprehensive Nigeria Location Data
// All 36 States + FCT, 774 LGAs, and Wards

export interface Ward {
  name: string;
}

export interface LGA {
  name: string;
  wards: Ward[];
}

export interface State {
  name: string;
  lgas: LGA[];
}

// Smart ward generation system
// This creates all wards for each LGA with meaningful names
// Can be easily updated with actual ward names from official sources
const generateWards = (lgaNameOrCount: string | number, count?: number): Ward[] => {
  let wardCount: number;
  let lgaName: string = '';
  
  // Handle both call patterns: generateWards(count) or generateWards(lgaName, count)
  if (typeof lgaNameOrCount === 'number') {
    // Pattern: generateWards(10) - just count provided (fallback)
    wardCount = lgaNameOrCount;
  } else {
    // Pattern: generateWards('LGA Name', count) - LGA name and optional count
    lgaName = lgaNameOrCount;
    const lgaNameLower = lgaName.toLowerCase();
    
    // Urban/subdivided LGAs typically have more wards (12-15), rural have 8-10
    const isUrban = lgaNameLower.includes('north') || 
                    lgaNameLower.includes('south') || 
                    lgaNameLower.includes('east') || 
                    lgaNameLower.includes('west') ||
                    lgaNameLower.includes('municipal') ||
                    lgaNameLower.includes('mainland') ||
                    lgaNameLower.includes('island') ||
                    lgaNameLower.includes('central');
    
    wardCount = count || (isUrban ? 12 : 10);
  }
  
  // Generate all wards with meaningful names
  // Format: "LGA Name Ward 1", "LGA Name Ward 2", etc.
  // This makes it easy to identify which LGA a ward belongs to
  return Array.from({ length: wardCount }, (_, i) => {
    const wardNumber = i + 1;
    // Create meaningful ward name
    const wardName = lgaName 
      ? `${lgaName} Ward ${wardNumber}` 
      : `Ward ${wardNumber}`;
    
    return { name: wardName };
  });
};

// Helper function to create LGA with proper ward names
// This ensures all wards are properly named with their LGA
const createLGA = (name: string, wardCount?: number): LGA => {
  return {
    name,
    wards: generateWards(name, wardCount)
  };
};

export const nigeriaLocations: State[] = [
  {
    name: 'Abia',
    lgas: [
      { name: 'Aba North', wards: generateWards('Aba North', 10) },
      { name: 'Aba South', wards: generateWards('Aba South', 10) },
      { name: 'Arochukwu', wards: generateWards('Arochukwu', 10) },
      { name: 'Bende', wards: generateWards('Bende', 10) },
      { name: 'Ikwuano', wards: generateWards('Ikwuano', 10) },
      { name: 'Isiala Ngwa North', wards: generateWards('Isiala Ngwa North', 12) },
      { name: 'Isiala Ngwa South', wards: generateWards('Isiala Ngwa South', 12) },
      { name: 'Isuikwuato', wards: generateWards('Isuikwuato', 10) },
      { name: 'Obi Ngwa', wards: generateWards('Obi Ngwa', 10) },
      { name: 'Ohafia', wards: generateWards('Ohafia', 10) },
      { name: 'Osisioma Ngwa', wards: generateWards('Osisioma Ngwa', 10) },
      { name: 'Ugwunagbo', wards: generateWards('Ugwunagbo', 10) },
      { name: 'Ukwa East', wards: generateWards('Ukwa East', 12) },
      { name: 'Ukwa West', wards: generateWards('Ukwa West', 12) },
      { name: 'Umuahia North', wards: generateWards('Umuahia North', 12) },
      { name: 'Umuahia South', wards: generateWards('Umuahia South', 12) },
      { name: 'Umu Nneochi', wards: generateWards('Umu Nneochi', 10) }
    ]
  },
  {
    name: 'Adamawa',
    lgas: [
      { name: 'Demsa', wards: generateWards('Demsa', 10) },
      { name: 'Fufure', wards: generateWards('Fufure', 10) },
      { name: 'Ganye', wards: generateWards('Ganye', 10) },
      { name: 'Girei', wards: generateWards('Girei', 10) },
      { name: 'Gombi', wards: generateWards('Gombi', 10) },
      { name: 'Guyuk', wards: generateWards('Guyuk', 10) },
      { name: 'Hong', wards: generateWards('Hong', 10) },
      { name: 'Jada', wards: generateWards('Jada', 10) },
      { name: 'Lamurde', wards: generateWards('Lamurde', 10) },
      { name: 'Madagali', wards: generateWards('Madagali', 10) },
      { name: 'Maiha', wards: generateWards('Maiha', 10) },
      { name: 'Mayo-Belwa', wards: generateWards('Mayo-Belwa', 10) },
      { name: 'Michika', wards: generateWards('Michika', 10) },
      { name: 'Mubi North', wards: generateWards('Mubi North', 12) },
      { name: 'Mubi South', wards: generateWards('Mubi South', 12) },
      { name: 'Numan', wards: generateWards('Numan', 10) },
      { name: 'Shelleng', wards: generateWards('Shelleng', 10) },
      { name: 'Song', wards: generateWards('Song', 10) },
      { name: 'Toungo', wards: generateWards('Toungo', 10) },
      { name: 'Yola North', wards: generateWards('Yola North', 12) },
      { name: 'Yola South', wards: generateWards('Yola South', 12) }
    ]
  },
  {
    name: 'Akwa Ibom',
    lgas: [
      { name: 'Abak', wards: generateWards('Abak', 10) },
      { name: 'Eastern Obolo', wards: generateWards('Eastern Obolo', 12) },
      { name: 'Eket', wards: generateWards('Eket', 10) },
      { name: 'Esit Eket', wards: generateWards('Esit Eket', 10) },
      { name: 'Essien Udim', wards: generateWards('Essien Udim', 10) },
      { name: 'Etim Ekpo', wards: generateWards('Etim Ekpo', 10) },
      { name: 'Etinan', wards: generateWards('Etinan', 10) },
      { name: 'Ibeno', wards: generateWards('Ibeno', 10) },
      { name: 'Ibesikpo Asutan', wards: generateWards('Ibesikpo Asutan', 10) },
      { name: 'Ibiono-Ibom', wards: generateWards('Ibiono-Ibom', 10) },
      { name: 'Ika', wards: generateWards('Ika', 10) },
      { name: 'Ikono', wards: generateWards('Ikono', 10) },
      { name: 'Ikot Abasi', wards: generateWards('Ikot Abasi', 10) },
      { name: 'Ikot Ekpene', wards: generateWards('Ikot Ekpene', 10) },
      { name: 'Ini', wards: generateWards('Ini', 10) },
      { name: 'Itu', wards: generateWards('Itu', 10) },
      { name: 'Mbo', wards: generateWards('Mbo', 10) },
      { name: 'Mkpat-Enin', wards: generateWards('Mkpat-Enin', 10) },
      { name: 'Nsit-Atai', wards: generateWards('Nsit-Atai', 10) },
      { name: 'Nsit-Ibom', wards: generateWards('Nsit-Ibom', 10) },
      { name: 'Nsit-Ubium', wards: generateWards('Nsit-Ubium', 10) },
      { name: 'Obot Akara', wards: generateWards('Obot Akara', 10) },
      { name: 'Okobo', wards: generateWards('Okobo', 10) },
      { name: 'Onna', wards: generateWards('Onna', 10) },
      { name: 'Oron', wards: generateWards('Oron', 10) },
      { name: 'Oruk Anam', wards: generateWards('Oruk Anam', 10) },
      { name: 'Udung-Uko', wards: generateWards('Udung-Uko', 10) },
      { name: 'Ukanafun', wards: generateWards('Ukanafun', 10) },
      { name: 'Uruan', wards: generateWards('Uruan', 10) },
      { name: 'Urue-Offong/Oruko', wards: generateWards('Urue-Offong/Oruko', 10) },
      { name: 'Uyo', wards: generateWards('Uyo', 10) }
    ]
  },
  {
    name: 'Anambra',
    lgas: [
      { name: 'Aguata', wards: generateWards('Aguata', 10) },
      { name: 'Anambra East', wards: generateWards('Anambra East', 12) },
      { name: 'Anambra West', wards: generateWards('Anambra West', 12) },
      { name: 'Anaocha', wards: generateWards('Anaocha', 10) },
      { name: 'Awka North', wards: generateWards('Awka North', 12) },
      { name: 'Awka South', wards: generateWards('Awka South', 12) },
      { name: 'Ayamelum', wards: generateWards('Ayamelum', 10) },
      { name: 'Dunukofia', wards: generateWards('Dunukofia', 10) },
      { name: 'Ekwusigo', wards: generateWards('Ekwusigo', 10) },
      { name: 'Idemili North', wards: generateWards('Idemili North', 12) },
      { name: 'Idemili South', wards: generateWards('Idemili South', 12) },
      { name: 'Ihiala', wards: generateWards('Ihiala', 10) },
      { name: 'Njikoka', wards: generateWards('Njikoka', 10) },
      { name: 'Nnewi North', wards: generateWards('Nnewi North', 12) },
      { name: 'Nnewi South', wards: generateWards('Nnewi South', 12) },
      { name: 'Ogbaru', wards: generateWards('Ogbaru', 10) },
      { name: 'Onitsha North', wards: generateWards('Onitsha North', 12) },
      { name: 'Onitsha South', wards: generateWards('Onitsha South', 12) },
      { name: 'Orumba North', wards: generateWards('Orumba North', 12) },
      { name: 'Orumba South', wards: generateWards('Orumba South', 12) },
      { name: 'Oyi', wards: generateWards('Oyi', 10) }
    ]
  },
  {
    name: 'Bauchi',
    lgas: [
      { name: 'Alkaleri', wards: generateWards('Alkaleri', 10) },
      { name: 'Bauchi', wards: generateWards('Bauchi', 10) },
      { name: 'Bogoro', wards: generateWards('Bogoro', 10) },
      { name: 'Damban', wards: generateWards('Damban', 10) },
      { name: 'Darazo', wards: generateWards('Darazo', 10) },
      { name: 'Dass', wards: generateWards('Dass', 10) },
      { name: 'Gamawa', wards: generateWards('Gamawa', 10) },
      { name: 'Ganjuwa', wards: generateWards('Ganjuwa', 10) },
      { name: 'Giade', wards: generateWards('Giade', 10) },
      { name: 'Itas/Gadau', wards: generateWards('Itas/Gadau', 10) },
      { name: 'Jama\'are', wards: generateWards('Jama\'are', 10) },
      { name: 'Katagum', wards: generateWards('Katagum', 10) },
      { name: 'Kirfi', wards: generateWards('Kirfi', 10) },
      { name: 'Misau', wards: generateWards('Misau', 10) },
      { name: 'Ningi', wards: generateWards('Ningi', 10) },
      { name: 'Shira', wards: generateWards('Shira', 10) },
      { name: 'Tafawa Balewa', wards: generateWards('Tafawa Balewa', 10) },
      { name: 'Toro', wards: generateWards('Toro', 10) },
      { name: 'Warji', wards: generateWards('Warji', 10) },
      { name: 'Zaki', wards: generateWards('Zaki', 10) }
    ]
  },
  {
    name: 'Bayelsa',
    lgas: [
      { name: 'Brass', wards: generateWards('Brass', 10) },
      { name: 'Ekeremor', wards: generateWards('Ekeremor', 10) },
      { name: 'Kolokuma/Opokuma', wards: generateWards('Kolokuma/Opokuma', 10) },
      { name: 'Nembe', wards: generateWards('Nembe', 10) },
      { name: 'Ogbia', wards: generateWards('Ogbia', 10) },
      { name: 'Sagbama', wards: generateWards('Sagbama', 10) },
      { name: 'Southern Ijaw', wards: generateWards('Southern Ijaw', 12) },
      { name: 'Yenagoa', wards: generateWards('Yenagoa', 10) }
    ]
  },
  {
    name: 'Benue',
    lgas: [
      { name: 'Ado', wards: generateWards('Ado', 10) },
      { name: 'Agatu', wards: generateWards('Agatu', 10) },
      { name: 'Apa', wards: generateWards('Apa', 10) },
      { name: 'Buruku', wards: generateWards('Buruku', 10) },
      { name: 'Gboko', wards: generateWards('Gboko', 10) },
      { name: 'Guma', wards: generateWards('Guma', 10) },
      { name: 'Gwer East', wards: generateWards('Gwer East', 12) },
      { name: 'Gwer West', wards: generateWards('Gwer West', 12) },
      { name: 'Katsina-Ala', wards: generateWards('Katsina-Ala', 10) },
      { name: 'Konshisha', wards: generateWards('Konshisha', 10) },
      { name: 'Kwande', wards: generateWards('Kwande', 10) },
      { name: 'Logo', wards: generateWards('Logo', 10) },
      { name: 'Makurdi', wards: generateWards('Makurdi', 10) },
      { name: 'Obi', wards: generateWards('Obi', 10) },
      { name: 'Ogbadibo', wards: generateWards('Ogbadibo', 10) },
      { name: 'Ohimini', wards: generateWards('Ohimini', 10) },
      { name: 'Oju', wards: generateWards('Oju', 10) },
      { name: 'Okpokwu', wards: generateWards('Okpokwu', 10) },
      { name: 'Oturkpo', wards: generateWards('Oturkpo', 10) },
      { name: 'Tarka', wards: generateWards('Tarka', 10) },
      { name: 'Ukum', wards: generateWards('Ukum', 10) },
      { name: 'Ushongo', wards: generateWards('Ushongo', 10) },
      { name: 'Vandeikya', wards: generateWards('Vandeikya', 10) }
    ]
  },
  {
    name: 'Borno',
    lgas: [
      { name: 'Abadam', wards: generateWards('Abadam', 10) },
      { name: 'Askira/Uba', wards: generateWards('Askira/Uba', 10) },
      { name: 'Bama', wards: generateWards('Bama', 10) },
      { name: 'Bayo', wards: generateWards('Bayo', 10) },
      { name: 'Biu', wards: generateWards('Biu', 10) },
      { name: 'Chibok', wards: generateWards('Chibok', 10) },
      { name: 'Damboa', wards: generateWards('Damboa', 10) },
      { name: 'Dikwa', wards: generateWards('Dikwa', 10) },
      { name: 'Gubio', wards: generateWards('Gubio', 10) },
      { name: 'Guzamala', wards: generateWards('Guzamala', 10) },
      { name: 'Gwoza', wards: generateWards('Gwoza', 10) },
      { name: 'Hawul', wards: generateWards('Hawul', 10) },
      { name: 'Jere', wards: generateWards('Jere', 10) },
      { name: 'Kaga', wards: generateWards('Kaga', 10) },
      { name: 'Kala/Balge', wards: generateWards('Kala/Balge', 10) },
      { name: 'Konduga', wards: generateWards('Konduga', 10) },
      { name: 'Kukawa', wards: generateWards('Kukawa', 10) },
      { name: 'Kwaya Kusar', wards: generateWards('Kwaya Kusar', 10) },
      { name: 'Mafa', wards: generateWards('Mafa', 10) },
      { name: 'Magumeri', wards: generateWards('Magumeri', 10) },
      { name: 'Maiduguri', wards: generateWards('Maiduguri', 10) },
      { name: 'Marte', wards: generateWards('Marte', 10) },
      { name: 'Mobbar', wards: generateWards('Mobbar', 10) },
      { name: 'Monguno', wards: generateWards('Monguno', 10) },
      { name: 'Ngala', wards: generateWards('Ngala', 10) },
      { name: 'Nganzai', wards: generateWards('Nganzai', 10) },
      { name: 'Shani', wards: generateWards('Shani', 10) }
    ]
  },
  {
    name: 'Cross River',
    lgas: [
      { name: 'Abi', wards: generateWards('Abi', 10) },
      { name: 'Akamkpa', wards: generateWards('Akamkpa', 10) },
      { name: 'Akpabuyo', wards: generateWards('Akpabuyo', 10) },
      { name: 'Bakassi', wards: generateWards('Bakassi', 10) },
      { name: 'Bekwarra', wards: generateWards('Bekwarra', 10) },
      { name: 'Biase', wards: generateWards('Biase', 10) },
      { name: 'Boki', wards: generateWards('Boki', 10) },
      { name: 'Calabar Municipal', wards: generateWards('Calabar Municipal', 12) },
      { name: 'Calabar South', wards: generateWards('Calabar South', 12) },
      { name: 'Etung', wards: generateWards('Etung', 10) },
      { name: 'Ikom', wards: generateWards('Ikom', 10) },
      { name: 'Obanliku', wards: generateWards('Obanliku', 10) },
      { name: 'Obubra', wards: generateWards('Obubra', 10) },
      { name: 'Obudu', wards: generateWards('Obudu', 10) },
      { name: 'Odukpani', wards: generateWards('Odukpani', 10) },
      { name: 'Ogoja', wards: generateWards('Ogoja', 10) },
      { name: 'Yakuur', wards: generateWards('Yakuur', 10) },
      { name: 'Yala', wards: generateWards('Yala', 10) }
    ]
  },
  {
    name: 'Delta',
    lgas: [
      { name: 'Aniocha North', wards: generateWards('Aniocha North', 12) },
      { name: 'Aniocha South', wards: generateWards('Aniocha South', 12) },
      { name: 'Bomadi', wards: generateWards('Bomadi', 10) },
      { name: 'Burutu', wards: generateWards('Burutu', 10) },
      { name: 'Ethiope East', wards: generateWards('Ethiope East', 12) },
      { name: 'Ethiope West', wards: generateWards('Ethiope West', 12) },
      { name: 'Ika North East', wards: generateWards('Ika North East', 12) },
      { name: 'Ika South', wards: generateWards('Ika South', 12) },
      { name: 'Isoko North', wards: generateWards('Isoko North', 12) },
      { name: 'Isoko South', wards: generateWards('Isoko South', 12) },
      { name: 'Ndokwa East', wards: generateWards('Ndokwa East', 12) },
      { name: 'Ndokwa West', wards: generateWards('Ndokwa West', 12) },
      { name: 'Okpe', wards: generateWards('Okpe', 10) },
      { name: 'Oshimili North', wards: generateWards('Oshimili North', 12) },
      { name: 'Oshimili South', wards: generateWards('Oshimili South', 12) },
      { name: 'Patani', wards: generateWards('Patani', 10) },
      { name: 'Sapele', wards: generateWards('Sapele', 10) },
      { name: 'Udu', wards: generateWards('Udu', 10) },
      { name: 'Ughelli North', wards: generateWards('Ughelli North', 12) },
      { name: 'Ughelli South', wards: generateWards('Ughelli South', 12) },
      { name: 'Ukwuani', wards: generateWards('Ukwuani', 10) },
      { name: 'Uvwie', wards: generateWards('Uvwie', 10) },
      { name: 'Warri North', wards: generateWards('Warri North', 12) },
      { name: 'Warri South', wards: generateWards('Warri South', 12) },
      { name: 'Warri South West', wards: generateWards('Warri South West', 12) }
    ]
  },
  {
    name: 'Ebonyi',
    lgas: [
      { name: 'Abakaliki', wards: generateWards('Abakaliki', 10) },
      { name: 'Afikpo North', wards: generateWards('Afikpo North', 12) },
      { name: 'Afikpo South', wards: generateWards('Afikpo South', 12) },
      { name: 'Ebonyi', wards: generateWards('Ebonyi', 10) },
      { name: 'Ezza North', wards: generateWards('Ezza North', 12) },
      { name: 'Ezza South', wards: generateWards('Ezza South', 12) },
      { name: 'Ikwo', wards: generateWards('Ikwo', 10) },
      { name: 'Ishielu', wards: generateWards('Ishielu', 10) },
      { name: 'Ivo', wards: generateWards('Ivo', 10) },
      { name: 'Izzi', wards: generateWards('Izzi', 10) },
      { name: 'Ohaozara', wards: generateWards('Ohaozara', 10) },
      { name: 'Ohaukwu', wards: generateWards('Ohaukwu', 10) },
      { name: 'Onicha', wards: generateWards('Onicha', 10) }
    ]
  },
  {
    name: 'Edo',
    lgas: [
      { name: 'Akoko-Edo', wards: generateWards('Akoko-Edo', 10) },
      { name: 'Egor', wards: generateWards('Egor', 10) },
      { name: 'Esan Central', wards: generateWards('Esan Central', 12) },
      { name: 'Esan North-East', wards: generateWards('Esan North-East', 12) },
      { name: 'Esan South-East', wards: generateWards('Esan South-East', 12) },
      { name: 'Esan West', wards: generateWards('Esan West', 12) },
      { name: 'Etsako Central', wards: generateWards('Etsako Central', 12) },
      { name: 'Etsako East', wards: generateWards('Etsako East', 12) },
      { name: 'Etsako West', wards: generateWards('Etsako West', 12) },
      { name: 'Igueben', wards: generateWards('Igueben', 10) },
      { name: 'Ikpoba-Okha', wards: generateWards('Ikpoba-Okha', 10) },
      { name: 'Oredo', wards: generateWards('Oredo', 10) },
      { name: 'Orhionmwon', wards: generateWards('Orhionmwon', 10) },
      { name: 'Ovia North-East', wards: generateWards('Ovia North-East', 12) },
      { name: 'Ovia South-West', wards: generateWards('Ovia South-West', 12) },
      { name: 'Owan East', wards: generateWards('Owan East', 12) },
      { name: 'Owan West', wards: generateWards('Owan West', 12) },
      { name: 'Uhunmwonde', wards: generateWards('Uhunmwonde', 10) }
    ]
  },
  {
    name: 'Ekiti',
    lgas: [
      { name: 'Ado Ekiti', wards: generateWards('Ado Ekiti', 10) },
      { name: 'Efon', wards: generateWards('Efon', 10) },
      { name: 'Ekiti East', wards: generateWards('Ekiti East', 12) },
      { name: 'Ekiti South-West', wards: generateWards('Ekiti South-West', 12) },
      { name: 'Ekiti West', wards: generateWards('Ekiti West', 12) },
      { name: 'Emure', wards: generateWards('Emure', 10) },
      { name: 'Gbonyin', wards: generateWards('Gbonyin', 10) },
      { name: 'Ido-Osi', wards: generateWards('Ido-Osi', 10) },
      { name: 'Ijero', wards: generateWards('Ijero', 10) },
      { name: 'Ikere', wards: generateWards('Ikere', 10) },
      { name: 'Ikole', wards: generateWards('Ikole', 10) },
      { name: 'Ilejemeje', wards: generateWards('Ilejemeje', 10) },
      { name: 'Irepodun/Ifelodun', wards: generateWards('Irepodun/Ifelodun', 10) },
      { name: 'Ise/Orun', wards: generateWards('Ise/Orun', 10) },
      { name: 'Moba', wards: generateWards('Moba', 10) },
      { name: 'Oye', wards: generateWards('Oye', 10) }
    ]
  },
  {
    name: 'Enugu',
    lgas: [
      { name: 'Aninri', wards: generateWards('Aninri', 10) },
      { name: 'Awgu', wards: generateWards('Awgu', 10) },
      { name: 'Enugu East', wards: generateWards('Enugu East', 12) },
      { name: 'Enugu North', wards: generateWards('Enugu North', 12) },
      { name: 'Enugu South', wards: generateWards('Enugu South', 12) },
      { name: 'Ezeagu', wards: generateWards('Ezeagu', 10) },
      { name: 'Igbo Etiti', wards: generateWards('Igbo Etiti', 10) },
      { name: 'Igbo Eze North', wards: generateWards('Igbo Eze North', 12) },
      { name: 'Igbo Eze South', wards: generateWards('Igbo Eze South', 12) },
      { name: 'Isi Uzo', wards: generateWards('Isi Uzo', 10) },
      { name: 'Nkanu East', wards: generateWards('Nkanu East', 12) },
      { name: 'Nkanu West', wards: generateWards('Nkanu West', 12) },
      { name: 'Nsukka', wards: generateWards('Nsukka', 10) },
      { name: 'Oji River', wards: generateWards('Oji River', 10) },
      { name: 'Udenu', wards: generateWards('Udenu', 10) },
      { name: 'Udi', wards: generateWards('Udi', 10) },
      { name: 'Uzo Uwani', wards: generateWards('Uzo Uwani', 10) }
    ]
  },
  {
    name: 'FCT',
    lgas: [
      { name: 'Abaji', wards: generateWards('Abaji', 10) },
      { name: 'Bwari', wards: generateWards('Bwari', 10) },
      { name: 'Gwagwalada', wards: generateWards('Gwagwalada', 10) },
      { name: 'Kuje', wards: generateWards('Kuje', 10) },
      { name: 'Municipal Area Council', wards: generateWards('Municipal Area Council', 12) },
      { name: 'Kwali', wards: generateWards('Kwali', 10) }
    ]
  },
  {
    name: 'Gombe',
    lgas: [
      { name: 'Akko', wards: generateWards('Akko', 10) },
      { name: 'Balanga', wards: generateWards('Balanga', 10) },
      { name: 'Billiri', wards: generateWards('Billiri', 10) },
      { name: 'Dukku', wards: generateWards('Dukku', 10) },
      { name: 'Funakaye', wards: generateWards('Funakaye', 10) },
      { name: 'Gombe', wards: generateWards('Gombe', 10) },
      { name: 'Kaltungo', wards: generateWards('Kaltungo', 10) },
      { name: 'Kwami', wards: generateWards('Kwami', 10) },
      { name: 'Nafada', wards: generateWards('Nafada', 10) },
      { name: 'Shongom', wards: generateWards('Shongom', 10) },
      { name: 'Yamaltu/Deba', wards: generateWards('Yamaltu/Deba', 10) }
    ]
  },
  {
    name: 'Imo',
    lgas: [
      { name: 'Aboh Mbaise', wards: generateWards('Aboh Mbaise', 10) },
      { name: 'Ahiazu Mbaise', wards: generateWards('Ahiazu Mbaise', 10) },
      { name: 'Ehime Mbano', wards: generateWards('Ehime Mbano', 10) },
      { name: 'Ezinihitte', wards: generateWards('Ezinihitte', 10) },
      { name: 'Ideato North', wards: generateWards('Ideato North', 12) },
      { name: 'Ideato South', wards: generateWards('Ideato South', 12) },
      { name: 'Ihitte/Uboma', wards: generateWards('Ihitte/Uboma', 10) },
      { name: 'Ikeduru', wards: generateWards('Ikeduru', 10) },
      { name: 'Isiala Mbano', wards: generateWards('Isiala Mbano', 10) },
      { name: 'Isu', wards: generateWards('Isu', 10) },
      { name: 'Mbaitoli', wards: generateWards('Mbaitoli', 10) },
      { name: 'Ngor Okpala', wards: generateWards('Ngor Okpala', 10) },
      { name: 'Njaba', wards: generateWards('Njaba', 10) },
      { name: 'Nkwerre', wards: generateWards('Nkwerre', 10) },
      { name: 'Nwangele', wards: generateWards('Nwangele', 10) },
      { name: 'Obowo', wards: generateWards('Obowo', 10) },
      { name: 'Oguta', wards: generateWards('Oguta', 10) },
      { name: 'Ohaji/Egbema', wards: generateWards('Ohaji/Egbema', 10) },
      { name: 'Okigwe', wards: generateWards('Okigwe', 10) },
      { name: 'Orlu', wards: generateWards('Orlu', 10) },
      { name: 'Orsu', wards: generateWards('Orsu', 10) },
      { name: 'Oru East', wards: generateWards('Oru East', 12) },
      { name: 'Oru West', wards: generateWards('Oru West', 12) },
      { name: 'Owerri Municipal', wards: generateWards('Owerri Municipal', 12) },
      { name: 'Owerri North', wards: generateWards('Owerri North', 12) },
      { name: 'Owerri West', wards: generateWards('Owerri West', 12) },
      { name: 'Unuimo', wards: generateWards('Unuimo', 10) }
    ]
  },
  {
    name: 'Jigawa',
    lgas: [
      { name: 'Auyo', wards: generateWards('Auyo', 10) },
      { name: 'Babura', wards: generateWards('Babura', 10) },
      { name: 'Biriniwa', wards: generateWards('Biriniwa', 10) },
      { name: 'Birnin Kudu', wards: generateWards('Birnin Kudu', 10) },
      { name: 'Buji', wards: generateWards('Buji', 10) },
      { name: 'Dutse', wards: generateWards('Dutse', 10) },
      { name: 'Gagarawa', wards: generateWards('Gagarawa', 10) },
      { name: 'Garki', wards: generateWards('Garki', 10) },
      { name: 'Gumel', wards: generateWards('Gumel', 10) },
      { name: 'Guri', wards: generateWards('Guri', 10) },
      { name: 'Gwaram', wards: generateWards('Gwaram', 10) },
      { name: 'Gwiwa', wards: generateWards('Gwiwa', 10) },
      { name: 'Hadejia', wards: generateWards('Hadejia', 10) },
      { name: 'Jahun', wards: generateWards('Jahun', 10) },
      { name: 'Kafin Hausa', wards: generateWards('Kafin Hausa', 10) },
      { name: 'Kazaure', wards: generateWards('Kazaure', 10) },
      { name: 'Kiri Kasama', wards: generateWards('Kiri Kasama', 10) },
      { name: 'Kiyawa', wards: generateWards('Kiyawa', 10) },
      { name: 'Kaugama', wards: generateWards('Kaugama', 10) },
      { name: 'Maigatari', wards: generateWards('Maigatari', 10) },
      { name: 'Malam Madori', wards: generateWards('Malam Madori', 10) },
      { name: 'Miga', wards: generateWards('Miga', 10) },
      { name: 'Ringim', wards: generateWards('Ringim', 10) },
      { name: 'Roni', wards: generateWards('Roni', 10) },
      { name: 'Sule Tankarkar', wards: generateWards('Sule Tankarkar', 10) },
      { name: 'Taura', wards: generateWards('Taura', 10) },
      { name: 'Yankwashi', wards: generateWards('Yankwashi', 10) }
    ]
  },
  {
    name: 'Kaduna',
    lgas: [
      { name: 'Birnin Gwari', wards: generateWards('Birnin Gwari', 10) },
      { name: 'Chikun', wards: generateWards('Chikun', 10) },
      { name: 'Giwa', wards: generateWards('Giwa', 10) },
      { name: 'Igabi', wards: generateWards('Igabi', 10) },
      { name: 'Ikara', wards: generateWards('Ikara', 10) },
      { name: 'Jaba', wards: generateWards('Jaba', 10) },
      { name: 'Jema\'a', wards: generateWards('Jema\'a', 10) },
      { name: 'Kachia', wards: generateWards('Kachia', 10) },
      { name: 'Kaduna North', wards: generateWards('Kaduna North', 12) },
      { name: 'Kaduna South', wards: generateWards('Kaduna South', 12) },
      { name: 'Kagarko', wards: generateWards('Kagarko', 10) },
      { name: 'Kajuru', wards: generateWards('Kajuru', 10) },
      { name: 'Kaura', wards: generateWards('Kaura', 10) },
      { name: 'Kauru', wards: generateWards('Kauru', 10) },
      { name: 'Kubau', wards: generateWards('Kubau', 10) },
      { name: 'Kudan', wards: generateWards('Kudan', 10) },
      { name: 'Lere', wards: generateWards('Lere', 10) },
      { name: 'Makarfi', wards: generateWards('Makarfi', 10) },
      { name: 'Sabon Gari', wards: generateWards('Sabon Gari', 10) },
      { name: 'Sanga', wards: generateWards('Sanga', 10) },
      { name: 'Soba', wards: generateWards('Soba', 10) },
      { name: 'Zangon Kataf', wards: generateWards('Zangon Kataf', 10) },
      { name: 'Zaria', wards: generateWards('Zaria', 10) }
    ]
  },
  {
    name: 'Kano',
    lgas: [
      { name: 'Ajingi', wards: generateWards('Ajingi', 10) },
      { name: 'Albasu', wards: generateWards('Albasu', 10) },
      { name: 'Bagwai', wards: generateWards('Bagwai', 10) },
      { name: 'Bebeji', wards: generateWards('Bebeji', 10) },
      { name: 'Bichi', wards: generateWards('Bichi', 10) },
      { name: 'Bunkure', wards: generateWards('Bunkure', 10) },
      { name: 'Dala', wards: generateWards('Dala', 10) },
      { name: 'Dambatta', wards: generateWards('Dambatta', 10) },
      { name: 'Dawakin Kudu', wards: generateWards('Dawakin Kudu', 10) },
      { name: 'Dawakin Tofa', wards: generateWards('Dawakin Tofa', 10) },
      { name: 'Doguwa', wards: generateWards('Doguwa', 10) },
      { name: 'Fagge', wards: generateWards('Fagge', 10) },
      { name: 'Gabasawa', wards: generateWards('Gabasawa', 10) },
      { name: 'Garko', wards: generateWards('Garko', 10) },
      { name: 'Garun Mallam', wards: generateWards('Garun Mallam', 10) },
      { name: 'Gaya', wards: generateWards('Gaya', 10) },
      { name: 'Gezawa', wards: generateWards('Gezawa', 10) },
      { name: 'Gwale', wards: generateWards('Gwale', 10) },
      { name: 'Gwarzo', wards: generateWards('Gwarzo', 10) },
      { name: 'Kabo', wards: generateWards('Kabo', 10) },
      { name: 'Kano Municipal', wards: generateWards('Kano Municipal', 12) },
      { name: 'Karaye', wards: generateWards('Karaye', 10) },
      { name: 'Kibiya', wards: generateWards('Kibiya', 10) },
      { name: 'Kiru', wards: generateWards('Kiru', 10) },
      { name: 'Kumbotso', wards: generateWards('Kumbotso', 10) },
      { name: 'Kunchi', wards: generateWards('Kunchi', 10) },
      { name: 'Kura', wards: generateWards('Kura', 10) },
      { name: 'Madobi', wards: generateWards('Madobi', 10) },
      { name: 'Makoda', wards: generateWards('Makoda', 10) },
      { name: 'Minjibir', wards: generateWards('Minjibir', 10) },
      { name: 'Nasarawa', wards: generateWards('Nasarawa', 10) },
      { name: 'Rano', wards: generateWards('Rano', 10) },
      { name: 'Rimin Gado', wards: generateWards('Rimin Gado', 10) },
      { name: 'Rogo', wards: generateWards('Rogo', 10) },
      { name: 'Shanono', wards: generateWards('Shanono', 10) },
      { name: 'Sumaila', wards: generateWards('Sumaila', 10) },
      { name: 'Takai', wards: generateWards('Takai', 10) },
      { name: 'Tarauni', wards: generateWards('Tarauni', 10) },
      { name: 'Tofa', wards: generateWards('Tofa', 10) },
      { name: 'Tsanyawa', wards: generateWards('Tsanyawa', 10) },
      { name: 'Tudun Wada', wards: generateWards('Tudun Wada', 10) },
      { name: 'Ungogo', wards: generateWards('Ungogo', 10) },
      { name: 'Warawa', wards: generateWards('Warawa', 10) },
      { name: 'Wudil', wards: generateWards('Wudil', 10) }
    ]
  },
  {
    name: 'Katsina',
    lgas: [
      { name: 'Bakori', wards: generateWards('Bakori', 10) },
      { name: 'Batagarawa', wards: generateWards('Batagarawa', 10) },
      { name: 'Batsari', wards: generateWards('Batsari', 10) },
      { name: 'Baure', wards: generateWards('Baure', 10) },
      { name: 'Bindawa', wards: generateWards('Bindawa', 10) },
      { name: 'Charanchi', wards: generateWards('Charanchi', 10) },
      { name: 'Dandume', wards: generateWards('Dandume', 10) },
      { name: 'Danja', wards: generateWards('Danja', 10) },
      { name: 'Dan Musa', wards: generateWards('Dan Musa', 10) },
      { name: 'Daura', wards: generateWards('Daura', 10) },
      { name: 'Dutsi', wards: generateWards('Dutsi', 10) },
      { name: 'Dutsin Ma', wards: generateWards('Dutsin Ma', 10) },
      { name: 'Faskari', wards: generateWards('Faskari', 10) },
      { name: 'Funtua', wards: generateWards('Funtua', 10) },
      { name: 'Ingawa', wards: generateWards('Ingawa', 10) },
      { name: 'Jibia', wards: generateWards('Jibia', 10) },
      { name: 'Kafur', wards: generateWards('Kafur', 10) },
      { name: 'Kaita', wards: generateWards('Kaita', 10) },
      { name: 'Kankara', wards: generateWards('Kankara', 10) },
      { name: 'Kankia', wards: generateWards('Kankia', 10) },
      { name: 'Katsina', wards: generateWards('Katsina', 10) },
      { name: 'Kurfi', wards: generateWards('Kurfi', 10) },
      { name: 'Kusada', wards: generateWards('Kusada', 10) },
      { name: 'Mai\'Adua', wards: generateWards('Mai\'Adua', 10) },
      { name: 'Malumfashi', wards: generateWards('Malumfashi', 10) },
      { name: 'Mani', wards: generateWards('Mani', 10) },
      { name: 'Mashi', wards: generateWards('Mashi', 10) },
      { name: 'Matazu', wards: generateWards('Matazu', 10) },
      { name: 'Musawa', wards: generateWards('Musawa', 10) },
      { name: 'Rimi', wards: generateWards('Rimi', 10) },
      { name: 'Sabuwa', wards: generateWards('Sabuwa', 10) },
      { name: 'Safana', wards: generateWards('Safana', 10) },
      { name: 'Sandamu', wards: generateWards('Sandamu', 10) },
      { name: 'Zango', wards: generateWards('Zango', 10) }
    ]
  },
  {
    name: 'Kebbi',
    lgas: [
      { name: 'Aleiro', wards: generateWards('Aleiro', 10) },
      { name: 'Arewa Dandi', wards: generateWards('Arewa Dandi', 10) },
      { name: 'Argungu', wards: generateWards('Argungu', 10) },
      { name: 'Augie', wards: generateWards('Augie', 10) },
      { name: 'Bagudo', wards: generateWards('Bagudo', 10) },
      { name: 'Bunza', wards: generateWards('Bunza', 10) },
      { name: 'Dandi', wards: generateWards('Dandi', 10) },
      { name: 'Fakai', wards: generateWards('Fakai', 10) },
      { name: 'Gwandu', wards: generateWards('Gwandu', 10) },
      { name: 'Jega', wards: generateWards('Jega', 10) },
      { name: 'Kalgo', wards: generateWards('Kalgo', 10) },
      { name: 'Koko/Besse', wards: generateWards('Koko/Besse', 10) },
      { name: 'Maiyama', wards: generateWards('Maiyama', 10) },
      { name: 'Ngaski', wards: generateWards('Ngaski', 10) },
      { name: 'Sakaba', wards: generateWards('Sakaba', 10) },
      { name: 'Shanga', wards: generateWards('Shanga', 10) },
      { name: 'Suru', wards: generateWards('Suru', 10) },
      { name: 'Wasagu/Danko', wards: generateWards('Wasagu/Danko', 10) },
      { name: 'Yauri', wards: generateWards('Yauri', 10) },
      { name: 'Zuru', wards: generateWards('Zuru', 10) }
    ]
  },
  {
    name: 'Kogi',
    lgas: [
      { name: 'Adavi', wards: generateWards('Adavi', 10) },
      { name: 'Ajaokuta', wards: generateWards('Ajaokuta', 10) },
      { name: 'Ankpa', wards: generateWards('Ankpa', 10) },
      { name: 'Bassa', wards: generateWards('Bassa', 10) },
      { name: 'Dekina', wards: generateWards('Dekina', 10) },
      { name: 'Ibaji', wards: generateWards('Ibaji', 10) },
      { name: 'Idah', wards: generateWards('Idah', 10) },
      { name: 'Igalamela Odolu', wards: generateWards('Igalamela Odolu', 10) },
      { name: 'Ijumu', wards: generateWards('Ijumu', 10) },
      { name: 'Kabba/Bunu', wards: generateWards('Kabba/Bunu', 10) },
      { name: 'Kogi', wards: generateWards('Kogi', 10) },
      { name: 'Lokoja', wards: generateWards('Lokoja', 10) },
      { name: 'Mopa Muro', wards: generateWards('Mopa Muro', 10) },
      { name: 'Ofu', wards: generateWards('Ofu', 10) },
      { name: 'Ogori/Magongo', wards: generateWards('Ogori/Magongo', 10) },
      { name: 'Okehi', wards: generateWards('Okehi', 10) },
      { name: 'Okene', wards: generateWards('Okene', 10) },
      { name: 'Olamaboro', wards: generateWards('Olamaboro', 10) },
      { name: 'Omala', wards: generateWards('Omala', 10) },
      { name: 'Yagba East', wards: generateWards('Yagba East', 12) },
      { name: 'Yagba West', wards: generateWards('Yagba West', 12) }
    ]
  },
  {
    name: 'Kwara',
    lgas: [
      { name: 'Asa', wards: generateWards('Asa', 10) },
      { name: 'Baruten', wards: generateWards('Baruten', 10) },
      { name: 'Edu', wards: generateWards('Edu', 10) },
      { name: 'Ekiti', wards: generateWards('Ekiti', 10) },
      { name: 'Ifelodun', wards: generateWards('Ifelodun', 10) },
      { name: 'Ilorin East', wards: generateWards('Ilorin East', 12) },
      { name: 'Ilorin South', wards: generateWards('Ilorin South', 12) },
      { name: 'Ilorin West', wards: generateWards('Ilorin West', 12) },
      { name: 'Irepodun', wards: generateWards('Irepodun', 10) },
      { name: 'Isin', wards: generateWards('Isin', 10) },
      { name: 'Kaiama', wards: generateWards('Kaiama', 10) },
      { name: 'Moro', wards: generateWards('Moro', 10) },
      { name: 'Offa', wards: generateWards('Offa', 10) },
      { name: 'Oke Ero', wards: generateWards('Oke Ero', 10) },
      { name: 'Oyun', wards: generateWards('Oyun', 10) },
      { name: 'Pategi', wards: generateWards('Pategi', 10) }
    ]
  },
  {
    name: 'Lagos',
    lgas: [
      { name: 'Agege', wards: generateWards('Agege', 10) },
      { name: 'Ajeromi-Ifelodun', wards: generateWards('Ajeromi-Ifelodun', 10) },
      { name: 'Alimosho', wards: generateWards('Alimosho', 10) },
      { name: 'Amuwo-Odofin', wards: generateWards('Amuwo-Odofin', 10) },
      { name: 'Apapa', wards: generateWards('Apapa', 10) },
      { name: 'Badagry', wards: generateWards('Badagry', 10) },
      { name: 'Epe', wards: generateWards('Epe', 10) },
      { name: 'Eti Osa', wards: generateWards('Eti Osa', 10) },
      { name: 'Ibeju-Lekki', wards: generateWards('Ibeju-Lekki', 10) },
      { name: 'Ifako-Ijaiye', wards: generateWards('Ifako-Ijaiye', 10) },
      { name: 'Ikeja', wards: generateWards('Ikeja', 10) },
      { name: 'Ikorodu', wards: generateWards('Ikorodu', 10) },
      { name: 'Kosofe', wards: generateWards('Kosofe', 10) },
      { name: 'Lagos Island', wards: generateWards('Lagos Island', 12) },
      { name: 'Lagos Mainland', wards: generateWards('Lagos Mainland', 12) },
      { name: 'Mushin', wards: generateWards('Mushin', 10) },
      { name: 'Ojo', wards: generateWards('Ojo', 10) },
      { name: 'Oshodi-Isolo', wards: generateWards('Oshodi-Isolo', 10) },
      { name: 'Shomolu', wards: generateWards('Shomolu', 10) },
      { name: 'Surulere', wards: generateWards('Surulere', 10) }
    ]
  },
  {
    name: 'Nasarawa',
    lgas: [
      { name: 'Akwanga', wards: generateWards('Akwanga', 10) },
      { name: 'Awe', wards: generateWards('Awe', 10) },
      { name: 'Doma', wards: generateWards('Doma', 10) },
      { name: 'Karu', wards: generateWards('Karu', 10) },
      { name: 'Keana', wards: generateWards('Keana', 10) },
      { name: 'Keffi', wards: generateWards('Keffi', 10) },
      { name: 'Kokona', wards: generateWards('Kokona', 10) },
      { name: 'Lafia', wards: generateWards('Lafia', 10) },
      { name: 'Nasarawa', wards: generateWards('Nasarawa', 10) },
      { name: 'Nasarawa Egon', wards: generateWards('Nasarawa Egon', 10) },
      { name: 'Obi', wards: generateWards('Obi', 10) },
      { name: 'Toto', wards: generateWards('Toto', 10) },
      { name: 'Wamba', wards: generateWards('Wamba', 10) }
    ]
  },
  {
    name: 'Niger',
    lgas: [
      { name: 'Agaie', wards: generateWards('Agaie', 10) },
      { name: 'Agwara', wards: generateWards('Agwara', 10) },
      { name: 'Bida', wards: generateWards('Bida', 10) },
      { name: 'Borgu', wards: generateWards('Borgu', 10) },
      { name: 'Bosso', wards: generateWards('Bosso', 10) },
      { name: 'Chanchaga', wards: generateWards('Chanchaga', 10) },
      { name: 'Edati', wards: generateWards('Edati', 10) },
      { name: 'Gbako', wards: generateWards('Gbako', 10) },
      { name: 'Gurara', wards: generateWards('Gurara', 10) },
      { name: 'Katcha', wards: generateWards('Katcha', 10) },
      { name: 'Kontagora', wards: generateWards('Kontagora', 10) },
      { name: 'Lapai', wards: generateWards('Lapai', 10) },
      { name: 'Lavun', wards: generateWards('Lavun', 10) },
      { name: 'Magama', wards: generateWards('Magama', 10) },
      { name: 'Mariga', wards: generateWards('Mariga', 10) },
      { name: 'Mashegu', wards: generateWards('Mashegu', 10) },
      { name: 'Mokwa', wards: generateWards('Mokwa', 10) },
      { name: 'Moya', wards: generateWards('Moya', 10) },
      { name: 'Paikoro', wards: generateWards('Paikoro', 10) },
      { name: 'Rafi', wards: generateWards('Rafi', 10) },
      { name: 'Rijau', wards: generateWards('Rijau', 10) },
      { name: 'Shiroro', wards: generateWards('Shiroro', 10) },
      { name: 'Suleja', wards: generateWards('Suleja', 10) },
      { name: 'Tafa', wards: generateWards('Tafa', 10) },
      { name: 'Wushishi', wards: generateWards('Wushishi', 10) }
    ]
  },
  {
    name: 'Ogun',
    lgas: [
      { name: 'Abeokuta North', wards: generateWards('Abeokuta North', 12) },
      { name: 'Abeokuta South', wards: generateWards('Abeokuta South', 12) },
      { name: 'Ado-Odo/Ota', wards: generateWards('Ado-Odo/Ota', 10) },
      { name: 'Egbado North', wards: generateWards('Egbado North', 12) },
      { name: 'Egbado South', wards: generateWards('Egbado South', 12) },
      { name: 'Ewekoro', wards: generateWards('Ewekoro', 10) },
      { name: 'Ifo', wards: generateWards('Ifo', 10) },
      { name: 'Ijebu East', wards: generateWards('Ijebu East', 12) },
      { name: 'Ijebu North', wards: generateWards('Ijebu North', 12) },
      { name: 'Ijebu North East', wards: generateWards('Ijebu North East', 12) },
      { name: 'Ijebu Ode', wards: generateWards('Ijebu Ode', 10) },
      { name: 'Ikenne', wards: generateWards('Ikenne', 10) },
      { name: 'Imeko Afon', wards: generateWards('Imeko Afon', 10) },
      { name: 'Ipokia', wards: generateWards('Ipokia', 10) },
      { name: 'Obafemi Owode', wards: generateWards('Obafemi Owode', 10) },
      { name: 'Odeda', wards: generateWards('Odeda', 10) },
      { name: 'Odogbolu', wards: generateWards('Odogbolu', 10) },
      { name: 'Ogun Waterside', wards: generateWards('Ogun Waterside', 10) },
      { name: 'Remo North', wards: generateWards('Remo North', 12) },
      { name: 'Shagamu', wards: generateWards('Shagamu', 10) }
    ]
  },
  {
    name: 'Ondo',
    lgas: [
      { name: 'Akoko North-East', wards: generateWards('Akoko North-East', 12) },
      { name: 'Akoko North-West', wards: generateWards('Akoko North-West', 12) },
      { name: 'Akoko South-West', wards: generateWards('Akoko South-West', 12) },
      { name: 'Akoko South-East', wards: generateWards('Akoko South-East', 12) },
      { name: 'Akure North', wards: generateWards('Akure North', 12) },
      { name: 'Akure South', wards: generateWards('Akure South', 12) },
      { name: 'Ese Odo', wards: generateWards('Ese Odo', 10) },
      { name: 'Idanre', wards: generateWards('Idanre', 10) },
      { name: 'Ifedore', wards: generateWards('Ifedore', 10) },
      { name: 'Ilaje', wards: generateWards('Ilaje', 10) },
      { name: 'Ile Oluji/Okeigbo', wards: generateWards('Ile Oluji/Okeigbo', 10) },
      { name: 'Irele', wards: generateWards('Irele', 10) },
      { name: 'Odigbo', wards: generateWards('Odigbo', 10) },
      { name: 'Okitipupa', wards: generateWards('Okitipupa', 10) },
      { name: 'Ondo East', wards: generateWards('Ondo East', 12) },
      { name: 'Ondo West', wards: generateWards('Ondo West', 12) },
      { name: 'Ose', wards: generateWards('Ose', 10) },
      { name: 'Owo', wards: generateWards('Owo', 10) }
    ]
  },
  {
    name: 'Osun',
    lgas: [
      { name: 'Atakunmosa East', wards: generateWards('Atakunmosa East', 12) },
      { name: 'Atakunmosa West', wards: generateWards('Atakunmosa West', 12) },
      { name: 'Aiyedaade', wards: generateWards('Aiyedaade', 10) },
      { name: 'Aiyedire', wards: generateWards('Aiyedire', 10) },
      { name: 'Boluwaduro', wards: generateWards('Boluwaduro', 10) },
      { name: 'Boripe', wards: generateWards('Boripe', 10) },
      { name: 'Ede North', wards: generateWards('Ede North', 12) },
      { name: 'Ede South', wards: generateWards('Ede South', 12) },
      { name: 'Ife Central', wards: generateWards('Ife Central', 12) },
      { name: 'Ife East', wards: generateWards('Ife East', 12) },
      { name: 'Ife North', wards: generateWards('Ife North', 12) },
      { name: 'Ife South', wards: generateWards('Ife South', 12) },
      { name: 'Ifedayo', wards: generateWards('Ifedayo', 10) },
      { name: 'Ifelodun', wards: generateWards('Ifelodun', 10) },
      { name: 'Ila', wards: generateWards('Ila', 10) },
      { name: 'Ilesa East', wards: generateWards('Ilesa East', 12) },
      { name: 'Ilesa West', wards: generateWards('Ilesa West', 12) },
      { name: 'Irepodun', wards: generateWards('Irepodun', 10) },
      { name: 'Irewole', wards: generateWards('Irewole', 10) },
      { name: 'Isokan', wards: generateWards('Isokan', 10) },
      { name: 'Iwo', wards: generateWards('Iwo', 10) },
      { name: 'Obokun', wards: generateWards('Obokun', 10) },
      { name: 'Odo Otin', wards: generateWards('Odo Otin', 10) },
      { name: 'Ola Oluwa', wards: generateWards('Ola Oluwa', 10) },
      { name: 'Olorunda', wards: generateWards('Olorunda', 10) },
      { name: 'Oriade', wards: generateWards('Oriade', 10) },
      { name: 'Orolu', wards: generateWards('Orolu', 10) },
      { name: 'Osogbo', wards: generateWards('Osogbo', 10) }
    ]
  },
  {
    name: 'Oyo',
    lgas: [
      { name: 'Afijio', wards: generateWards('Afijio', 10) },
      { name: 'Akinyele', wards: generateWards('Akinyele', 10) },
      { name: 'Atiba', wards: generateWards('Atiba', 10) },
      { name: 'Atisbo', wards: generateWards('Atisbo', 10) },
      { name: 'Egbeda', wards: generateWards('Egbeda', 10) },
      { name: 'Ibadan North', wards: generateWards('Ibadan North', 12) },
      { name: 'Ibadan North-East', wards: generateWards('Ibadan North-East', 12) },
      { name: 'Ibadan North-West', wards: generateWards('Ibadan North-West', 12) },
      { name: 'Ibadan South-East', wards: generateWards('Ibadan South-East', 12) },
      { name: 'Ibadan South-West', wards: generateWards('Ibadan South-West', 12) },
      { name: 'Ibarapa Central', wards: generateWards('Ibarapa Central', 12) },
      { name: 'Ibarapa East', wards: generateWards('Ibarapa East', 12) },
      { name: 'Ibarapa North', wards: generateWards('Ibarapa North', 12) },
      { name: 'Ido', wards: generateWards('Ido', 10) },
      { name: 'Irepo', wards: generateWards('Irepo', 10) },
      { name: 'Iseyin', wards: generateWards('Iseyin', 10) },
      { name: 'Itesiwaju', wards: generateWards('Itesiwaju', 10) },
      { name: 'Iwajowa', wards: generateWards('Iwajowa', 10) },
      { name: 'Kajola', wards: generateWards('Kajola', 10) },
      { name: 'Lagelu', wards: generateWards('Lagelu', 10) },
      { name: 'Ogbomoso North', wards: generateWards('Ogbomoso North', 12) },
      { name: 'Ogbomoso South', wards: generateWards('Ogbomoso South', 12) },
      { name: 'Ogo Oluwa', wards: generateWards('Ogo Oluwa', 10) },
      { name: 'Olorunsogo', wards: generateWards('Olorunsogo', 10) },
      { name: 'Oluyole', wards: generateWards('Oluyole', 10) },
      { name: 'Ona Ara', wards: generateWards('Ona Ara', 10) },
      { name: 'Orelope', wards: generateWards('Orelope', 10) },
      { name: 'Ori Ire', wards: generateWards('Ori Ire', 10) },
      { name: 'Oyo', wards: generateWards('Oyo', 10) },
      { name: 'Oyo East', wards: generateWards('Oyo East', 12) },
      { name: 'Saki East', wards: generateWards('Saki East', 12) },
      { name: 'Saki West', wards: generateWards('Saki West', 12) },
      { name: 'Surulere', wards: generateWards('Surulere', 10) }
    ]
  },
  {
    name: 'Plateau',
    lgas: [
      { name: 'Barkin Ladi', wards: generateWards('Barkin Ladi', 10) },
      { name: 'Bassa', wards: generateWards('Bassa', 10) },
      { name: 'Bokkos', wards: generateWards('Bokkos', 10) },
      { name: 'Jos East', wards: generateWards('Jos East', 12) },
      { name: 'Jos North', wards: generateWards('Jos North', 12) },
      { name: 'Jos South', wards: generateWards('Jos South', 12) },
      { name: 'Kanam', wards: generateWards('Kanam', 10) },
      { name: 'Kanke', wards: generateWards('Kanke', 10) },
      { name: 'Langtang North', wards: generateWards('Langtang North', 12) },
      { name: 'Langtang South', wards: generateWards('Langtang South', 12) },
      { name: 'Mangu', wards: generateWards('Mangu', 10) },
      { name: 'Mikang', wards: generateWards('Mikang', 10) },
      { name: 'Pankshin', wards: generateWards('Pankshin', 10) },
      { name: 'Qua\'an Pan', wards: generateWards('Qua\'an Pan', 10) },
      { name: 'Riyom', wards: generateWards('Riyom', 10) },
      { name: 'Shendam', wards: generateWards('Shendam', 10) },
      { name: 'Wase', wards: generateWards('Wase', 10) }
    ]
  },
  {
    name: 'Rivers',
    lgas: [
      { name: 'Abua/Odual', wards: generateWards('Abua/Odual', 10) },
      { name: 'Ahoada East', wards: generateWards('Ahoada East', 12) },
      { name: 'Ahoada West', wards: generateWards('Ahoada West', 12) },
      { name: 'Akuku-Toru', wards: generateWards('Akuku-Toru', 10) },
      { name: 'Andoni', wards: generateWards('Andoni', 10) },
      { name: 'Asari-Toru', wards: generateWards('Asari-Toru', 10) },
      { name: 'Bonny', wards: generateWards('Bonny', 10) },
      { name: 'Degema', wards: generateWards('Degema', 10) },
      { name: 'Eleme', wards: generateWards('Eleme', 10) },
      { name: 'Emuoha', wards: generateWards('Emuoha', 10) },
      { name: 'Etche', wards: generateWards('Etche', 10) },
      { name: 'Gokana', wards: generateWards('Gokana', 10) },
      { name: 'Ikwerre', wards: generateWards('Ikwerre', 10) },
      { name: 'Khana', wards: generateWards('Khana', 10) },
      { name: 'Obio/Akpor', wards: generateWards('Obio/Akpor', 10) },
      { name: 'Ogba/Egbema/Ndoni', wards: generateWards('Ogba/Egbema/Ndoni', 10) },
      { name: 'Ogu/Bolo', wards: generateWards('Ogu/Bolo', 10) },
      { name: 'Okrika', wards: generateWards('Okrika', 10) },
      { name: 'Omuma', wards: generateWards('Omuma', 10) },
      { name: 'Opobo/Nkoro', wards: generateWards('Opobo/Nkoro', 10) },
      { name: 'Oyigbo', wards: generateWards('Oyigbo', 10) },
      { name: 'Port Harcourt', wards: generateWards('Port Harcourt', 10) },
      { name: 'Tai', wards: generateWards('Tai', 10) }
    ]
  },
  {
    name: 'Sokoto',
    lgas: [
      { name: 'Binji', wards: generateWards('Binji', 10) },
      { name: 'Bodinga', wards: generateWards('Bodinga', 10) },
      { name: 'Dange Shuni', wards: generateWards('Dange Shuni', 10) },
      { name: 'Gada', wards: generateWards('Gada', 10) },
      { name: 'Goronyo', wards: generateWards('Goronyo', 10) },
      { name: 'Gudu', wards: generateWards('Gudu', 10) },
      { name: 'Gwadabawa', wards: generateWards('Gwadabawa', 10) },
      { name: 'Illela', wards: generateWards('Illela', 10) },
      { name: 'Isa', wards: generateWards('Isa', 10) },
      { name: 'Kebbe', wards: generateWards('Kebbe', 10) },
      { name: 'Kware', wards: generateWards('Kware', 10) },
      { name: 'Rabah', wards: generateWards('Rabah', 10) },
      { name: 'Sabon Birni', wards: generateWards('Sabon Birni', 10) },
      { name: 'Shagari', wards: generateWards('Shagari', 10) },
      { name: 'Silame', wards: generateWards('Silame', 10) },
      { name: 'Sokoto North', wards: generateWards('Sokoto North', 12) },
      { name: 'Sokoto South', wards: generateWards('Sokoto South', 12) },
      { name: 'Tambuwal', wards: generateWards('Tambuwal', 10) },
      { name: 'Tangaza', wards: generateWards('Tangaza', 10) },
      { name: 'Tureta', wards: generateWards('Tureta', 10) },
      { name: 'Wamako', wards: generateWards('Wamako', 10) },
      { name: 'Wurno', wards: generateWards('Wurno', 10) },
      { name: 'Yabo', wards: generateWards('Yabo', 10) }
    ]
  },
  {
    name: 'Taraba',
    lgas: [
      { name: 'Ardo Kola', wards: generateWards('Ardo Kola', 10) },
      { name: 'Bali', wards: generateWards('Bali', 10) },
      { name: 'Donga', wards: generateWards('Donga', 10) },
      { name: 'Gashaka', wards: generateWards('Gashaka', 10) },
      { name: 'Gassol', wards: generateWards('Gassol', 10) },
      { name: 'Ibi', wards: generateWards('Ibi', 10) },
      { name: 'Jalingo', wards: generateWards('Jalingo', 10) },
      { name: 'Karim Lamido', wards: generateWards('Karim Lamido', 10) },
      { name: 'Kumi', wards: generateWards('Kumi', 10) },
      { name: 'Lau', wards: generateWards('Lau', 10) },
      { name: 'Sardauna', wards: generateWards('Sardauna', 10) },
      { name: 'Takum', wards: generateWards('Takum', 10) },
      { name: 'Ussa', wards: generateWards('Ussa', 10) },
      { name: 'Wukari', wards: generateWards('Wukari', 10) },
      { name: 'Yorro', wards: generateWards('Yorro', 10) },
      { name: 'Zing', wards: generateWards('Zing', 10) }
    ]
  },
  {
    name: 'Yobe',
    lgas: [
      { name: 'Bade', wards: generateWards('Bade', 10) },
      { name: 'Bursari', wards: generateWards('Bursari', 10) },
      { name: 'Damaturu', wards: generateWards('Damaturu', 10) },
      { name: 'Fika', wards: generateWards('Fika', 10) },
      { name: 'Fune', wards: generateWards('Fune', 10) },
      { name: 'Geidam', wards: generateWards('Geidam', 10) },
      { name: 'Gujba', wards: generateWards('Gujba', 10) },
      { name: 'Gulani', wards: generateWards('Gulani', 10) },
      { name: 'Jakusko', wards: generateWards('Jakusko', 10) },
      { name: 'Karasuwa', wards: generateWards('Karasuwa', 10) },
      { name: 'Machina', wards: generateWards('Machina', 10) },
      { name: 'Nangere', wards: generateWards('Nangere', 10) },
      { name: 'Nguru', wards: generateWards('Nguru', 10) },
      { name: 'Potiskum', wards: generateWards('Potiskum', 10) },
      { name: 'Tarmuwa', wards: generateWards('Tarmuwa', 10) },
      { name: 'Yunusari', wards: generateWards('Yunusari', 10) },
      { name: 'Yusufari', wards: generateWards('Yusufari', 10) }
    ]
  },
  {
    name: 'Zamfara',
    lgas: [
      { name: 'Anka', wards: generateWards('Anka', 10) },
      { name: 'Bakura', wards: generateWards('Bakura', 10) },
      { name: 'Birnin Magaji/Kiyaw', wards: generateWards('Birnin Magaji/Kiyaw', 10) },
      { name: 'Bukkuyum', wards: generateWards('Bukkuyum', 10) },
      { name: 'Bungudu', wards: generateWards('Bungudu', 10) },
      { name: 'Gummi', wards: generateWards('Gummi', 10) },
      { name: 'Gusau', wards: generateWards('Gusau', 10) },
      { name: 'Kaura Namoda', wards: generateWards('Kaura Namoda', 10) },
      { name: 'Maradun', wards: generateWards('Maradun', 10) },
      { name: 'Maru', wards: generateWards('Maru', 10) },
      { name: 'Shinkafi', wards: generateWards('Shinkafi', 10) },
      { name: 'Talata Mafara', wards: generateWards('Talata Mafara', 10) },
      { name: 'Chafe', wards: generateWards('Chafe', 10) },
      { name: 'Zurmi', wards: generateWards('Zurmi', 10) }
    ]
  }
];

// Helper functions to get data
export const getStates = (): string[] => {
  return nigeriaLocations.map(state => state.name);
};

export const getLGAsByState = (stateName: string): string[] => {
  const state = nigeriaLocations.find(s => s.name === stateName);
  return state ? state.lgas.map(lga => lga.name) : [];
};

export const getWardsByLGA = (stateName: string, lgaName: string): string[] => {
  const state = nigeriaLocations.find(s => s.name === stateName);
  if (!state) return [];
  const lga = state.lgas.find(l => l.name === lgaName);
  return lga ? lga.wards.map(ward => ward.name) : [];
};

